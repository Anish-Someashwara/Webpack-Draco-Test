import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js";


export default class ThreeJsEnvironmentSetup {
	static instance = null;

	constructor(canvas) {
		if (ThreeJsEnvironmentSetup.instance) {
			return ThreeJsEnvironmentSetup.instance;
		}
		ThreeJsEnvironmentSetup.instance = this;


		this.canvas = canvas;
		this.scene = new THREE.Scene();

		// this.rgbeLoader = new RGBELoader();
		// const rgbeTexture = this.loadRGBETextures('./SceneThree.hdr');
		// rgbeTexture.then((texture) => {
		// 	texture.mapping = THREE.EquirectangularReflectionMapping;    
		// 	this.scene.background = texture;
		// 	this.scene.enviroment = texture;
		// 	console.log(texture);
		// });

		
		this.setupCamera();
		this.setupRenderer();
		this.setupControls();

		// this.axesHelper = new THREE.AxesHelper(5000);
		// this.scene.add(this.axesHelper);
		this.setupLights();
		// this.setupBaseWireframeMesh();

		// this.FontLoaderEditorIns = new FontLoaderEditor(this.scene, this.canvas); // FontLoaderEditor Instance

		window.addEventListener("resize", () => this.resize());
		this.resize();
		this.update();
	}

	

	


	setupCamera() {
		this.camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			0.1,
			10000,
		);
		this.camera.position.set(0, 0, 10);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	}

	setupRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		this.updateRendererProperties();
	}

	setupControls() {
		this.controls = new OrbitControls(this.camera, this.canvas);
	}

	setupLights() {
		// Ambient Light
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		this.scene.add(ambientLight);

		// Directional Light
		const directionalLight = new THREE.DirectionalLight(0xffffff, 20);
		// directionalLight.position.set(-10, -50, -8);
		this.scene.add(directionalLight);
	}

	setupBaseWireframeMesh() {
		const plane = new THREE.Mesh(
			new THREE.PlaneGeometry(100, 100, 10, 10),
			new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }),
		);
		plane.rotation.x = (Math.PI / 180) * 90;
		this.scene.add(plane);
	}

	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.updateRendererProperties();
	}

	updateRendererProperties() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.toneMapping = THREE.LinearToneMapping;
		this.renderer.toneMappingExposure = 1;
		this.renderer.render(this.scene, this.camera);
	}

	update() {
		if (this.controls) this.controls.update();
		this.renderer.render(this.scene, this.camera);
		window.requestAnimationFrame(() => this.update());
	}
}


