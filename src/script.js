import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const matCapTexture = new THREE.MeshNormalMaterial();

const fontLoader = new THREE.FontLoader();

fontLoader.load(
    '/fonts/Fascinate_Regular.json',
    (font) => {

        const textGeometry = new THREE.TextGeometry(
            'The Life',{

                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        const textGeometry2 = new THREE.TextGeometry(
            'Is Insane',{

                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        textGeometry.center();
        textGeometry2.center();

        const textObj = new THREE.Mesh(textGeometry, matCapTexture);
        const textObj2 = new THREE.Mesh(textGeometry2, matCapTexture);

        scene.add(textObj, textObj2);

        textObj.position.y = 0.5;
        textObj2.position.y = -0.3;

        const boxGeometry = new THREE.BoxGeometry(0.5,0.5,1);
        const donutGeometry = new THREE.TorusGeometry(0.33, 0.2, 20, 45);

        for(let i = 0; i < 330; i++){

            const meshBox = new THREE.Mesh(boxGeometry, matCapTexture);
            const donut = new THREE.Mesh(donutGeometry, matCapTexture);

            meshBox.position.x = (Math.random() - 0.5) * 30;
            meshBox.position.y = (Math.random() - 0.5) * 30;
            meshBox.position.z = (Math.random() - 0.5) * 30;

            donut.position.x = (Math.random() - 0.5) * 30;
            donut.position.y = (Math.random() - 0.5) * 30;
            donut.position.z = (Math.random() - 0.5) * 30;

            meshBox.rotation.y = (Math.random() - 0.5) * 30;

            scene.add(meshBox, donut);
        }

        const time = new THREE.Clock();

        const animation = () => {

            const getTiming = time.getElapsedTime();

            textObj.rotation.y = -getTiming;
            textObj2.rotation.y = getTiming;

            controls.update();

            renderer.render(scene, camera);

            window.requestAnimationFrame(animation);
        };

        animation();
    }
)

const sizesW = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizesW.width / sizesW.height, 0.1, 1000);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizesW.width, sizesW.height);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener('resize', () => {

    sizesW.width = window.innerWidth;
    sizesW.height = window.innerHeight;

    camera.aspect = sizesW.width / sizesW.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizesW.width, sizesW.height);
    renderer.render(scene, camera);
});
