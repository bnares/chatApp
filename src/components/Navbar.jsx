import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthCOntext } from '../context/AuthContext'

function Navbar() {
  const {currentUser} = useContext(AuthCOntext);

  return (
    <div className='navbar'>
      <span className="logo">PIOTR CHAT</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar