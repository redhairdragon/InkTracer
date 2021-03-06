classdef IMUServer < WebSocketServer
    %IMUSERVER Summary of this class goes here
    %   Detailed explanation goes here
    properties (Constant)
        Data = SensorData
    end

    properties
        device;
    end
    
    methods
        function obj = IMUServer(varargin)
            %Constructor
            obj@WebSocketServer(varargin{:});
            obj.device = serialport("/dev/ttyACM0",115200);
            [obj.Data.A,obj.Data.b,obj.Data.expmfs] = calibrate_mag(obj.device);
            obj.Data.mag = [0,0,0];
            obj.Data.gyr = [0,0,0];
            obj.Data.acc = [0,0,0];            
            obj.Data.grav = [0,0,0];            
        end

        function run(obj)
            % FUSE = ahrsfilter('SampleRate', 120);
            % FUSE = complementaryFilter('SampleRate', 120);
            FUSE = complementaryFilter('SampleRate', 120,'MagnetometerGain',0.9,"AccelerometerGain",0.2);
            viewer = HelperOrientationViewer('Title',{'CF'});
            average_mag = zeros(3,3);

            while true
                readings = read_serial(obj.device);
                % obj.Data.acc=readings(1:3);
                obj.Data.grav = 0.9 * obj.Data.grav + 0.1 * readings(1:3);
                obj.Data.acc = readings(1:3) - obj.Data.grav;
                obj.Data.gyr =readings(4:6);
                % obj.Data.mag=readings(7:9)
                obj.Data.mag=(readings(7:9)-obj.Data.b)*obj.Data.A;
                
                rotators= FUSE(readings(1:3),obj.Data.gyr,obj.Data.mag);
                average_mag(1:2,:) = average_mag(2:3,:); 
                average_mag(3,:) = obj.Data.mag;
                obj.Data.mag = sum(average_mag)./3;
                for j = numel(rotators)
                    viewer(rotators(j));
                end
                
            end
            
        end
    end

    
    methods (Access = protected)

        function onOpen(obj,conn,message)
            fprintf('%s\n',message)
        end
        
        function onTextMessage(obj,conn,message)
            conn.send(jsonencode([obj.Data.acc,obj.Data.gyr,obj.Data.mag,obj.Data.grav])); 
        end
        
        function onBinaryMessage(obj,conn,bytearray)
            conn.send(bytearray); 
        end
        
        function onError(obj,conn,message)
            fprintf('%s\n',message);
        end
        
        function onClose(obj,conn,message)
            fprintf('%s\n',message);
        end
    end
end



