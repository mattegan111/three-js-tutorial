import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

  let [x, y, z] = randomStarPosition();
  function randomStarPosition(){
    let proximityCounter = 0;
    let [a, b, c] = Array(3).fill().map(() => {
      // create random positive value
      let randPosition = THREE.MathUtils.randFloatSpread(300);
      // if the coordinate is close to our centre, note that by incrementing proximityCounter
      if (Math.abs(randPosition) < 70){ proximityCounter++; }
      // if all three dimensions are close to our centre, recalculate c
      if(proximityCounter === 3){ 
        randPosition = THREE.MathUtils.randFloat(130, 300); 
        if(Math.floor(Math.random() * 2) === 0){ randPosition = randPosition * -1; }
      }

      return randPosition;
    });

    return [a, b, c]
  }

  meshStar.position.set(x, y, z);
  scene.add(meshStar);
}

Array(800).fill().forEach(addStar);


function animate() {
  requestAnimationFrame(animate);

  meshIcosahedron.rotation.x += 0.005;
  meshIcosahedron.rotation.y += 0.0025;
  meshIcosahedron.rotation.z += 0.005;

  controls.update();

  renderer.render(scene, camera);
}

animate();