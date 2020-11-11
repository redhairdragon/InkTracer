# InkTracer UCLA ECE M202 

## 1. Overall project goals
describe clearly what you are trying to do, why is it important, and how is it done today,
The project is aim to recognize handwriting by attaching Arduino Nano 33 BLE Sense to the end of the pen-like object.
Currently, all handwriting input devices interact with a touch screen i.e. Apple pen, Surface pen. It would be great that we can transform any pen-like object as an digital input device. Imagine that a writer can write an article on the paper meanwhile its digital copy is generated on the smart devices. 
To achieve this, IMU sensor is the key. The paper "Pentelligence" uses 6-axis IMU sensor and audio sensor and feed the data through layers of neural network to recognize **digits** only.
This project is aimed to achieve a similar goal with a attempt to recognize letters and try different neural network architectures. 

## 2. Technical approach covering data sets, algorithms, etc. and novelty of your approach
We will collect data through IMU.
Plan 1: 
We reconstruct the trajectory of the arduino from the IMU sensor data in 3D space, 
and then project the trajectory into 2D plane.
Then we feed that image into well-trained existing CV neural networks so that we are able to recognized a broad spectrum of symbols

Plan 2:
Feed IMU sensor data directly into LSTM, TCN etc. And in this case, we need to take care of issues like collecting raw data and few-shot learning.

## 3. Implementation, experimental evaluation, success metrics, and key findings.
TBD

## 4. Prior work examples including references, and the relative novelty of your work.

[Pentelligence: Combining Pen Tip Motion and Writing Sounds for Handwritten Digit Recognition
](https://dl.acm.org/doi/10.1145/3173574.3173705)

## 5. Strengths and weakness, and future directions
TBD

## 6. Contributions of each team member
TBD

## 7. Section with links to PDF of your final presentation slides, and any data sets not in your repo
TBD

## 8. References
