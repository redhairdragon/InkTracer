function [readings, type] = read_serial(device)
    l=readline(device);
    tokens =split(l);
    readings(1)= str2double(tokens(2));
    readings(2)= str2double(tokens(3));
    readings(3)= str2double(tokens(4));
    data_type = tokens(1);

    if (strcmp(data_type,"G:"))
        type='G';
    elseif (strcmp(data_type,"A:"))
        type='A';
    elseif (strcmp(data_type,"M:"))
        type='M';
        readings(1)=-readings(1);
    else
        disp("SHOULD NOT APPEAR")
    end
    % block if Nan is read to debug
    % if isnan(readings(1))
    %     disp(tokens(2))
    %     while true
    %     end
    % end
    % if isnan(readings(2))
    %     disp(tokens(3))
    %     while true
    %     end
    % end
    % if isnan(readings(3))
    %     disp(tokens(4))
    %     while true
    %     end
    % end
end