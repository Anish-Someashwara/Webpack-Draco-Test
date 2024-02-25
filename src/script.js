import './style.css';
import ThreeJsEnvironmentSetup  from "./javascript/ThreeJsEnvironmentSetup.js";
import MathEquations from "./javascript/Main.js";

// HTML Elements
const canvas = document.getElementById("webgl");

init();

function init(){

    // ThreeJs Scene Setup
    const ThreeJsEnvSetupIns = new ThreeJsEnvironmentSetup(canvas);
    const scene = ThreeJsEnvSetupIns.scene;
    
    // MathEquations.js --> Main Working Script
    let MathEquationIns = new MathEquations(scene, {});

}


