import * as THREE from './threejs/three.module.js';
import { OBJLoader } from './threejs/OBJLoader.js';
import { GLTFLoader } from './threejs/GLTFLoader.js';
import { TrackballControls } from './threejs/TrackballControls.js';
// import { ColladaLoader } from 'https://cdn.rawgit.com/mrdoob/three.js/r69/examples/js/loaders/ColladaLoader.js';

var container;
var camera, scene, renderer, controls;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var object;
var time = new THREE.Clock();

// declaration des variables globales
var  mixer, rail1,datGui,guiControl, rail2, terrain, locomotive, arc, materialArc, bird, materialBird, soleil, materialSun, materialHouse, cabine, loader, audioLoader, listener, materialTerrain, customMaterial, customUniforms, materialRail, materialTree, materialRailUnderground, materialSky, skyMesh;
var deltaa = 0.;

init();
animate();

guiControl= new function()
{
    this.rotationX=0.1;
}



function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    // scene
    scene = new THREE.Scene();
    // datGui= new dat.GUI();
    // datGui.add(guiControl,'rotationX',0,1);
    // datGui.add(guiControl,'rotationX',0,1);
    // datGui.add(guiControl,'rotationX',0,1);
  


    createRenderer();

    // camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 4000);

    camera.lookAt(0, 0, 0);
    // var material = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.5});
    // var coverGeometry= new THREE.SphereBufferGeometry(2,2,2);
    // var cameraCover = new THREE.Mesh(material, coverGeometry);

    camera.position.z = 600;
    camera.position.y = -700;
    scene.add(camera);



    // controle sur la camera, type trackball
    controls = new TrackballControls(camera, renderer.domElement);



    // custum Shader

    // lights
    var ambiantLight = new THREE.AmbientLight(0x808080); // soft white light
    scene.add(ambiantLight);
    var light = new THREE.PointLight(0xFFFFFF, 1.0);
    light.position.set(0, 500, 500);
    scene.add(light);

    // OBJLoader    
    var objLoader = new OBJLoader(manager);
    objLoader.onError = function () {
        console.log("Error OBJLoader");
    }




    var materialLoader = loadMaterial();
    loadTerrain(scene, objLoader);
    loadSky(scene, customMaterial, materialLoader);
    loadTree(scene, objLoader);
    loadTree(scene, objLoader);
    loadHouse(scene, objLoader);

    // mise en place du terrain
    function loadModel() {
    }

    // LoadingManager
    var manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function (item, loaded, total) {
        console.log("Load:", item, "(", loaded, "/", total, ")");
    };

    //création et modification de la premiere corbure du rail1-->bas//

    loadRail_Droit(scene, objLoader);
    loadLocomotive(scene, objLoader, camera);



    createUIInterface();
    // gestion redimensionnement fenetre
    window.addEventListener('resize', onWindowResize, false);
}


function createRenderer() {
    // creation renderer    
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xAAAAAA, 1);
    container.appendChild(renderer.domElement);
}

// custom shader

function creatCustomShader() {
    customUniforms = {
        delta: { value: 0 }
    };

    customMaterial = new THREE.ShaderMaterial({
        uniforms: customUniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        side: THREE.BackSide
    });

}

// clonage a partir de la rails de courbure
function loadRail_Droit(scene, objLoader) {

    objLoader.load('data/models/rail1.obj', function (obj) {
        rail1 = obj;

        rail1.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = materialRail;

            }
        })

        cloneRails_1(scene);

        // creation des courbures
        loadRail_Courbure(scene, objLoader);
    });
}

function cloneRails_1(scene) {
    //  declaration  des variables
    var copyrail1;
    var copyrail1_1;
    var copyrail1_4;
    var copyrail1_5;
    var copyrail1_2;
    var copyrail2;
    var axesHelper = new THREE.AxesHelper(1000);
    var premierRails;
    // Ajoutons une planche aux rails pour le gravier

    var railDessous = new THREE.PlaneGeometry(270, 320);
    var meshPlane = new THREE.Mesh(railDessous, materialRailUnderground);
    meshPlane.add(axesHelper);
    meshPlane.rotation.x += 29.88;

    rail1.add(meshPlane);


    rail1.rotateX(90.0 * 2.0 * Math.PI / 360.0);
    rail1.scale.set(0.1, 0.1, 0.1);
    rail1.translateX(-100.0);
    rail1.translateZ(100.0);
    rail1.translateY(10.0);
    rail1.position.y -= 5;




    //creation de la premiere chaine de rails => center//
    for (var i = 0; i <= 15; i++) {
        copyrail1 = rail1.clone(true);
        copyrail1.position.y = rail1.position.y - (i * 30);
        scene.add(copyrail1);
    }

    // creation des rails chaine 1  --Point de depart;
    premierRails = rail1.clone(true);
    premierRails.add(axesHelper);
    premierRails.position.set(748, 970, 10);
    premierRails.rotateY(-10.0 * 2.0 * Math.PI / 360.0);


    for (var i = 0; i <= 33; i++) {

        copyrail2 = premierRails.clone(true);
        copyrail2.position.y = premierRails.position.y - (i * 30);
        copyrail2.position.x = premierRails.position.x - (i * 4.8);
        scene.add(copyrail2);
    }

    //creation de la quatrieme chaine de rails
    var copyrail1_3 = rail1.clone(true);
    copyrail1_3.position.x -= 43;
    for (var i = 0; i <= 10; i++) {
        copyrail1_1 = copyrail1_3.clone(true);
        copyrail1_1.position.y = copyrail1_3.position.y - (497);
        copyrail1_1.position.x = copyrail1_3.position.y - (497);
        copyrail1_1.rotateY(450 * 2.0 * Math.PI / 360.0);
        copyrail1_1.position.x = copyrail1_3.position.x - (i * 30);
        scene.add(copyrail1_1);
    }
    //création de la cinquieme chaine de raies
    var copyrail1_41 = rail1.clone(true);
    copyrail1_41.position.y -= 530;
    copyrail1_41.position.x -= 385;
    for (var i = 0; i <= 1; i++) {
        copyrail1_4 = copyrail1_41.clone(true);
        copyrail1_4.position.y = copyrail1_41.position.y - (i * 30);

        scene.add(copyrail1_4);
    }
    //création de la sixieme chaine de raies
    var copyrail1_51 = rail1.clone(true);
    copyrail1_51.position.x -= 425;
    copyrail1_51.position.y -= 603;
    copyrail1_51.rotateY(450 * 2.0 * Math.PI / 360.0);
    for (var i = 0; i <= 6; i++) {
        copyrail1_5 = copyrail1_51.clone(true);
        copyrail1_5.position.x = copyrail1_51.position.x - (i * 30);


        scene.add(copyrail1_5);
    }
    scene.add(rail1);
    scene.add(premierRails);

}

function cloneRails_2(scene) {
    var copyrail2;
    var copyrail1_2;
    var copyrail2_1;
    var copyrail2_3;
    var copyrail2_2;
    rail2.rotateX(90.0 * 2.0 * Math.PI / 360.0);
    rail2.rotateY(90.0 * 2.0 * Math.PI / 360.0);
    rail2.scale.set(0.1, 0.1, 0.1);
    rail2.translateX(-60.0);
    rail2.translateZ(100.0);
    rail2.translateY(10.0);
    rail2.position.x -= 154;
    //rail2.add(axesHelper);

    //création de la quatrieme courbure
    copyrail2_3 = rail2.clone(true);
    copyrail2_3.position.y = rail2.position.y - (542);
    copyrail2_3.position.x = rail2.position.x - (385);

    //création de la cinquieme courbure
    copyrail2_2 = rail2.clone(true);
    copyrail2_2.rotateY(-175 * 2.0 * Math.PI / 360.0);
    copyrail2_2.position.y = rail2.position.y - (650);
    copyrail2_2.position.x = rail2.position.x - (475);


    scene.add(copyrail2_3);
    scene.add(copyrail2_2);

    //////////////:
    // creation de la 2eme chaine NADA// 
    for (var i = 0; i <= 20; i++) {

        copyrail1_2 = rail1.clone(true);
        copyrail1_2.position.x = rail2.position.x + (i * 30);
        copyrail1_2.translateX(-1.5);
        copyrail1_2.position.y += 45;
        copyrail1_2.rotateY(90.0 * 2.0 * Math.PI / 360.0);
        scene.add(copyrail1_2);
        //3eme courbure NADA//
        copyrail2_1 = rail2.clone(true);
        copyrail2_1.position.x = copyrail1_2.position.y + (30);
        copyrail2_1.rotateY(-180 * 2.0 * Math.PI / 360.0);
        copyrail2_1.position.x += 570;
        scene.add(copyrail2_1);
    }

    /////////////////
    //création et modification de la premiere corbure du rail2-->bas//
    copyrail2 = rail2.clone(true);
    copyrail2.position.y = rail2.position.y - (544);

    copyrail2.rotateY(-175 * 2.0 * Math.PI / 360.0);
    copyrail2.position.x = rail2.position.x - (90);
    scene.add(rail2);
    scene.add(copyrail2);
}

function loadRail_Courbure(scene, objLoader) {

    objLoader.load('data/models/rail2.obj', function (obj) {
        rail2 = obj;
        rail2.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = materialRail;

            }
        })
        cloneRails_2(scene);
    });
}

// gestion redimensionnement fenetre
function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//  deplacement de la locomotive
function animateLocomotive() {
    if (locomotive) {



        // var deltatime = time.getDelta();
        var deltatime = 0.01585;
        var speed = 270.0;
        let turnSpeed = 0.0235 * speed;
        let turnSpeed2 = 0.0135 * speed;
        let turnY = 0.0058 * speed;
        let turnX = 0.02 * speed;
        var cofProportionnalite = -0.16;
        let decalageX = speed * cofProportionnalite;
        let y = locomotive.position.y;
        let x = locomotive.position.x;
        let l_rotationY = locomotive.rotation.y;
        let l_rotationX = locomotive.rotation.x;

        //  go street
        if (y > -40) {
            locomotive.position.y -= (deltatime * speed);
            locomotive.position.x += (deltatime * decalageX);
            // console.log("x : " + x + " y :" + y);

        } else {

            //  turn rigth
            if (y <= -40 && y >= -65 && x > 530.0) {
                locomotive.rotation.y -= (turnSpeed * 2.0 * Math.PI / 360);
                locomotive.position.x -= (deltatime * speed);
                locomotive.position.y -= turnY;
                // console.log("x : " +x + " y :" + y);

            } else {
                //  go street
                if (x <= 541 && x >= -50 && y >= -70) {
                    locomotive.position.x -= (deltatime * speed);
                    //  console.log("x : " +locomotive.position.x + " y :" + locomotive.position.y);

                } else {

                    //  turn left
                    if ((y - turnY) <= -62 && (y - turnY) >= -100 && (x - (deltatime * speed) > -100)) {
                        locomotive.rotation.y += (turnSpeed * 2.8 * Math.PI / 360);
                        locomotive.position.x -= (deltatime * speed);
                        locomotive.position.y -= turnY;
                        // console.log("x : " + locomotive.position.x + " y :" + locomotive.position.y);

                    }

                    else {

                        // //go street
                        if (y >= -582) {
                            // console.log("r3 : " + locomotive.position.x + " y2 :" + locomotive.position.y);
                            // console.log("x : " + x + " y :" + y);


                            locomotive.position.y -= (deltatime * speed);
                            // locomotive.position.x -= (deltatime * decalageX);
                            //  console.log("x : " + locomotive.position.x + " y :" + locomotive.position.y);



                        } else {

                            //  turn rigth
                            if ((y - turnY) <= -582 && (y - turnY) >= -605 && (x - (deltatime * speed)) > -250.0) {
                                locomotive.rotation.y -= (turnSpeed * 2.357 * Math.PI / 360);
                                locomotive.position.x -= (deltatime * speed);
                                locomotive.position.y -= turnY;
                                // console.log("x : " + locomotive.position.x + " y :" + locomotive.position.y);

                            } else {

                                // //go street
                                if (x >= -502) {
                                    locomotive.position.x -= (deltatime * speed);
                                    // locomotive.position.x -= (deltatime * decalageX);
                                    // console.log("x : " + locomotive.position.x + " y :" + locomotive.position.y);

                                }
                            }
                        }
                    }


                }



            }

        }

    }




    //  if(x<=533.0 &&  x>= 510.){

    //     locomotive.position.y-=2;
    //     console.log("x : " +x + " y :" + y);




    //  }
    //  if(y>=-40 ){
    //     locomotive.position.x-=(deltatime*speed);
    //     // locomotive.position.x+=(deltatime*decalageX);
    //  }




}

function animate() {

    controls.update();
    render();
    animateLocomotive();
    animateSky();
    updateUniformsVariable();
	var delta = time.getDelta();
   if(mixer) mixer.update(delta);
    requestAnimationFrame(animate);


}

function updateUniformsVariable() {
    if (skyMesh) {
        if (customUniforms) {
            deltaa += 0.1;
            skyMesh.material.uniforms.delta.value = deltaa;
            console.log("delta setted");
        }

    }

}

function animateSky() {
    if (skyMesh) {
        skyMesh.rotation.y += 0.001;
    }
}

function render() {
    renderer.render(scene, camera);
}

function loadTerrain(scene, objLoader) {
    objLoader.load('data/models/TerrainLod4.obj', function (obj) {
        terrain = obj;
        // terrain.scale.set(2,2,2);
        terrain.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = materialTerrain;

            }
        })
        scene.add(terrain);

    });
}
function loadSky(scene, materialSky, materialLoader) {
    //  We load sky underground texture
    materialLoader.load("./data/textures/sky.jpg",
        function (texture) {
            materialSky = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });


            creatCustomShader();
    
            // Ajout du ciel
            // var skyBox= new THREE.BoxGeometry(1990,1990,1200);
            var skyBox = new THREE.SphereGeometry(1490, 10, 10);
            skyMesh = new THREE.Mesh(skyBox, customMaterial);
            skyMesh.rotation.y += 30;
            skyMesh.rotation.x += 30;


            scene.add(skyMesh);
        })
}

function loadTree(scene, objLoader) {
    objLoader.load('data/models/arbre/Tree1.obj', function (obj) {
        var arbre = obj;
        let axesHelper = new THREE.AxesHelper(1000);
        //arbre.add(axesHelper);

        arbre.position.x -= 100;
        arbre.rotateX(90.0 * 2.0 * Math.PI / 360.0);
        arbre.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = materialTree;

            }
        })
        var arbre_2 = arbre.clone(true);
        arbre_2.position.x += 200;

        var arbre_3 = arbre.clone(true);
        arbre_3.position.x -= 500;
        arbre_3.position.y -= 500;

        var arbre_4 = arbre.clone(true);
        arbre_4.position.x = 600;
        arbre_4.position.y -= 500;


        var arbre_5 = arbre.clone(true);
        arbre_5.position.x += 600;

        scene.add(arbre);
        scene.add(arbre_2);
        scene.add(arbre_3);
        scene.add(arbre_4);
        scene.add(arbre_5);

    });

}
function loadMaterial() {
    // We are going to load material 
    var materialLoader = new THREE.TextureLoader();

    //  We load terrain texture
    materialLoader.load("./data/textures/Terrain/this.jpg",
        function (texture) {
            materialTerrain = new THREE.MeshPhongMaterial({ map: texture });
        })

    //  We load tails texture
    materialLoader.load("./data/textures/Rail/ray.JPG",
        function (texture) {
            materialRail = new THREE.MeshLambertMaterial({ map: texture });
        })

    //  We load rail1 underground texture
    materialLoader.load("./data/textures/Rail/taslar.jpg",
        function (texture) {
            materialRailUnderground = new THREE.MeshLambertMaterial({ color: 0xffffff, map: texture });
        })

    //  We load tree  texture
    materialLoader.load("./data/textures/grass.jpg",
        function (texture) {
            materialTree = new THREE.MeshLambertMaterial({ color: 0xffffff, map: texture });
        })



    //We load house texture
    materialLoader.load("./data/cabii.png",
        function (texture) {
            materialHouse = new THREE.MeshPhongMaterial({ map: texture });
        })

    //We load sun texture
    materialLoader.load("./data/soleil.png",
        function (texture) {
            materialSun = new THREE.MeshPhongMaterial({ map: texture });
        })
    //We load arc texture
    materialLoader.load("./data/arc.png",
        function (texture) {
            materialArc = new THREE.MeshPhongMaterial({ map: texture });
        })
    return materialLoader;

}
function loadHouse(scene, objLoader) {
    objLoader.load('data/cabii.obj', function (obj) {
        cabine = obj;
        cabine.scale.set(0.5, 0.5, 0.5);
        cabine.position.set(-590, -100, 0);
        cabine.rotateZ(90.0 * 2.0 * Math.PI / 360.0);

        cabine.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = materialHouse;

            }
        })
        scene.add(cabine);
    });
    //ajout du son
    var listener = new THREE.AudioListener();
    camera.add(listener);
    var sound = new THREE.Audio(listener);
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('./data/textures/sounds/trsound.wav', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });


    //ajout du oiseau


    var loader = new GLTFLoader();
    loader.load('./data/Colibri.glb', function (gltf) {

        var bird = gltf;
       

        scene.add(bird.scene);

        bird.animations; // Array<THREE.AnimationClip>
        bird.scene; // THREE.Scene
        bird.scenes; // Array<THREE.Scene>
        bird.cameras; // Array<THREE.Camera>
        bird.asset;
        var exeh = new THREE.AxesHelper(10000);
        bird.scene.position.set(0, 0, 100);
       // bird.scene.add(exeh);
        bird.scene.scale.set(500, 500, 500);
      

        mixer = new THREE.AnimationMixer(bird.scene);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });


    });
    //});


    //ajout du soleil
    objLoader.load('./data/sun.obj', function (obj) {
        soleil = obj;

        soleil.scale.set(0.5, 0.5, 0.5);
        soleil.position.set(-1600, 30, 100);
        soleil.rotateZ(90.0 * 2.0 * Math.PI / 360.0);
        soleil.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = materialSun;

            }
        })
        scene.add(soleil);
    });

    //ajout de l'arc en ciel
    objLoader.load('./data/Arc.obj', function (obj) {
        arc = obj;

        arc.scale.set(0.05, 0.05, 0.05);
        arc.position.set(0, 1000, 0);
        arc.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = materialArc;

            }
        })
        scene.add(arc);
    });

}

function loadLocomotive(scene, objLoader, camera) {

    objLoader.load('./data/models/newLocomotive.obj', function (obj) {
        locomotive = obj;
        var locomotiveAxis = new THREE.AxesHelper(2000);
        locomotiveAxis.position.set(0, 0, 0);
        locomotive.add(locomotiveAxis);
        locomotive.rotateX(90.0 * 2.0 * Math.PI / 360.0);
        locomotive.rotateY(-9.0 * 2.0 * Math.PI / 360.0);

        locomotive.scale.set(0.3, 0.3, 0.3);
        locomotive.translateX(-100.0);
        locomotive.translateZ(100.0);
        locomotive.translateY(10.0);
        locomotive.position.set(720, 798, 10);

        locomotive.traverse(function (child) {
            if (child.isMesh)
                child.material = materialTerrain;

        });



        //******** */




        scene.add(locomotive);
    });


}

function createUIInterface()
{
   
 
}


