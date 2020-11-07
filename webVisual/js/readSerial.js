// chrome://flags #enable-experimental-web-platform-features

async function connect() {
    port = await navigator.serial.requestPort();
    // - Wait for the port to open.
    await port.open({ baudRate: 9600 });
    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;
    let reader = await inputStream.getReader();
    return reader;
}

let reader = await connect();

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
// await readLoop(reader, (x) => console.log(x));