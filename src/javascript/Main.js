import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


export default class Main {
	constructor(scene) {
		this.scene = scene;
        this.testThreeJsSetup();
		
		this.rgbeLoader = new RGBELoader();
		const rgbeTexture = this.loadRGBETextures('../static/SceneOne.hdr');
		rgbeTexture.then((texture) => {
			texture.mapping = THREE.EquirectangularReflectionMapping;    
			this.scene.background = texture;
			this.scene.enviroment = texture;
			console.log(texture);
			this.environmentMap = texture;
		});

		this.gltfLoader = new GLTFLoader();
		const dracoLoader = new DRACOLoader(); // Setup Draco Loader
		dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/versioned/decoders/1.4.3/' );
		this.gltfLoader.setDRACOLoader( dracoLoader );
		this.loadGltfByUrl('../static/Fox-draco.gltf')
		.then((gltf) => {
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					// Set up material to use environment map for reflections
					child.material.envMap = this.environmentMap;
					child.material.envMapIntensity = 1; // Adjust intensity as needed
				}
			});

			gltf.scene.position.set(0, 0, 0);
			gltf.scene.scale.set(0.1, 0.1, 0.1);
			this.scene.add(gltf.scene);
		})

	}

	testThreeJsSetup() {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		this.scene.add(cube);
		console.log(cube.position)
	}

	// GLTF Loader
	loadGltfByUrl(url) {
		return new Promise((resolve, reject) => {
			const startTime = performance.now();
			this.gltfLoader.load(
				url,
				(gltf) => {
					const modelLoadTime = performance.now() - startTime;
					console.log(
						"GLTF model loaded in",
						Math.trunc(modelLoadTime),
						"milliseconds"
					);
					console.log(
						"************* Model Loaded Successfully *************"
					);
					resolve(gltf);
				},
				(xhr) => {
					console.log(
						Math.trunc((xhr.loaded / xhr.total) * 100) + "% loaded"
					);
				},
				(error) => {
					console.log("Error Occured while loading model: ", error);
					reject(error);
				}
			);
		});
	}

	// Loader RGBE assets
	loadRGBETextures(url) {
		return new Promise((resolve, reject) => {
			this.rgbeLoader.load(url, (texture)=>{
				console.log("RGBE Texture Loaded Successfully!");
				resolve(texture);
			},
			(xhr) => {console.log(Math.trunc((xhr.loaded / xhr.total) * 100) + "% loaded");},
			(error) => {
				console.log("Error Occured while loading rgbe texture: ", error);
				reject(error);
			})
		})
	}
}
