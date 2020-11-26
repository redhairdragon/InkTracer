classdef SensorData  < handle
    properties
        mag;
        gyr;
        acc;
        % mag calibration related
        calibrated;
        A;
        b;
        expmfs;
    end
end

