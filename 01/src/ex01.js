import * as THREE from "three";

export default function example() {
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  //perspective camera(원근 카메라)
  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000
  // );

  //원근이 적용되지 않아 카메라와의 사물의 거리가 다르더라도 카메라엔 사물의 크기가 같게 보인다.
  // Orthographic camera(직교 카메라)
  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), //left
    window.innerWidth / window.innerHeight, //right,
    1, //top
    -1, //bottom
    0.1,
    1000
  );

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;

  camera.lookAt(0, 0, 0); //카메라가 매개변수 위치를 바라보게 한다.
  camera.zoom = 0.5; //Orthographic camera에서 mesh를 크게, 작게 보이고 싶다면 z position을 바꾸는 게 아닌 zoom을 바꿔야 한다.
  camera.updateProjectionMatrix(); //zoom을 적용시키려면 사용해야 한다.
  scene.add(camera);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    //   color: 0xff000,
    //   color: "red",
    color: "#ff0000",
  });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh); //무대에 Mesh를 올려야 보인다.

  renderer.render(scene, camera);
}
