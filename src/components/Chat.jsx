import React, { useContext } from 'react'
import friends from "../img/add.png";
import menu from "../img/more.png";
import camera from "../img/cam.png";
import Messages from './Messages';
import Input  from "./Input"
import { ChatContext } from '../context/ChatContext';
function Chat() {
  const {data} = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={friends} alt="" />
          <img src={camera} alt="" />
          <img src={menu} alt="" />
        </div>
        
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat