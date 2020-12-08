function readings = read_serial(device)
    l=readline(device);
    tokens =split(l);
    readings = zeros(1,9);
    for n = 1:9
        readings(n)= str2double(tokens(n));
    end
    for n = 1:3
        readings(n) = readings(n) * 9.807;
    end
    for n = 4:6
        readings(n) = readings(n)/180*pi;
    end
    readings(7)=-readings(7);
    for n = 7:9
        readings(n) = readings(n)*100;
    end
    % disp(readings)
    
end