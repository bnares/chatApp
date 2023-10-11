import React, { useContext, useState } from 'react'
import pin from "../img/attach.png"
import addPhoto from "../img/img.png"
import { AuthCOntext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import {v4 as uuid} from "uuid"
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db } from '../firebase';
function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const {currentUser} = useContext(AuthCOntext);
  const {data} = useContext(ChatContext);

  const handleSend =async ()=>{
    if(img){
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, img).then(()=>{
        try{
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }catch(err){
          console.log(err);
        }
       

      });

     

    }else{
      await updateDoc(doc(db,'chats', data.chatId),{
        messages:arrayUnion({
          id: uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now(),
        })
      });
    }

    await updateDoc(doc(db,'userChats',currentUser.uid),{
      [data.chatId+'.lastMessage']:{
        text
      },
      [data.chatId+'.date']:serverTimestamp()
    });
    await updateDoc(doc(db,'userChats',data.user.uid),{
      [data.chatId+'.lastMessage']:{
        text
      },
      [data.chatId+'.date']:serverTimestamp()
    })
    setText('');
    setImg(null);
  }

  return (
    <div className='input'>
        <input value={text} type="text" onChange={(e)=>setText(e.target.value)} placeholder='Type Something...' />
        <div className="fileInputs">
          <input type="file" alt='send File' id='sendFile' />
          <input type='file' alt="send photo" id="sendPhoto" onChange={(e)=>setImg(e.target.files[0])}/>
          <label htmlFor="sendFile">
            <img src={pin} alt="File" />
          </label>
          <label htmlFor="sendPhoto">
            <img src={addPhoto} alt="Photo" />
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
        

    </div>
    
  )
}

export default Input