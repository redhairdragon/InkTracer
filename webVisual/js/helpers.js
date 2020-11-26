var cubes = [];

function setLabel(labelMesh, Dir) {
    const label_scale = 30;
    if (labelMesh)
        labelMesh.position.set(Dir.x * label_scale, Dir.y * label_scale, Dir.z * label_scale);
}
function setArrow(arrow, dir) {
    arrow.setDirection(dir);
}
function getDir(x, y, z) {
    return new THREE.Vector3(x, y, z).normalize();
}

function addCube() {
    if (show_mag_trace == false)
        return;
    const geometry = new THREE.BoxGeometry(.5, .5, .5);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    cubes.push(new THREE.Mesh(geometry, material));

    //scene is global
    scene.add(cubes[cubes.length - 1]);
    // var current = new THREE.Vector3(this.mx, this.my, this.mz).normalize();
    cubes[cubes.length - 1].position.set(this.mx * 3, this.my * 3, this.mz * 3);

}

