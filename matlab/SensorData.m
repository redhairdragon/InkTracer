classdef SensorData  < handle
    properties
        mag;
        gyr;
        acc;
grav;

        % mag calibration related
        calibrated;
        A;
        b;
        expmfs;
    end
end

