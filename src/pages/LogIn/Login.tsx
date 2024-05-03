import React, { useState } from 'react'
import { auth } from './firebase.ts';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore'; 
import '../LoginStyles/general.css'
import '../LoginStyles/header.css'
import '../LoginStyles/login.css'
import microsoftLogo from '../images/microsoft-logo.png'
import encoraLogo from '../images/encora-logo.svg'
import encoraSymbol from '../images/encora-symbol.svg'
import cityImage from '../images/city3.png'
import { db } from './firebase.ts';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      localStorage.setItem('token', idToken);
      localStorage.setItem('user', JSON.stringify(user));

      const roleQuery = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(roleQuery);
      let role = '';
      querySnapshot.forEach(doc => {
        role = doc.data().role;
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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="This is the description of the page that is used by SEO to optimize search results and to provide a summary of the site."
        />
        <meta name="author" content="ITC Equipo2" />
        <meta name="keywords" content="Encora, SIPO, Login" />
        <link
          rel="icon"
          href={encoraSymbol}
          type="image/ico"
          sizes="16x16"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/fork-awesome/1.2.0/css/fork-awesome.min.css"
        />
        <title>Sign In | Encora SIPO</title>
      </head>
      <body>
        <main>
          <header
            className="hero-section"
            style={{backgroundImage: `url(${cityImage})`} }
          >
            <div className="hero-image-container">
              <img
                src={encoraLogo}
                alt="encora-logo"
                className="hero-image"
              />
            </div>
          </header>

          <section className="login-section">
            <article className="login-container">
              <h2>Welcome!</h2>
              <p className="subtitle">Enter your email and password to sign in.</p>
              <form aria-label="Login form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="email-text" htmlFor="email">Email:</label>
                  <input type="email" 
                  id="email" 
                  placeholder="Email" 
                  required value={email} 
                  onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="password-text" htmlFor="password">Password:</label>
                  <input type="password" 
                  id="password" 
                  placeholder="Password" 
                  required 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <p className="remember-text">Remember</p>
                <label htmlFor="remember" className="switch">
                  <input
                    type="checkbox"
                    id="remember"
                    aria-describedby="remember-info"
                  />
                  <span className="slider round"></span>
                </label>
                <button className="sign-in-button" type="submit">Sign in</button>
                <button className="microsoft-login-btn" type="button">
                  <img
                    src={microsoftLogo}
                    alt="Microsoft Logo"
                    className="microsoft-logo"
                  />
                  <p className="sign-text">Sign in with microsoft</p>
                </button>

                <p className="account-sign-text">
                  Don't have an account? <Link className="signup-link" to="/signup">Sign up</Link>
                </p>
              </form>
            </article>
          </section>
        </main>
      </body>
    </div>
  );
};


export default Login