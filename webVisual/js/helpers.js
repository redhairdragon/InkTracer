var cubes = [];
var proj_plane_helper = undefined;
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

function addCube() {
    if (show_mag_trace == false)
        return;
    if (ax > 0.9)
        return;

    const geometry = new THREE.BoxGeometry(.5, .5, .5);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    cubes.push(new THREE.Mesh(geometry, material));

    var current = new THREE.Vector3();
    if (proj_plane_helper) {
        const origin = new THREE.Vector3(0, 0, 0);
        let end = new THREE.Vector3(this.mx * 1000, this.my * 1000, this.mz * 1000);
        let line = new THREE.Line3(origin, end);
        mag_plane.intersectLine(line, current);
        cubes[cubes.length - 1].position.set(current.x, current.y, current.z);
    }
    else {
        current = new THREE.Vector3(this.mx, this.my, this.mz).normalize();
        current = new THREE.Vector3(current.x * 200, current.y * 200, current.z * 200);
        cubes[cubes.length - 1].position.set(current.x, current.y, current.z);
    }
    // console.log(current);
    console.log(current.distanceTo(cubes[cubes.length - 2].position));
    if (cubes.length > 2 && current.distanceTo(cubes[cubes.length - 2].position) > 4) {
        scene.add(cubes[cubes.length - 1]);
    }
}
function addPlane() {
    if (proj_plane_helper)
        scene.remove(proj_plane_helper);

    mag_plane = new THREE.Plane(new THREE.Vector3(-this.mx, -this.my, -this.mz).normalize(), 200);
    ppoint =
        proj_plane_helper = new THREE.PlaneHelper(mag_plane, 500, 0xFFABFF);

    scene.add(proj_plane_helper);
}

function movePoints() {
    
}
