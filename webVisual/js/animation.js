const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const helper = new THREE.PlaneHelper(plane, 200, 0xffff00);
scene.add(helper);

//Adding axis
const origin = new THREE.Vector3(0, 0, 0);
const length = 20;
const hex = 0xffff00;
const x_axis = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), origin, length, 0xfc0366);
const y_axis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, length, 0x03fc56);
const z_axis = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), origin, length, 0x03dbfc);
scene.add(x_axis);
scene.add(y_axis);
scene.add(z_axis);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
