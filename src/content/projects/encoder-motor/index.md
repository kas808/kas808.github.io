---
# DRAFT write-up (written from EncoderTest.ino and your project portfolio). Review before publishing.
title: Motor Position Control and Motion Sensing
summary: Interrupt-based Arduino code to read a quadrature encoder, plus accelerometer calibration and PI/PID controller tuning in MATLAB.
course: Dynamics and Control I & II
date: 2025 to 2026
role: Lab coursework. Wrote the encoder code shown below.
tools: [Arduino (C++), Interrupts, Quadrature Encoders, Sensor Calibration, MATLAB/Simulink, Root Locus, PI/PID Control]
size: small
order: 14
---

- Wrote interrupt-based Arduino code that reads both channels of a quadrature encoder (90 x 64 PPR) and converts the counts to angular position and velocity in degrees
- Drove a motor forward and back from push buttons, showed its position on an OLED, and plotted position and velocity over time
- Calibrated a two-axis accelerometer to separate tangential and normal acceleration
- Tuned pitch and x-axis controllers in MATLAB/Simulink with root-locus methods for a two-axis tracking task, comparing PI and PID control

## Encoder test code

Each channel has its own interrupt. Comparing channels A and B on every change tells the code which way the shaft turned, and the loop takes a numerical derivative of position to get velocity.

```cpp
// Quadrature Encoder Reading with Dual Interrupts
// Position and Velocity in Degrees

const int encoderPinA = 10;   // Encoder Channel A (interrupt)
const int encoderPinB = 11;   // Encoder Channel B (interrupt)

volatile long encoderPosition = 0;  // Encoder count
float positionDeg = 0;              // Angular position in degrees
float velocityDegPerSec = 0;        // Angular velocity in degrees per second

const int encoderPPR = 90*64;  // Pulses per revolution
const float degPerCount = 360.0 / encoderPPR;

unsigned long lastTime = 0;
long lastPosition = 0;

void setup() {
  Serial.begin(9600);
  pinMode(encoderPinA, INPUT_PULLUP);
  pinMode(encoderPinB, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(encoderPinA), handleEncoderA, CHANGE);
  attachInterrupt(digitalPinToInterrupt(encoderPinB), handleEncoderB, CHANGE);
  lastTime = millis();
}

void loop() {
  unsigned long currentTime = millis();
  long currentPosition = encoderPosition;

  // Numerical derivative to find velocity
  long deltaCounts = currentPosition - lastPosition;
  float deltaTime = (currentTime - lastTime) / 1000.0; // seconds

  positionDeg = currentPosition * degPerCount;
  velocityDegPerSec = (deltaCounts * degPerCount) / deltaTime;

  lastPosition = encoderPosition;
  lastTime = currentTime;

  Serial.print("Position: ");
  Serial.print(positionDeg, 2);
  Serial.print(" deg, Velocity: ");
  Serial.print(velocityDegPerSec, 2);
  Serial.println(" deg/s");
  delay(20);
}

void handleEncoderA() {
  bool A = digitalRead(encoderPinA);
  bool B = digitalRead(encoderPinB);
  if (A == B) encoderPosition++;   // Clockwise
  else        encoderPosition--;   // Counterclockwise
}

void handleEncoderB() {
  bool A = digitalRead(encoderPinA);
  bool B = digitalRead(encoderPinB);
  if (A != B) encoderPosition++;   // Clockwise
  else        encoderPosition--;   // Counterclockwise
}
```
