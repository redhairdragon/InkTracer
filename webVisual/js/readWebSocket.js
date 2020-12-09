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
        ay = data[1];
        az = data[2];
        gx = data[3];
        gy = data[4];
        gz = data[5];
        mx = data[6];
        my = data[7];
        mz = data[8];
        this.gravity.x = data[9];
        this.gravity.y = data[10];
        this.gravity.z = data[11];
        if (Math.abs(ax) > 0.9)
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