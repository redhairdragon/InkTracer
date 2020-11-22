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
    if (Math.abs(this.mx) < 0.05 && Math.abs(this.my) < 0.05 && Math.abs(this.mz) < 0.05) return;
    var geometry = new THREE.BoxGeometry(2, 2, 2);
    var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    var mesh = new THREE.Mesh(geometry, material);
    //scene is global
    scene.add(mesh);
    var current = new THREE.Vector3(this.mx, this.my, this.mz).normalize();
    mesh.position.set(this.mx, this.my, this.mz);
}

