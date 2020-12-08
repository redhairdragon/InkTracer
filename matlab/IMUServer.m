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
            obj.Data.mag = [1,2,3];
            obj.Data.gyr = [3,4,5];
            obj.Data.acc = [6,7,8];
            
        end
        function run(obj)
            % FUSE = ahrsfilter();
            FUSE = complementaryFilter('MagnetometerGain',0.9,"AccelerometerGain",0.2);
            % FUSE = complementaryFilter();
            viewer = HelperOrientationViewer('Title',{'AHRS Filter'});
            while true
                readings = read_serial(obj.device);
                obj.Data.acc=readings(1:3);
                obj.Data.gyr =readings(4:6);
                obj.Data.mag=(readings(7:9)-obj.Data.b)*obj.Data.A;
             
                
                rotators= FUSE(obj.Data.acc,obj.Data.gyr,obj.Data.mag);
                % [obj.Data.orientations,~ ]=rotators;
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
            attitude_kf =  quat2eul(obj.Data.orientations,"ZYX");
            conn.send(jsonencode([obj.Data.acc,obj.Data.gyr,obj.Data.mag,attitude_kf])); 
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



