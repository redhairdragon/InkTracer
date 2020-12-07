classdef SensorData  < handle
    properties
        mag;
        gyr;
        acc;
        orientations;

        % mag calibration related
        calibrated;
        A;
        b;
        expmfs;
    end
end

