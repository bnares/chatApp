import React, { useState } from 'react'
import AddAvatar from "../img/addAvatar.png"
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Register from './Register';

function Login() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };


  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Piotr Chat App</span>
            <span className='title'>Sign In</span>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password'/>
                <button>Sing in</button>
            </form>
            {err && <span style={{color:'red'}}>Stomething went wrong!</span>}
            <p>You don't have an account? <Link to="/register">Register</Link> </p>
        </div>
    </div>
  )
}

export default Login