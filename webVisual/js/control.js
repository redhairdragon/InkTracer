
var show_mag_trace = false;
document.addEventListener('keydown', (e) => {
    if (e.code === "KeyH") {
        show_mag_trace = !show_mag_trace;
    }
    if (e.code === "KeyC") {
        cubes.forEach((cube) => {
            scene.remove(cube);
        });
        cubes = [];
    }
});

