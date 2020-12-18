var cubes = [];
var proj_plane_helper = undefined;
var base_plane_helper = undefined;
var mag_plane = undefined;

var ppoint;

function setLabel(labelMesh, Dir) {
    const label_scale = 30;
    if (labelMesh)
        labelMesh.position.set(Dir.x * label_scale, Dir.y * label_scale, Dir.z * label_scale);
}
function setArrow(arrow, dir) {
    arrow.setDirection(dir);
}
function getDir(x, y, z) {
    // return new THREE.Vector3(x, y, z);
    return new THREE.Vector3(x, y, z).normalize();
}

var upping = false;
function addCube() {
    if (show_mag_trace == false)
        return;
    if (ax > 0.9)
        upping = true;

    if (ax < -0.5)
        upping = false;
    if (upping) return;


    const geometry = new THREE.BoxGeometry(.5, .5, .5);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });


    var current = new THREE.Vector3();
    if (proj_plane_helper) {
        const origin = new THREE.Vector3(0, 0, 0);
        let end = new THREE.Vector3(this.mx * 1000, this.my * 1000, this.mz * 1000);
        let line = new THREE.Line3(origin, end);
        mag_plane.intersectLine(line, current);

        if (cubes.length <= 1 || current.distanceTo(cubes[cubes.length - 1].position) > 3.5) {
            cubes.push(new THREE.Mesh(geometry, material));
            cubes[cubes.length - 1].position.set(current.x, current.y, current.z);
            scene.add(cubes[cubes.length - 1]);
        }
    } else {
        current = new THREE.Vector3(this.mx, this.my, this.mz).normalize();
        current = new THREE.Vector3(current.x * 200, current.y * 200, current.z * 200);
        if (cubes.length <= 1 || current.distanceTo(cubes[cubes.length - 1].position) > 3.5) {
            cubes.push(new THREE.Mesh(geometry, material));
            cubes[cubes.length - 1].position.set(current.x, current.y, current.z);
            scene.add(cubes[cubes.length - 1]);
        }
    }
}

function addPlane() {
    if (proj_plane_helper)
        scene.remove(proj_plane_helper);

    mag_plane = new THREE.Plane(new THREE.Vector3(-this.mx, -this.my, -this.mz).normalize(), 200);
    proj_plane_helper = new THREE.PlaneHelper(mag_plane, 500, 0xFFABFF);

    scene.add(proj_plane_helper);
}

function movePoints() {
    var base_plane = new THREE.Plane(mag_plane.normal, 0);
    base_plane_helper = new THREE.PlaneHelper(base_plane, 500, 0xFFABFF);
    scene.add(base_plane_helper);

    const geometry = new THREE.BoxGeometry(.5, .5, .5);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    let s = cubes.length;
    for (let i = 0; i < s; ++i) {
        var current = cubes[i].position.projectOnPlane(mag_plane.normal);
        cubes.push(new THREE.Mesh(geometry, material));
        cubes[cubes.length - 1].position.set(current.x, current.y, current.z);
        scene.add(cubes[cubes.length - 1]);
    }
}

function rotateToXY() {
    var rotationAxis = new THREE.Vector3().crossVectors(mag_plane.normal, new THREE.Vector3(0, 1, 0));
    var angle = mag_plane.normal.angleTo(new THREE.Vector3(0, 1, 0));
    console.log(rotationAxis);
    for (let i = 0; i < cubes.length; ++i) {
        cubes[i].position.applyAxisAngle(rotationAxis.normalize(), angle);
    }
}

var line;
function showCharacter() {
    let line_mat = new THREE.LineBasicMaterial({ color: 0xFFFFFF, linewidth: 70 });
    let points_raw = [];
    for (let i = 0; i < cubes.length; ++i)
        points_raw.push(cubes[i].position);

    let points = [];


    let s = 0;
    for (let i = 1; i < cubes.length; ++i)
        s += points_raw[i].distanceTo(points_raw[i - 1]);
    let avg = s / (cubes.length - 1);
    for (let i = 1; i < points_raw.length - 1; ++i)
        if (points_raw[i].distanceTo(points_raw[i - 1]) < 5 * avg) {
            points.push(points_raw[i - 1]);
            points.push(points_raw[i]);
        }


    var line_geo = new THREE.Geometry();
    points.forEach((p) => {
        line_geo.vertices.push(p);
    });
    line = new THREE.LineSegments(line_geo, line_mat);
    // let line_geo = new THREE.BufferGeometry().setFromPoints(points);
    // line = new THREE.Line(line_geo, line_mat);
    scene.add(line);
}