import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometryIcosahedron = new THREE.IcosahedronGeometry(5, 0);
const materialIcosahedron = new THREE.MeshStandardMaterial({ color: 0xb16cea });
const meshIcosahedron = new THREE.Mesh(geometryIcosahedron, materialIcosahedron);

scene.add(meshIcosahedron);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.125);

scene.add(pointLight, ambientLight);

//Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50, 0xff0000);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement)

function addStar(){
  const geometryStar = new THREE.SphereGeometry(0.25, 24, 24);
  const materialStar = new THREE.MeshStandardMaterial({color: 0xffffff});
  const meshStar = new THREE.Mesh(geometryStar, materialStar);

  let proximityCounter = 0;
  let [x, y, z] = Array(3).fill().map(() => {
    // create random positive value
    let randPosition = THREE.MathUtils.randFloatSpread(800);
    // if the coordinate is close to our centre, note that by incrementing proximityCounter
    if (Math.abs(randPosition) < 100){ proximityCounter++; }
    // if all three dimensions are close to our centre, recalculate c
    if(proximityCounter === 3){ 
      randPosition = THREE.MathUtils.randFloat(100, 800); 
      if(Math.floor(Math.random() * 2) === 0){ randPosition *= -1; }
    }

    return randPosition;
  });

  meshStar.position.set(x, y, z);
  scene.add(meshStar);
}

Array(5000).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1),
  new THREE.MeshStandardMaterial({ map: moonTexture })
);

moon.position.set(-8, 8, -5);
scene.add(moon);


function animate() {
  requestAnimationFrame(animate);

  meshIcosahedron.rotation.x += 0.005;
  meshIcosahedron.rotation.y += 0.0025;
  meshIcosahedron.rotation.z += 0.005;

  moon.rotation.x += 0.005;
  moon.rotation.y += 0.0025;
  moon.rotation.z += 0.005;

  controls.update();

  renderer.render(scene, camera);
}

animate();