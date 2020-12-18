var mx_u = 0;
var my_u = 0;
var mz_u = 0;

async function setup() {
    var w_socket = new WebSocket("ws://192.168.1.9:5555");
    w_socket.onopen = (event) => {
        setInterval(() => {
            w_socket.send("1");
        }, 20);
    };
    w_socket.onmessage = (event) => {
        data = JSON.parse(event.data);
        ax = data[0];
        ay = data[2];
        az = data[1];
        gx = data[3];
        gy = data[5];
        gz = data[4];
        mx_u = data[6];
        my_u = data[8];
        mz_u = data[7];


        mx = 0.0549 * mx_u + 0.945 * mx;
        my = 0.0549 * my_u + 0.945 * my;
        mz = 0.0549 * mz_u + 0.945 * mz;

        this.gravity.x = data[9];
        this.gravity.y = data[11];
        this.gravity.z = data[10];
        if (Math.abs(ax) > 1)
            console.log(ax);

        addCube();
    };


}

// function justified_gravity(curr_magvec, calibrated_mag) {
//     let quaternion = new THREE.Quaternion();
//     gravity = new THREE.Vector3(cali_gravity.x, cali_gravity.y, cali_gravity.z);
//     quaternion.setFromUnitVectors(calibrated_mag.normalize(), curr_magvec.normalize());
//     gravity.applyQuaternion(quaternion);
// }