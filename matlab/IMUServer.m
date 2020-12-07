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
            FUSE = ahrsfilter();
            count = 0;
            while true
                count=count+1;
                [readings, t]= read_serial(obj.device);
                if (t=="G")
                    obj.Data.gyr=readings;
                elseif (t=="A")
                    obj.Data.acc=readings;
                elseif (t=="M")
                    obj.Data.mag=(readings-obj.Data.b)*obj.Data.A;
                else
                    disp("Should not shown");
                end
                if (count== 6)
                    [obj.Data.orientations,~]  = FUSE(obj.Data.acc,obj.Data.gyr,obj.Data.mag);
                    count =0;
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



