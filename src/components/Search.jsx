import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs,getDoc, setDoc, updateDoc, serverTimestamp, doc } from "firebase/firestore";
import { db } from '../firebase';
import { AuthCOntext } from '../context/AuthContext';

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const {currentUser} = useContext(AuthCOntext);

  const handleSearch =async ()=>{
    const q = query(collection(db,'users'), where('displayName', '==', username));
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUser(doc.data())
      });
    }catch(err){
      setErr(true);
    }
    
  };

  const handleKey = (e)=>{
    e.code ==='Enter'&& handleSearch();
  }

  const handleSelect = async ()=>{
    //check if the group exist or not (chats collection in fire store), if not create new one
    const combinedId = currentUser.uid > user.uid 
    ? currentUser.uid+user.uid : user.uid + currentUser.uid;
    try{
      const res = await getDoc(doc(db,"chats", combinedId));
      if(!res.exists()){
        //create chat in chats collection
        await setDoc(doc(db,'chats', combinedId),{messages:[]});
        //create user chats
        await updateDoc(doc(db,"userChats", currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        });

        await updateDoc(doc(db,"userChats", user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        })
      }
    }catch(err){
      setErr(true);
    }
    
    setUser(null);
    setUsername("");

    //create use chats
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input value={username} onKeyDown={handleKey} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='Find a User'/>
      </div>
      {err && <span>User Not Found</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search