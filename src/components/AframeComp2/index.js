import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";

export default function AframeComp2() {
  const [mounted, setMounted] = useState(false);
  const [permition, setPermition] = useState(true);
  const assets = [
    {
      pos: "-2.25 1.65 -2.93",
      rot: "0 0 0",
    },
    {
      pos: "-2.97 1.84 -1.7",
      rot: "0 90 0",
    },
    {
      pos: "-2.97 1.47 0.42",
      rot: "0 90 0",
    },
    {
      pos: "-2.97 2.06 1.92",
      rot: "0 90 0",
    },
    {
      pos: "2.97 2.33 2.15",
      rot: "180 90 0",
    },
  ];
  const { rooms } = useSelector((state) => ({
    rooms: state.profile.data.rooms,
  }));
  useEffect(() => {
    require("aframe/dist/aframe-master.js");
    setMounted(true);
    if (!rooms || (rooms && rooms.length == 0)) {
      setPermition(true);
    }
  }, []);
  if (permition) {
    if (mounted) {
      return (
        <a-scene
          arjs=""
          embedded
          renderer="antialias: true;
          colorManagement: true;
          sortObjects: true;
          physicallyCorrectLights: true;
          maxCanvasWidth: 1920;
          maxCanvasHeight: 1920;"
          stats
        >
          <a-assets timeout="100000">
            <a-asset-item
              id="room-gltf"
              src="/assets/models/Normal room.glb"
            ></a-asset-item>
            <a-asset-item
              id="arcade-gltf"
              src="/assets/models/Arcade console.glb"
            ></a-asset-item>
            <a-asset-item
              id="atm-gltf"
              src="/assets/models/ATM.glb"
            ></a-asset-item>
            <a-asset-item
              id="chair-gltf"
              src="/assets/models/chair.glb"
            ></a-asset-item>

            <a-asset-item
              id="vr-gltf"
              src="/assets/models/VR.glb"
            ></a-asset-item>
            <a-asset-item
              id="navmesh-gltf"
              src="/assets/models/navmesh.gltf"
            ></a-asset-item>

            <img id="hub-img" src="/assets/images/hub.png" />
            <img id="sky-img" src="/assets/images/sky.jpg" />
          </a-assets>

          <a-entity id="player">
            <a-entity
              simple-navmesh-constraint="navmesh:#navmesh;fall:0.5;height:1.65;"
              id="head"
              camera="fov: 70; active: true"
              position="0 1.65 0"
              wasd-controls="acceleration: 20;"
              look-controls="pointerLockEnabled: true; reverseMouseDrag: false"
            ></a-entity>
          </a-entity>

          <a-gltf-model
            shadow="cast: true; receive: true"
            class="model"
            src="#room-gltf"
            position="0 0 0"
            scale="1 1 1"
          ></a-gltf-model>
          <a-gltf-model
            shadow="cast: true; receive: true"
            class="model"
            src="#arcade-gltf"
            position="0 0 0"
            scale="1 1 1"
          ></a-gltf-model>
          <a-gltf-model
            shadow="cast: true; receive: true"
            class="model"
            src="#atm-gltf"
            position="0 0 0"
            scale="1 1 1"
          ></a-gltf-model>
          <a-gltf-model
            shadow="cast: true; receive: true"
            class="model"
            src="#chair-gltf"
            position="0 0 0"
            scale="1 1 1"
          ></a-gltf-model>
          <a-gltf-model
            shadow="cast: true; receive: true"
            class="model clickable nocollision"
            src="#vr-gltf"
            simple-link="href: ../solarity-build-v-3/dist/index.html"
            position="0.4 1 -2.6"
            scale="1 1 1"
          ></a-gltf-model>
          <a-entity
            id="navmesh"
            class="model"
            gltf-model="/assets/models/navmesh.gltf"
            visible="false"
            position="0 0 0"
          ></a-entity>

          <a-entity
            position="0 2 0"
            rotation="0 0 0"
            light="type: point; intensity:  5; distance: 10; decay: 1; color:  #FFFFFF; cast-shadow: false; shadowCameraVisible: false;"
          ></a-entity>
          <a-entity
            position="2.7 1 -0.35"
            rotation="-30 110 0"
            light="type: spot; intensity:  0.2; distance:0.6; penumbra: 0.5; decay: 1; color:  #FFFFFF; cast-shadow: true; shadow-map-height: 1024; shadow-map-width: 1024; shadowCameraVisible: false;"
          ></a-entity>
          <a-entity light="type: ambient; intensity: 0.2; color:  #FFFFFF; shadowCameraVisible: false;"></a-entity>
          {assets.map((asset, index) => (
            <a-plane
              key={index}
              class={`frame picno${index + 1}`}
              position={asset.pos}
              width="1.1"
              height="1.1"
              rotation={asset.rot}
              material="shader:standard;"
              color="#111122"
            >
              {!!rooms[0] &&
                !!rooms[0].nftStates &&
                rooms[0].nftStates.map((nft, index1) => {
                  if (index + 1 == nft.no)
                    return (
                      <a-image
                        src={nft.link}
                        width="1.1"
                        height="1.1"
                        position=""
                        material=""
                        geometry=""
                      ></a-image>
                    );
                })}
            </a-plane>
          ))}
          {/* <a-image width="1.5" height="2" class="clickable nocollision" simple-link="href: ../hub/hub.html"
                      src="#hub-img" position="-1.9 1.1 2.9" rotation="0 0 0" material=" shader: liquid-portal">
                  <a-box color="black" width="1.5" position="0 -1 0" height="0.1" depth="0.1"></a-box>
                  <a-box color="black" width="1.5" position="0 1 0" height="0.1" depth="0.1"></a-box>
                  <a-box color="black" width="0.1" position="0.7 0 0" height="1.9" depth="0.1"></a-box>
                  <a-box color="black" width="0.1" position="-0.7 0 0" height="1.9" depth="0.1"></a-box>
              </a-image> */}
          <a-sky src="#sky-img"></a-sky>
        </a-scene>
      );
    }
    return <div>load...</div>;
  } else {
    return (
      <div className="pt-20 text-center">
        {"You don't have any room please buy a room"}
      </div>
    );
  }
}
