var ax = 0;
var ay = 0;
var az = 0;
var gx = 0;
var gy = 0;
var gz = 0;
var mx = 0;
var my = 0;
var mz = 0;
// var calib_tick = 0;

var gravity = new THREE.Vector3();
var cali_gravity = new THREE.Vector3();
var cali_north = new THREE.Vector3();
var calibrated = false;

function calibrate() {
    window.alert("Put the arduino forward to you for 3 sec. Make sure Connect first.");
    calib_tick = 0;
    cali_gravity = new THREE.Vector3();
    cali_north = new THREE.Vector3();
    var calib = setInterval(() => {
        cali_gravity.x += ax;
        cali_gravity.y += ay;
        cali_gravity.z += az;
        cali_north.x += mx;
        cali_north.y += my;
        cali_north.z += mz;
        calib_tick += 1;
    }, 100);
    console.log(calib);
    setTimeout(() => {
        calibrated = true;
        clearInterval(calib);
        cali_gravity.x /= calib_tick;
        cali_gravity.y /= calib_tick;
        cali_gravity.z /= calib_tick;
        cali_north.x /= calib_tick;
        cali_north.y /= calib_tick;
        cali_north.z /= calib_tick;
        cali_north.normalize();
        cali_gravity.normalize();
        console.log(cali_north);
        console.log(cali_gravity);
        window.alert("Loading Init Magnetometer and Gravity done ");
    }, 3000);
}
