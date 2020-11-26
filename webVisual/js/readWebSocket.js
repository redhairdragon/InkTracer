async function setup() {
    var w_socket = new WebSocket("ws://192.168.1.9:30002");
    w_socket.onopen = (event) => {
        setInterval(() => {
            w_socket.send("1");
        }, 20);
    };
    w_socket.onmessage = (event) => {
        data = JSON.parse(event.data);
        ax = data[0];
        ay = data[1];
        az = data[2];
        gx = data[3];
        gy = data[4];
        gz = data[5];
        mx = data[6];
        mz = data[7];
        my = data[8];
        addCube();
    };


}

// function justified_gravity(curr_magvec, calibrated_mag) {
//     let quaternion = new THREE.Quaternion();
//     gravity = new THREE.Vector3(cali_gravity.x, cali_gravity.y, cali_gravity.z);
//     quaternion.setFromUnitVectors(calibrated_mag.normalize(), curr_magvec.normalize());
//     gravity.applyQuaternion(quaternion);
// }