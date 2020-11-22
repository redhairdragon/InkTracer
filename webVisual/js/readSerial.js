async function setup() {
    port = await navigator.serial.requestPort();
    // - Wait for the port to open.
    await port.open({ baudRate: 9600 });
    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;
    let reader = await inputStream.getReader();
    readLoop(reader, (x) => {

        if (x.length != 0) {
            if (x[0] == "G") {
                let angular_velocity = x.split("\t");
                gx = parseInt(angular_velocity[1]);
            }
            if (x[0] == "M") {
                let mag = x.split("\t");
                mx = parseFloat(mag[1]);
                mz = parseFloat(mag[2]);
                my = parseFloat(mag[3]);
                if (calibrated) this.gravity = new THREE.Vector3(mx, my, mz).applyQuaternion(gn_quaternion);
                addCube();
            }
            if (x[0] == "A") {
                let acc = x.split("\t");
                ax = parseFloat(acc[1]);
                az = parseFloat(acc[2]);
                ay = -parseFloat(acc[3]);
            }
        }
    });
}


async function readLoop(reader, fn) {
    var buffer = "";
    while (true) {
        const { value, done } = await reader.read();
        if (value) {
            lines = value.split("\n");
            if (lines.length == 1)
                buffer += lines[0];
            else {
                buffer += lines[0];
                fn(buffer);
                buffer = "";
                for (let i = 1; i < lines.length; i++)
                    fn(buffer);
            }
        }
    }
}