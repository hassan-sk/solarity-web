import { useEffect, useState, FC } from 'react'
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useWebTRTC } from '../../utils/useWebTRTC';
import { models } from '../../data/experience';
import { setMsg } from '../../redux/slices/chatSlice';
import ACTIONS from '../../config/actions';
import styles from './chat.module.css';
import {start_loading_screen_listeners, build_loading_screen} from './loading_screen'
import {start_screens} from './screens'
import {choose_controls, pass_controls} from './utils'

const ChatModule = () => {
  const [mounted, setMounted] = useState(false)
  const { roomName, userName, modelIndex, msgs, peers } = useAppSelector(state => state.chat);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { rid } = router.query;
  const { clients, provideRef, handelMute } = useWebTRTC(rid, {name: userName});
  const [sendData, setSendData] = useState('');
  const [intervalId, setIntervalId] = useState('');
  const [gifIntervalId, setGifIntervalId] = useState('');
  
  const [isMute, setMute] = useState(true);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    handelMute(isMute, userName);
  }, [isMute])

  useEffect(() => {
    require('aframe/dist/aframe-master.js');
    require('aframe-liquid-portal-shader');
    require('aframe-blink-controls');
    require('./components');
    setMounted(true)
    require('multiuser-aframe');
  }, [])
var sceneEl = document.querySelector('a-scene');
  
var loading_screenEl = document.getElementById('loading_screen');
var loading_textEl = document.getElementById('loading_text');
var loading_barEl = document.getElementById('loading_bar');
useEffect(() => {
  if(sceneEl && loading_textEl  && loading_barEl  &&  loading_screenEl) {console.log(sceneEl, loading_textEl, loading_barEl, loading_screenEl);
    // if (sceneEl.hasLoaded) {
        // start_scene();
    // } else {
      build_loading_screen();
      start_loading_screen_listeners(setLoaded);
      sceneEl.addEventListener('loaded', start_scene);
    // }
  }
}, [sceneEl, loading_textEl, loading_barEl, loading_screenEl])
  
  const start_scene = () => {
      // setGifIntervalId(start_screens())
      choose_controls();
      pass_controls();
  }

  const updateVolume = () => {
    var positions = {};
    for(var playerName in window.positions) {
      var player = window.positions[playerName];
      if(!!player.components) {
        positions[playerName] = player.components[0];
      }
      if(!!player.d){
        positions[playerName] = player.d[0].components[0];
      }
    }
    var myPosition = {};
    if(!!window.myPosition) {
      if(!!window.myPosition.components) {
        myPosition = window.myPosition.components[0];
      }
      if(!!window.myPosition.d) {
        myPosition = window.myPosition.d[0].components[0];
      }
    }
    var audios = window.audios;
    for(var audio in audios) {
      if(audio != userName) {
        if(!!positions[audio] && !!myPosition) {
          var a = myPosition.x - positions[audio].x;
          var b = myPosition.z - positions[audio].z;
          var distance = 7 - Math.sqrt(a*a + b*b);
          if(distance < 0 || distance > 7 || !distance)
            distance = 0;
          if(!!audios && !!audios[audio])
            audios[audio].volume = distance / 10;
        }
      }
    }
  }

  var entity = document.querySelector('a-entity[camera]');
  useEffect(() => {
    if(isLoaded) {
      if(!!entity) {
        entity.setAttribute('id', 'player');
        entity.setAttribute('class', 'heads');
        entity.setAttribute('networked', 'template:#avatar-template;attachTemplateToLocal:false;');
        entity.setAttribute('position', '0 1.6 0');
        sceneEl = null;
        // window.NAF.schemas.add({
        //   template: '#avatar-template',
        //   components: [
        //     'position',
        //     'rotation',
        //   ]
        // });
        setIntervalId(setInterval(updateVolume, 300));
      }
    }
  }, [isLoaded])

  const handelMuteBtnClick = () => {
    setMute((prev) => !prev);
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      sendMsg();
    }
  }

  const sendMsg = () => {
    window.socket.emit('send-msg', {roomId: rid, data: sendData});
    setSendData('');
  }

  const handelManualLeave = () => {
    clearInterval(intervalId);
    // clearInterval(gifIntervalId);
    window.isReady1 = false;
    window.positions = {};
    window.myPosition = {};
    window.socket.emit(ACTIONS.LEAVE, { roomId: rid, user: {name: userName} } );
    dispatch(setMsg([]));
    router.push('/experience');
  }

  useEffect(() => {
    if(!!document.querySelector('.ui-chat'))
      document.querySelector('.ui-chat').scrollTop = document.querySelector('.ui-chat').scrollHeight
  }, [msgs])

  if (mounted && models[modelIndex].modelUrl) {
      return (
        <div>
          <video className={styles.background_video} id="background_video" autoPlay loop muted>
              <source src="/assets/video/loading_video.mp4" type="video/mp4"/>
          </video>
          <div id="loading_screen" className={styles.loading_screen}>
              <div id="loading_text" className={styles.loading_text}>
              </div>
              <div id="loading_bar" className={styles.loading_bar}>
              </div>
              <div id="loading_label" className={styles.loading_label}>
                  POWERED BY SOLARITY
                  <img id="loading_logo" className={styles.loading_logo} src="/assets/images/loading_logo.png" />
              </div>
          </div>
          <div id="scene_wrapper" style={{opacity: "0"}}>
              <a-scene renderer="antialias: true;
              colorManagement: true;
              sortObjects: true;
              physicallyCorrectLights: true;
              maxCanvasWidth: 1920;
              maxCanvasHeight: 1920;" 
              networked-scene="
              room: blocks;
              debug: true;">
                <a-assets timeout="100000">
                  <a-asset-item id="headd" src="/assets/models/hub/Avatar head LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="backdeco" src="/assets/models/hub/Back decoration LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="chandelier" src="/assets/models/hub/Chandelier LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="decoration" src="/assets/models/hub/Decoration.glb"></a-asset-item>
                  <a-asset-item id="door" src="/assets/models/hub/Doors LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="frontwall" src="/assets/models/hub/Front wall stand LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="frames" src="/assets/models/hub/Image frames LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="pool" src="/assets/models/hub/Money pool LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="pillars" src="/assets/models/hub/Pillars LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="poker" src="/assets/models/hub/Poker table LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="relict" src="/assets/models/hub/Relict LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="skeleton" src="/assets/models/hub/Room skeleton LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="spotlights" src="/assets/models/hub/Spot lights LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="text" src="/assets/models/hub/Text.glb"></a-asset-item>
                  <a-asset-item id="walldeco" src="/assets/models/hub/Wall decoration LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="chair1" src="/assets/models/hub/chair.glb"></a-asset-item>
                  <a-asset-item id="backwall" src="/assets/models/hub/Back wall LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="curvedwall" src="/assets/models/hub/Curved wall.glb"></a-asset-item>
                  <a-asset-item id="table1" src="/assets/models/hub/table.glb"></a-asset-item>
                  <a-asset-item id="stairsh" src="/assets/models/hub/Stairs handles LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="stairs" src="/assets/models/hub/Stair LOW POLY.glb"></a-asset-item>
                  <a-asset-item id="stairsback" src="/assets/models/hub/Stair walkway.glb"></a-asset-item>
                  <a-asset-item id="walldeconeon" src="/assets/models/hub/Wall decoration neon LOW POLY.glb"></a-asset-item>

                  <a-asset-item id="raccoon-obj" src={models[modelIndex].modelUrl}></a-asset-item>
                  <img id="try-img" src="/assets/images/japan.png"/>
                  <img id="tweet-img" src="/assets/images/tweet.jpg"/>
                  <img id="sky-img" src="/assets/images/sky.jpg"/>

                  <img id="gallery-img" src="/assets/images/gallery.png"/>
                  <img id="room-img" src="/assets/images/room.png"/>

                  <img id="gif-img1" src="/assets/images/gif_img1.jpeg"/>
                  <img id="gif-img2" src="/assets/images/gif_img2.jpeg"/>
                  <img id="gif-img3" src="/assets/images/gif_img3.jpeg"/>
                  <img id="gif-img4" src="/assets/images/gif_img4.jpeg"/>
                  <template 
                    id="avatar-template"
                    dangerouslySetInnerHTML={{
                      __html: '<a-gltf-model src="#raccoon-obj"></a-gltf-model>'
                    }}
                  />
              </a-assets>

              <a-entity id="player">
                  <a-entity simple-navmesh-constraint="navmesh:#navmesh;fall:0.5;height:1.65;" id="head"
                            camera="fov: 70; active: true" position="0 1.65 0" wasd-controls="acceleration: 20;"
                            look-controls="pointerLockEnabled: true; reverseMouseDrag: false">
                      <a-entity id="cursor" class="mouseOnly" cursor="" raycaster="far: 10; objects: .clickable"
                                material="color: white; shader: flat" position="0 0 -0.3"
                                geometry="primitive: sphere; radius: 0.001">
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
              <a-entity light="type: ambient; intensity: 0; color:  #FFFFFF; shadowCameraVisible: false;"></a-entity>
              <a-entity light="type:point; color:  #FFFFFF; intensity: 3; distance: 10; decay: 1;" position="3 3 0">
              </a-entity>
              <a-entity light="type:point; color:  #FFFFFF; intensity: 3; distance: 10; castShadow: false; decay: 1"
                        position="-2.5 3 4.6">
              </a-entity>
              <a-entity light="type:point; color:  #FFFFFF; intensity: 3; distance: 10; castShadow: false; decay: 1"
                        position="-2.5 3 -4.6">
              </a-entity>
              <a-entity light="type:point; color:  #FFFFFF; intensity: 3; distance: 10; castShadow: false; decay: 1"
                        position="8.7 3 4.6">
              </a-entity>
              <a-entity light="type:point; color:  #FFFFFF; intensity: 3; distance: 10; castShadow: false; decay: 1"
                        position="8.7 3 -4.6">
              </a-entity>
              <a-entity light="type:spot; angle: 60; color:  #DDAAFF; intensity: 10; distance: 6; decay: 1;"
                        rotation="-45 90 0" position="-5 5.5 0">
              </a-entity>
              <a-entity light="type:spot; angle: 90; color:  #DDAAFF; intensity: 10; distance: 50; decay: 1; "
                        rotation="-90 0 0" position="14 5.5 0">
              </a-entity>
              <a-entity light="type:spot; angle: 90; color:  #DDAAFF; intensity: 10; distance: 50; decay: 1; "
                        rotation="-90 0 0" position="-13 5.5 0">
              </a-entity>

              <a-plane width="6.4" height="3.5" rotation="0 180 0" material="shader: standard;" position="3 2.4 7.4"
                      color="#111122">
                  <a-image id="big_screen_img" src="#try-img" rotation="0 -180 0" width="6.4" height="3.5"
                          position="0 0 0.01"></a-image>
              </a-plane>

              <a-plane class="clickable" id="nft" width="3" height="3.5" rotation="0 0 0" material="shader: flat;"
                      position="1.3 2.4 -7.4" color="#CC22FF">
                  <a-text align="center" rotation="0 0 0" width="2.9" value="FLOOR PRICE" position="0 -1.35 0.01"
                          x-offset="0.05" wrap-count="40" color="#FFFFFF"></a-text>
              </a-plane>

              <a-plane id="twitter" width="3" height="3.5" rotation="0 0 0" material="shader: flat;"
                      position="4.7 2.4 -7.4" color="#EECCFF">
                  <a-text align="center" rotation="0 0 0" width="2.9" value="LATEST TWEETS" position="0 1.6 0.01"
                          x-offset="0.05" wrap-count="30" color="#CC22FF"></a-text>
                  <a-plane text="value: up; wrap-count: 6; align: center" width=".15" height=".15" id="scroll_twitter_up"
                          class="clickable nocollision" material="shader: flat;" color="#44AABB"
                          position="1.35 -1.35 0.02">
                  </a-plane>
                  <a-plane text="value: down; wrap-count: 6; align: center" width=".15" height=".15"
                          id="scroll_twitter_down" class="clickable nocollision" material="shader: flat;" color="#44AABB"
                          position="1.35 -1.55 0.02">
                  </a-plane>
              </a-plane>

              <a-plane position="-13.21 2.75 4.33" width="1.5" height="1.75" rotation="0 133.25 0"
                      material="shader: standard;" color="#111122">
                  <a-image width="1.5" height="1.75" position="0 0 0.01"
                          src="\assets\images\ffc2b2a0-614a-4359-b164-68c5b9f4396d.jpg"></a-image>
              </a-plane>
              <a-plane position="-13.22 2.75 -4.3" width="1.5" height="1.75" rotation="0 46.75 0"
                      material="shader: standard;" color="#111122">
                  <a-image width="1.5" height="1.75" position="0 0 0.01" src="/assets/images/media_FKNOb38VgAkOruy.jpg">
                  </a-image>
              </a-plane>
              <a-plane position="-14.445 2.75 0" width="1.5" height="1.75" rotation="0 90 0" material="shader: standard;"
                      color="#111122">
                  <a-image width="1.5" height="1.75" position="0 0 0.01" src="/assets/images/download.png"></a-image>
              </a-plane>
              <a-image width="1.3" height="1.9" class="clickable nocollision" simple-link="href: ../gallery/gallery.html"
                      src="#gallery-img" position="14.2 1.1 2.2" rotation="0 -90 0" material=" shader: liquid-portal">
                  <a-box color="black" width="1.5" position="0 -1 0" height="0.1" depth="0.1"></a-box>
                  <a-box color="black" width="1.5" position="0 1 0" height="0.1" depth="0.1"></a-box>
                  <a-box color="black" width="0.1" position="0.7 0 0" height="1.9" depth="0.1"></a-box>
                  <a-box color="black" width="0.1" position="-0.7 0 0" height="1.9" depth="0.1"></a-box>
              </a-image>
              <a-image width="2.3" height="2.9" class="clickable nocollision" simple-link="href: " src="#try-img"
                      position="14.2 1.6 0" rotation="0 -90 0" material=" shader: liquid-portal">
                  <a-box color="black" width="2.5" position="0 -1.5 0" height="0.1" depth="0.1"></a-box>
                  <a-box color="black" width="2.5" position="0 1.5 0" height="0.1" depth="0.1"></a-box>
                  <a-box color="black" width="0.1" position="1.2 0 0" height="2.9" depth="0.1"></a-box>
                  <a-box color="black" width="0.1" position="-1.2 0 0" height="2.9" depth="0.1"></a-box>
              </a-image>
              <a-image width="1.5" height="2" class="clickable nocollision" simple-link="href:  ../room/room.html"
                      src="#room-img" position="14.2 1.1 -2.2" rotation="0 -90 0" material=" shader: liquid-portal">
                  <a-box color="black" width="1.5" position="0 -1 0" height="0.1" depth="0.1"></a-box>
                  <a-box color="black" width="1.5" position="0 1 0" height="0.1" depth="0.1"></a-box>
                  <a-box color="black" width="0.1" position="0.7 0 0" height="1.9" depth="0.1"></a-box>
                  <a-box color="black" width="0.1" position="-0.7 0 0" height="1.9" depth="0.1"></a-box>
              </a-image>
              {/* <a-plane class="clickable nocollision" simple-link="href: https://www.google.com" scale="1.5 2 1"
                      position="14.2 1.1 -2.5" rotation="0 -90 0"
                      material="background-color: #EE88FF; shader: portal; pano: /assets/images/japan.png"></a-plane> */}

              <a-gltf-model class="model" src="#skeleton" position="0 0 0" scale="1 1 1"> </a-gltf-model>
              <a-gltf-model class="model" src="#frontwall" position="0 0 0" scale="1 1 1"></a-gltf-model>

              <a-gltf-model class="model" src="#headd" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#chandelier" position="0 0 0" scale="1 1 1"></a-gltf-model>


              <a-gltf-model class="model" src="#door" position="0 0 0" scale="1 1 1"></a-gltf-model>

              <a-gltf-model class="model" src="#pool" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#frames" position="0 0 0" scale="1 1 1"></a-gltf-model>


              <a-gltf-model class="model" src="#backdeco" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#pillars" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#relict" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#poker" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#frontwall" position="0 0 0" scale="1 1 1"></a-gltf-model>


              <a-gltf-model class="model" src="#walldeco" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#text" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#spotlights" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#decoration" position="0 0 0" scale="1 1 1"></a-gltf-model>

              <a-gltf-model class="model" src="#curvedwall" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#backwall" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#walldeconeon" position="0 0 0" scale="1 1 1"></a-gltf-model> 

              <a-gltf-model class="model" src="#stairsh" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#stairs" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model class="model" src="#stairsback" position="0 0 0" scale="1 1 1"></a-gltf-model>

              <a-entity position="9 0 4.8">
                  <a-gltf-model class="model" src="#table1" position="0 0 0" scale="1 1 1"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position="1 0 .96" scale="1 1 1" rotation="0 0 0"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position="-.96 0 -1" scale="1 1 1" rotation="0 180 0;"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position="-.96 0 1" scale="1 1 1" rotation="0 270 0"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position=".96 0 -1" scale="1 1 1" rotation="0 90 0"></a-gltf-model>
              </a-entity>

              <a-entity position="9 0 -4.8">
                  <a-gltf-model class="model" src="#table1" position="0 0 0" scale="1 1 1"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position="1 0 .96" scale="1 1 1" rotation="0 0 0"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position="-.96 0 -1" scale="1 1 1" rotation="0 180 0;"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position="-.96 0 1" scale="1 1 1" rotation="0 270 0"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position=".96 0 -1" scale="1 1 1" rotation="0 90 0"></a-gltf-model>
              </a-entity>

              <a-entity position="-3 0 -4.8">
                  <a-gltf-model class="model" src="#table1" position="0 0 0" scale="1 1 1"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position="1 0 .96" scale="1 1 1" rotation="0 0 0"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position="-.96 0 -1" scale="1 1 1" rotation="0 180 0;"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position="-.96 0 1" scale="1 1 1" rotation="0 270 0"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position=".96 0 -1" scale="1 1 1" rotation="0 90 0"></a-gltf-model>
              </a-entity>

              <a-entity position="-3 0 4.8">
                  <a-gltf-model class="model" src="#table1" position="0 0 0" scale="1 1 1"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position="1 0 .96" scale="1 1 1" rotation="0 0 0"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position="-.96 0 -1" scale="1 1 1" rotation="0 180 0;"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position="-.96 0 1" scale="1 1 1" rotation="0 270 0"></a-gltf-model>
                  <a-gltf-model class="model clickable nocollision" src="#chair1" position=".96 0 -1" scale="1 1 1" rotation="0 90 0"></a-gltf-model>
              </a-entity>

              <a-entity id="globe" class="model" gltf-model="/assets/models/hub/Hologram_sphere.glb"
                        material="roughness: 70; metalness: 0; shader: standard"
                        animation__spin="property: rotation; dur: 12000; loop: true; to: 0 360 0;" position="3 1.5 0">
              </a-entity>
              
              {/* <a-entity id="navmesh" class="model" gltf-model="/assets/models/hub/avatar1.glb" visible="true"></a-entity> */}
              <a-sky animation="property: rotation;
              to: -360 360 -360;
              dur: 5000000;
              easing: linear;
              loop:true" src="#sky-img"></a-sky>

              {/* <a-entity position="0 0 0" sound="src: #rap; autoplay: true; loop: true; positional: false"></a-entity> */}
          </a-scene>
          <div className='fixed top-[50px] left-[30px] cursor-pointer' onClick={() => handelManualLeave()}>
              <div className='flex rounded-lg bg-brandblack px-4 py-2'>
                <img src="/images/arrow-left.png" className='mt-1' style={{marginTop: '7px', height: "15px"}} width={15} height={15} alt="back" srcSet="" />
                <span className='ml-3'>All Rooms</span>
              </div>
          </div>
    
          <div className='fixed bottom-[55px] left-[30px] rounded-lg bg-brandblack px-4 py-2 cursor-pointer' onClick={() => handelMuteBtnClick()}>
            <audio
                id="player-audio"
                autoPlay
                ref={(instance) => (provideRef(instance, name))}
              />
              {
                isMute ? (
                <img src="/images/volume-mute.png" alt="volume-mute" width="20" height="20"/>
                ) : (
                <img src="/images/volume.png" alt="volume-mute" width="20" height="20"/>
                )
              }
            </div>
    
            <div className="fixed top-[50px] right-[30px] bg-brandblack rounded-lg w-1/4">
              <div className='w-full p-[20px]'>
                <div className='text-lg mb-4'>
                  Room Chat
                </div>
                <div className='ui-chat h-[555px] max-h-[555px] overflow-auto'>
                  {
                    msgs && Array.from(msgs).map((ele, ind) => {
                      return(
                        <div key={ind}>
                          {/* <img src="" alt="" width={40} height={40} /> */}
                          <p><span><b>{ele && ele.user}:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{ele && ele.msg}</p>
                        </div>
                      )
                    })
                  }
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full py-2 pl-6 text-[15px] font-light text-white border-transparent border rounded-md bg-primary focus:outline-none focus:border-gray-500 focus:border focus:text-white placeholder:text-gray-950Í"
                    value={sendData}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setSendData(e.target.value)}
                    style={{width: "80%"}}
                    placeholder="Input a message please."
                    />&nbsp;&nbsp;
                  <button label="" style={{marginLeft: "15px"}} onClick={sendMsg} >send</button>
                </div>
              </div>
    
              <div className="hidden">
                {
                  clients && clients.map((ele, ind) => {
                    return (
                      <div key={ind}>
                        <div>
                          <audio
                            volume="0"
                            autoPlay
                            ref={(instance) => (provideRef(instance, ele.name))}
                          />
                          <img src={ele.avatar} alt="avatar" srcSet="" />
                          
                        </div>
                        <p>{ele.name}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      );
  }
  return (
    <div id="loading_screen">
        ...Load
    </div>
  )
};

export default ChatModule;