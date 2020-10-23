# InkTracer

Haoran Ma

Shen Teng 104758168

## 1. Abstract

This project aims to recognize handwriting through motion sensor on Arduino Nano 33 BLE Sense. By attaching Arduino at the end of the pen-like object, users are able to input digits (hopefully letters if things go well) on their computer with a short delay after they perform handwriting.



**Goal**: recognize digits/letters* through the motion of a pen 

**Tools**:

9-axis IMU for motion data

Bluetooth for data transmission





**Paper Related**: 

[Pentelligence: Combining Pen Tip Motion and Writing Sounds for Handwritten Digit Recognition](https://dl.acm.org/doi/10.1145/3173574.3173705) 

This paper introduce a methodology recoginzing handwriting by feeding IMU and Audio input data into Neural Network.



**Current Idea**: The paper uses both IMU and Audio as their input. But audio data can be very noisy in real life. Ideally we should be able to recognize handwriting using motion data only. And they are using 6-axis IMU, the one we have is 9 axis.

Plan 1: Train NN using Motion Data directly

Plan 2: Transform motion data into 2D image and use existing well-trained CNN model to do recognization





