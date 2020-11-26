#include <Arduino_LSM9DS1.h>

uint32_t timer;

float gx, gy, gz;
float mx, my, mz;
float ax, ay, az;

void setup() {
  Serial.begin(115200);
  while (!Serial)
    ;

  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1)
      ;
  }
  timer = micros();
 
}

void loop() {
  if (IMU.gyroscopeAvailable()) {
    IMU.readGyroscope(gx, gy, gz);
  }
  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(ax, ay, az);
  }
  if (IMU.magneticFieldAvailable()) {
    IMU.readMagneticField(mx, my, mz);
  }

  print('A', ax, ay, az);
  print('M', mx, my, mz);
  print('G', gx, gy, gz);
}

void print(char type, float x, float y, float z) {
  Serial.print(type);
  Serial.print(":\t");
  Serial.print(x);
  Serial.print('\t');
  Serial.print(y);
  Serial.print('\t');
  Serial.println(z);
}
