# pip3 install pyserial
import serial
import time

with serial.Serial('/dev/ttyACM0', 9600, timeout=1) as arduinoData:
    while True:
        line = arduinoData.readline().decode("ascii")

        if line[0] == 'A':
            print(line)
