
var show_mag_trace = false;
var only_points = true;
var show_line = false;

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
        if (base_plane_helper)
            scene.remove(base_plane_helper);
        movePoints();
    }
    if (e.code === "KeyS") {
        scene.remove(base_plane_helper);
    }

    if (e.code === "KeyD") {
        only_points = !only_points;
        if (only_points) {
            for (let i = 0; i < scene.children.length; i++) {
                scene.children[i].visible = true;
            }
        } else {
            for (let i = 0; i < scene.children.length; i++) {
                if (!cubes.includes(scene.children[i]))
                    scene.children[i].visible = false;
            }
        }
    }
    if (e.code === "KeyF") {
        rotateToXY();
    }
    // drawing lines
    if (e.code === "KeyL") {
        show_line = !show_line;
        if (show_line) {
            showCharacter();
        } else {
            scene.remove(line);
        }
    }

    if (e.code === "KeyG") {
        camera.position.set(0, 150, 0);
        camera.lookAt(0, 0, 0);
    }

    if (e.code === "KeyJ") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:4000');
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onload = function () {
            var jsonResponse = JSON.parse(xhr.responseText);
            console.log(jsonResponse);
            // do something with jsonResponse
        };


        xhr.send(JSON.stringify({ "img": document.querySelector("canvas").toDataURL("png").split(",")[1] }));

    }
});

