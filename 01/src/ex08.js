import * as THREE from "three";
import gsap from "gsap";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("blue", 1, 7);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  //매개변수 1. 색상, 2. 빛의 강도
  const light = new THREE.DirectionalLight(0xffffff, 1); //태양빛과 비슷하다. 무대의 요소들에 전체적으로 다 조명을 준다.
  light.position.x = 2;
  light.position.y = 2;
  light.position.z = 10;
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "#ff0000",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let oldTime = Date.now();

  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }
  draw();

  gsap.to(mesh.position, {
    duration: 1,
    y: 3,
  });

  const setSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    draw();
  };
  window.addEventListener("resize", setSize);
}
