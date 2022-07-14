import './style.css'

import * as THREE from 'three';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometryIcosahedron = new THREE.IcosahedronGeometry(10, 0);
const materialIcosahedron = new THREE.MeshStandardMaterial({ color: 0xb16cea });
const meshIcosahedron = new THREE.Mesh(geometryIcosahedron, materialIcosahedron);

scene.add(meshIcosahedron);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

scene.add(pointLight)

function animate() {
  requestAnimationFrame(animate);

  meshIcosahedron.rotation.x += 0.01;
  meshIcosahedron.rotation.y += 0.005;
  meshIcosahedron.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();