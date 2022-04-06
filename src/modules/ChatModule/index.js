import { useEffect, useState, FC } from 'react'
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useWebTRTC } from '../../utils/useWebTRTC';
import { models } from '../../data/experience';
import { setMsg } from '../../redux/slices/chatSlice';
import ACTIONS from '../../config/actions';

const ChatModule = () => {
  const [mounted, setMounted] = useState(false)
  const { roomName, userName, modelIndex, msgs, peers } = useAppSelector(state => state.chat);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { rid } = router.query;
  const { clients, provideRef, handelMute } = useWebTRTC(rid, {name: userName});
  const [sendData, setSendData] = useState('');
  const [intervalId, setIntervalId] = useState('');
  
  const [isMute, setMute] = useState(true);

  useEffect(() => {
    handelMute(isMute, userName);
  }, [isMute])

  useEffect(() => {
    require('aframe/dist/aframe-master.js');
    setMounted(true)
  }, [])

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
  useEffect(  () => {
    if(entity) {
      entity.setAttribute('id', 'player');
      entity.setAttribute('class', 'heads');
      entity.setAttribute('networked', 'template:#avatar-template;attachTemplateToLocal:false;');
      entity.setAttribute('position', '0 1.6 0');
      setIntervalId(setInterval(updateVolume, 300));
    }
    require('multiuser-aframe')
    if(entity) {
      window.NAF.schemas.add({
        template: '#avatar-template',
        components: [
          'position',
          'rotation',
        ]
      });
    }
  }, [entity])

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
    window.isReady = false;
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

  if (mounted) {
    if(models[modelIndex].modelUrl) {
      return (
        <div>
          <a-scene
            renderer="colorManagement: true"
            networked-scene="
            room: blocks;
            debug: true;"
          >
            <a-assets>
              <img id="grid" src="https://img.gs/bbdkhfbzkk/stretch/https://i.imgur.com/25P1geh.png" crossOrigin="anonymous"/>
              <img id="sky" src="https://img.gs/bbdkhfbzkk/2048x2048,stretch/https://i.imgur.com/WqlqEkq.jpg" crossOrigin="anonymous" />
  
              <a-asset-item id="raccoon-obj" src={models[modelIndex].modelUrl}></a-asset-item>
              <a-asset-item id="scene-obj" src="/assets/Campfire_Blocks/model.obj"></a-asset-item>
              <a-asset-item id="scene-mtl" src="/assets/Campfire_Blocks/materials.mtl"></a-asset-item>
  
              <img id="sechelt" crossOrigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg"/>
              <template 
                id="avatar-template"
                dangerouslySetInnerHTML={{
                  __html: '<a-gltf-model src="#raccoon-obj" scale="3 3 3" position="0 2 -2"></a-gltf-model>'
                }}
              />
              
            </a-assets>
  
            <a-sky id="image-360" radius="100" src="#sechelt" data-set-image-fade-setup="true" animation__fade=""></a-sky>
  
            <a-entity obj-model="obj: #scene-obj; mtl: #scene-mtl" position="-0.542 1.5 -6.206" scale="30 30 30"/>
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
      )
    } else {
      return (<div>...loading</div>);
    }
  }
  return (
    <div id="loading_screen">
        ...Load
    </div>
  )
};

export default ChatModule;
