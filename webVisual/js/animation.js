const height = window.innerHeight - 30;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / height, 1, 10000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, height);
document.body.appendChild(renderer.domElement);

camera.position.set(50, 50, 50);
camera.lookAt(0, 0, 0);

const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const helper = new THREE.PlaneHelper(plane, 500, 0xFFFFFF);
scene.add(helper);


//Adding axis
const origin = new THREE.Vector3(0, 0, 0);
const length = 100;
const x_axis = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), origin, length, 0xfc0366);
const y_axis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, length, 0x03fc56);
const z_axis = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), origin, length, 0x03dbfc);

var acc_label;
var mag_label;
var gravity_label;
var x_label;
var y_label;
var z_label;
var fontLoader = new THREE.FontLoader();
fontLoader.load("./js/font/font.json", function (tex) {
    const label_setting = {
        size: 4,
        height: 0.5,
        curveSegments: 12,
        font: tex
    };
    var xGeo = new THREE.TextGeometry('x', label_setting);
    var yGeo = new THREE.TextGeometry('y', label_setting);
    var zGeo = new THREE.TextGeometry('z', label_setting);
    var magGeo = new THREE.TextGeometry('MAG', label_setting);
    var accGeo = new THREE.TextGeometry('ACC', label_setting);
    var gravityGeo = new THREE.TextGeometry('GRAVITY', label_setting);
    xGeo.translate(length + 5, 0, 0);
    yGeo.translate(0, length + 5, 0);
    zGeo.translate(0, 0, length + 5);
    var textMaterial = new THREE.MeshBasicMaterial({ color: 0xc9f0e5 });
    this.x_label = new THREE.Mesh(xGeo, textMaterial);
    this.y_label = new THREE.Mesh(yGeo, textMaterial);
    this.z_label = new THREE.Mesh(zGeo, textMaterial);
    this.mag_label = new THREE.Mesh(magGeo, textMaterial);
    this.gravity_label = new THREE.Mesh(gravityGeo, textMaterial);
    this.acc_label = new THREE.Mesh(accGeo, textMaterial);

    scene.add(x_label);
    scene.add(y_label);
    scene.add(z_label);
    scene.add(this.acc_label);
    scene.add(this.mag_label);
    scene.add(this.gravity_label);
});
scene.add(x_axis);
scene.add(y_axis);
scene.add(z_axis);

//add magnetometer arrow
var magArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), origin, 50, 0xfcba03);
scene.add(magArrow);
//add accelerometer arrow
var accArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), origin, 50, 0x32a852);
scene.add(accArrow);
// add gravity arrow
var gravityArrow = new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), origin, 50, 0x4287f5);
scene.add(gravityArrow);

// add models
const board = new THREE.BoxGeometry(7, 1, 3);
const boardMaterial = new THREE.MeshBasicMaterial({ color: 0xCBE330 });
const boardMesh = new THREE.Mesh(board, boardMaterial);
scene.add(boardMesh);

const penLength = 20;
const pen = new THREE.CylinderGeometry(0.3, 0.3, penLength, 32);
const penMaterial = new THREE.MeshBasicMaterial({ color: 0x00868B });
const penMesh = new THREE.Mesh(pen, penMaterial);
scene.add(penMesh);
pen.translate(0, penLength / 2, 0);
pen.rotateZ(-Math.PI / 2);


//for camera control
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();


function animate() {
    let currMagDirection = getDir(this.mx, this.my, this.mz);
    let currAccDirection = getDir(this.ax, this.ay, this.az);
    let currGravityDirection = getDir(this.gravity.x, this.gravity.y, this.gravity.z);
    setArrow(magArrow, currMagDirection);
    setArrow(accArrow, currAccDirection);
    setArrow(gravityArrow, currGravityDirection);
    setLabel(mag_label, currMagDirection);
    setLabel(acc_label, currAccDirection);
    setLabel(gravity_label, currGravityDirection);

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
