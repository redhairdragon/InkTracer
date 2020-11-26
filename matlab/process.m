% device = serialport("/dev/ttyACM0",115200);
% mag = zeros(1,3);
% gyr = zeros(1,3);
% acc = zeros(1,3);
% [A,b,expmfs] = calibrate_mag(device);
% disp(A);
% disp(b);
% disp(expmfs);
% clear device
server = IMUServer( hhhhc30002);
server.run();
% delete(server);
% clear server;