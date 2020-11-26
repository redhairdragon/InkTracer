function [A,b,expmfs] = calibrate_mag(device)
    calib_size =500;
    cnt=1;
    calib_data=zeros(calib_size,3);
    while (cnt<calib_size)
        [reading, t]= read_serial(device);
        if (t=='M')
            calib_data(cnt,:)=reading;
            cnt=cnt+1;
            disp(cnt);
        end
    end
    [A,b,expmfs] = magcal(calib_data);
end