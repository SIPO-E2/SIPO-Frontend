import React, { useState } from 'react'
import { auth } from './firebase.ts';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { db } from './firebase.ts';
import { doc, setDoc } from 'firebase/firestore'; 




const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 
  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
  

      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        role: role // Guarda el rol seleccionado por el usuario
      });

      switch (role) {
        case 'admin':
          navigate("/RMView");
          break;
        case 'user':
          navigate("/StafferView");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit} className='signup-form'>
        <input
          type="email"
          placeholder="Your Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          Select Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>
        <button type="submit" className='signup-button'>Signup</button>
      </form>
      <p>Need to Login? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Signup