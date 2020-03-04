var camera1;
var camera2;
var scene;
var renderer1;
var renderer2;

var width;
var height;

function init() {
	setWinSize();
//sceneオブジェクトの作成
scene = new THREE.Scene();

//cameraオブジェクトの作成
camera1 = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera2 = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

//rendererオブジェクトの作成
renderer1 = new THREE.WebGLRenderer();
renderer1.setClearColor(new THREE.Color(0xEEEEEE));
renderer1.setSize(width, height);
renderer1.shadowMap.enabled = true;

renderer2 = new THREE.WebGLRenderer();
renderer2.setClearColor(new THREE.Color(0xEEEEEE));
renderer2.setSize(width, height);
renderer2.shadowMap.enabled = true;

//直線の追加
var geo1 = new THREE.Geometry();
var geo2 = new THREE.Geometry();
var geo3 = new THREE.Geometry();

geo1.vertices.push((new THREE.Vector3(0,0,0)));
geo1.vertices.push((new THREE.Vector3(100,0,0)));
geo2.vertices.push((new THREE.Vector3(0,0,0)));
geo2.vertices.push((new THREE.Vector3(0,100,0)));
geo3.vertices.push((new THREE.Vector3(0,0,0)));
geo3.vertices.push((new THREE.Vector3(0,0,100)));
var line1 = new THREE.Line(geo1,new THREE.LineBasicMaterial({color:0xff0000}));
var line2 = new THREE.Line(geo2,new THREE.LineBasicMaterial({color:0x00ff00}));
var line3 = new THREE.Line(geo3,new THREE.LineBasicMaterial({color:0x0000ff}));
scene.add(line1);
scene.add(line2);
scene.add(line3);


//平面の追加
var planeGeometry = new THREE.PlaneGeometry(60,20);
var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
plane.receiveShadow = true;

scene.add(plane);

//cubeの追加
var cubeGeometry = new THREE.BoxGeometry(4,4,4);
var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-4,3,0);
cube.castShadow = true;
scene.add(cube);

//sphereの追加
var sphereGeometry = new THREE.SphereGeometry(4,20,20);
var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(20,0,2);
sphere.castShadow = true;
scene.add(sphere);

//光源の追加
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-20,30,-5);
spotLight.castShadow = true;
scene.add(spotLight);

//カメラの設定
var ScnPos = new THREE.Vector3(10,0,0);
var CamPos = new THREE.Vector3(10,100,60);
var MovPos = new THREE.Vector3(5,0,0);
camera1.position.set(CamPos.x,CamPos.y,CamPos.z);
camera1.lookAt(ScnPos);

ScnPos.add(MovPos);
CamPos.add(MovPos);
camera2.position.set(CamPos.x,CamPos.y,CamPos.z);
camera2.lookAt(ScnPos);

	var step = 0;
	function render() {
		// body...
		document.getElementById("webGL-op1").appendChild(renderer1.domElement);
		document.getElementById("webGL-op2").appendChild(renderer2.domElement);

		cube.rotation.x += 0.02;
		cube.rotation.y += 0.02;
		cube.rotation.z += 0.02;

		step += 0.04;
		sphere.position.x = 20 + (10 * Math.cos(step));
		sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

		requestAnimationFrame(render);
		renderer1.render(scene,camera1);
		renderer2.render(scene,camera2);
	}
	render();
}

function onResize() {
	// body...
	setWinSize();
	camera1.aspect = width / height;
	camera1.updateProjectionMatrix();
	renderer1.setSize(width, height);

	camera2.aspect = width / height;
	camera2.updateProjectionMatrix();
	renderer2.setSize(width, height)

}
window.addEventListener('resize', onResize, false);

function setWinSize() {
	width = (window.innerWidth - 40) / 2;
	height= window.innerHeight;
}
