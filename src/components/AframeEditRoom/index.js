import React, { FC, useEffect, useState } from "react";

export default function AframeEditRoom ({picNo, setPicNo, chooseFlag, setChooseFlag, imageUrl}) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() =>{
    AFRAME.registerComponent('cursor-listen', {
      schema: {
          picno: { default: 0 },
      },
      init: function () {
        this.el.addEventListener('click', (e) => {
          setPicNo(this.attrValue.picno);
        });
        this.el.addEventListener('mouseenter', (e) => {
            document.querySelector('#cursor').setAttribute('material', 'color', 'red');
        });
        this.el.addEventListener('mouseleave', (e) => {
            document.querySelector('#cursor').setAttribute('material', 'color', 'white');
        });
      }
    });
    require('aframe/dist/aframe-master.js');
    setMounted(true)
  }, [])

  useEffect(() => {
    if(chooseFlag) {
      var frameEl = document.querySelector(`.picno${picNo}`);
      var frame_imageEL = document.createElement('a-image');
      frameEl.appendChild(frame_imageEL);
      frame_imageEL.setAttribute('src', imageUrl);
      frame_imageEL.setAttribute("width", 1.1);
      frame_imageEL.setAttribute("height", 1.1);
      frame_imageEL.setAttribute('position', { x: 0, y: 0, z: 0.01 });
      setChooseFlag(false);
      setPicNo('0');
    }
  }, [chooseFlag])

  if (mounted) {
    return (
        <a-scene arjs='' embedded renderer="antialias: true;
        colorManagement: true;
        sortObjects: true;
        physicallyCorrectLights: true;
        maxCanvasWidth: 1920;
        maxCanvasHeight: 1920;" stats>
            <a-assets timeout="100000">
                <a-asset-item id="room-gltf" src="/assets/models/Normal room.glb"></a-asset-item>
                <a-asset-item id="arcade-gltf" src="/assets/models/Arcade console.glb"></a-asset-item>
                <a-asset-item id="atm-gltf" src="/assets/models/ATM.glb"></a-asset-item>
                <a-asset-item id="chair-gltf" src="/assets/models/chair.glb"></a-asset-item>

                <a-asset-item id="vr-gltf" src="/assets/models/VR.glb"></a-asset-item>
                <a-asset-item id="navmesh-gltf" src="/assets/models/navmesh.gltf"></a-asset-item>

                <img id="hub-img" src="/assets/images/hub.png"/>
                <img id="sky-img" src="/assets/images/sky.jpg"/>

            </a-assets>

            <a-entity id="player">
                <a-entity simple-navmesh-constraint="navmesh:#navmesh;fall:0.5;height:1.65;" id="head"
                          camera="fov: 70; active: true" position="0 1.65 0" wasd-controls="acceleration: 20;"
                          look-controls="pointerLockEnabled: true; reverseMouseDrag: false">
                    <a-entity id="cursor" class="mouseOnly" cursor="mousedown: true;" raycaster="far: 10; objects: .clickable"
                              material="color: white; shader: flat" position="0 0 -0.3"
                              geometry="primitive: ring; radiusInner: 0.005; radiusOuter: 0.007">
                    </a-entity>
                </a-entity>
                <a-entity id="leftHand" class="leftController controllerOnly"
                          hand-controls="hand: left; handModelStyle: lowPoly; color: #15ACCF"
                          laser-controls="hand: left" vive-controls="hand: left" oculus-touch-controls="hand: left"
                          windows-motion-controls="hand: left" daydream-controls="hand: left"
                          gearvr-controls="hand: left" magicleap-controls="hand: left" oculus-go-controls="hand: left"
                          valve-index-controls="hand: left" vive-focus-controls="hand: left"
                          generic-tracked-controller-controls="hand: left" raycaster="far: 0; objects: .leftclickable;"
                          blink-controls="cameraRig: #player; teleportOrigin: #camera; button: trigger; curveShootingSpeed: 10; collisionEntities: .collision; landingMaxAngle: 10"
                          visible="true"></a-entity>
                <a-entity id="rightHand" class="rightController controllerOnly"
                          hand-controls="hand: right; handModelStyle: lowPoly; color: #15ACCF"
                          laser-controls="hand: right" vive-controls="hand: right" oculus-touch-controls="hand: right"
                          windows-motion-controls="hand: right" daydream-controls="hand: right"
                          gearvr-controls="hand: right" magicleap-controls="hand: right"
                          oculus-go-controls="hand: right" valve-index-controls="hand: right"
                          vive-focus-controls="hand: right" generic-tracked-controller-controls="hand: right"
                          raycaster="showLine: true; far: 10; interval: 0; objects: .clickable, a-link;"
                          line="color: lawngreen; opacity: 0.5" visible="true"></a-entity>
            </a-entity>

            <a-gltf-model shadow="cast: true; receive: true" class="model" src="#room-gltf" position="0 0 0"
                          scale="1 1 1"></a-gltf-model>
            <a-gltf-model shadow="cast: true; receive: true" class="model" src="#arcade-gltf" position="0 0 0"
                          scale="1 1 1"></a-gltf-model>
            <a-gltf-model shadow="cast: true; receive: true" class="model" src="#atm-gltf" position="0 0 0"
                          scale="1 1 1"></a-gltf-model>
            <a-gltf-model shadow="cast: true; receive: true" class="model" src="#chair-gltf" position="0 0 0"
                          scale="1 1 1"></a-gltf-model>
            <a-gltf-model shadow="cast: true; receive: true" class="model clickable nocollision" src="#vr-gltf"
                          simple-link="href: ../solarity-build-v-3/dist/index.html" position="0.4 1 -2.6" scale="1 1 1">
            </a-gltf-model>
            <a-entity id="navmesh" class="model" gltf-model="/assets/models/navmesh.gltf" visible="false" position="0 0 0"></a-entity>

            <a-entity position="0 2 0" rotation="0 0 0"
                      light="type: point; intensity:  5; distance: 10; decay: 1; color:  #FFFFFF; cast-shadow: false; shadowCameraVisible: false;">
            </a-entity>
            <a-entity position="2.7 1 -0.35" rotation="-30 110 0"
                      light="type: spot; intensity:  0.2; distance:0.6; penumbra: 0.5; decay: 1; color:  #FFFFFF; cast-shadow: true; shadow-map-height: 1024; shadow-map-width: 1024; shadowCameraVisible: false;">
            </a-entity>
            <a-entity light="type: ambient; intensity: 0.2; color:  #FFFFFF; shadowCameraVisible: false;"></a-entity>

            <a-plane class = "frame picno1 clickable" cursor-listen="picno: 1" position="-2.25 1.65 -2.93" width="1.1" height="1.1" rotation="0 0 0" material="shader:standard;" color="#111122">
            </a-plane>
            <a-plane class = "frame picno2 clickable" cursor-listen="picno: 2" position="-2.98 1.84 -1.7" width="1.1" height="1.1" rotation="0 90 0" material="shader:standard;" color="#111122">
            </a-plane>
            <a-plane class = "frame picno3 clickable" cursor-listen="picno: 3" position="-2.98 1.47 0.42" width="1.1" height="1.1" rotation="0 90 0" material="shader:standard;" color="#111122">
            </a-plane>
            <a-plane class = "frame picno4 clickable" cursor-listen="picno: 4" position="-2.98 2.06 1.92" width="1.1" height="1.1" rotation="0 90 0" material="shader:standard;" color="#111122">
            </a-plane>
            <a-plane class = "frame picno5 clickable" cursor-listen="picno: 5" position="2.97 2.33 2.15" width="1.1" height="1.1" rotation="0 90 0" material="shader:standard;" color="#111122">
            </a-plane>
            {/* <a-image width="1.5" height="2" class="clickable nocollision" simple-link="href: ../hub/hub.html"
                    src="#hub-img" position="-1.9 1.1 2.9" rotation="0 0 0" material=" shader: liquid-portal">
                <a-box color="black" width="1.5" position="0 -1 0" height="0.1" depth="0.1"></a-box>
                <a-box color="black" width="1.5" position="0 1 0" height="0.1" depth="0.1"></a-box>
                <a-box color="black" width="0.1" position="0.7 0 0" height="1.9" depth="0.1"></a-box>
                <a-box color="black" width="0.1" position="-0.7 0 0" height="1.9" depth="0.1"></a-box>
            </a-image> */}
            <a-sky src="#sky-img"></a-sky>
        </a-scene>
    )
  }
  return (
    <div>load...</div>
  )
}