var ax = 0;
var ay = 0;
var az = 0;
var mx = 0;
var my = 0;
var mz = 0;
var calib_tick = 0;

var gravity = new THREE.Vector3();
var north = new THREE.Vector3();
var gn_quaternion = new THREE.Quaternion();
var calibrated = false;

function calibrate() {
    window.alert("Put the arduino forward to you for 3 sec. Make sure Connect first.");
    calib_tick = 0;
    gravity = new THREE.Vector3();
    north = new THREE.Vector3();
    var calib = setInterval(() => {
        gravity.x += ax;
        gravity.y += ay;
        gravity.z += az;
        north.x += mx;
        north.y += my;
        north.z += mz;
        calib_tick += 1;
    }, 100);
    console.log(calib);
    setTimeout(() => {
        calibrated = true;
        clearInterval(calib);
        gravity.x /= calib_tick;
        gravity.y /= calib_tick;
        gravity.z /= calib_tick;
        north.x /= calib_tick;
        north.y /= calib_tick;
        north.z /= calib_tick;
        gn_quaternion.setFromUnitVectors(north.normalize(), gravity.normalize());
        console.log(gravity);
        console.log(north);
        window.alert("Loading Init Magnetometer and Gravity done ");
    }, 3000);
}
