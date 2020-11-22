#include <Arduino_LSM9DS1.h>
#include <Kalman.h>

uint32_t timer;
Kalman kalmanX;
float pitch, roll, yaw;

float gx, gy, gz;
float mx, my, mz;
float ax, ay, az;
float kalAngleX;

void setup() {
  Serial.begin(9600);
  while (!Serial)
    ;

  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1)
      ;
  }
  timer = micros();
  pitch = atan2(ax, sqrt(ay * ay + az * az)) * RAD_TO_DEG;
  roll = atan2(ay, sqrt(ax * ax + az * az)) * RAD_TO_DEG;
  kalmanX.setAngle(roll);
}

void loop() {
  double dt = (double)(micros() - timer) / 1000000;
  timer = micros();

  if (IMU.gyroscopeAvailable()) {
    IMU.readGyroscope(gx, gy, gz);
  }
  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(ax, ay, az);
  }
  if (IMU.magneticFieldAvailable()) {
    IMU.readMagneticField(mx, my, mz);
  }

  //  Serial.println(gx);
  pitch = atan2(ax, sqrt(ay * ay + az * az)) * RAD_TO_DEG;
  roll = atan2(ay, sqrt(ax * ax + az * az)) * RAD_TO_DEG;

  kalAngleX = kalmanX.getAngle(roll, gx, dt);
  print('A', ax, ay, az);
  print('M', mx, my, mz);
  //  Serial.print("G\t");
  //  Serial.print(kalAngleX);
  //   Serial.print("\t");
  // Serial.println(kalAngleY);
  //    Serial.print("PITCH: ");
  //    Serial.println(pitch);

  //    Serial.print("ROLL: ");
  //    Serial.println(roll);
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
