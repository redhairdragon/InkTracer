
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
    if (e.code === "KeyZ") {
        addPlane();
    }
    if (e.code === "KeyX") {
        scene.remove(proj_plane_helper);
        proj_plane_helper = undefined;
    }
    if (e.code === "KeyA") {
        movePoints();
    }
});

