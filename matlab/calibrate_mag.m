function [A,b,expmfs] = calibrate_mag(device)
    calib_size =500;
    cnt=1;
    calib_data=zeros(calib_size,3);
    while (cnt<calib_size)
        reading = read_serial(device);
        calib_data(cnt,:)=reading(7:9);
        cnt=cnt+1;
        disp(cnt);
    
    end
    [A,b,expmfs] = magcal(calib_data);
end