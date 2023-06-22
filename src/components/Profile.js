import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  addDoc,
  getDocs,
  db1,
  db2,
  getAuth,
} from '../config/Config';
import Swal from 'sweetalert2';
import { useNavigate  } from 'react-router-dom';


const auth = getAuth();

function Profile() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const handleLoginEmailChange = (event) => {
    setLoginEmail(event.target.value);
  };

  const handleLoginPasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const handleSignupEmailChange = (event) => {
    setSignupEmail(event.target.value);
  };

  const handleSignupUsernameChange = (event) => {
    setSignupUsername(event.target.value);
  };

  const handleSignupPasswordChange = (event) => {
    setSignupPassword(event.target.value);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
        title: "Login Up",
        text: "Please wait...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading(); // Show loader
        },
      });
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        Swal.close();
        Swal.fire("Success", "Login successful!", "success")
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.close(); // Stop loader
        if (errorMessage == "Firebase: Error (auth/user-not-found)."){
          Swal.fire("Error", "User Not Found", "error");
        }else{
          Swal.fire("Error", "Wrong Password Please Try Again", "error");
        }
      });
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
        title: "Signing Up",
        text: "Please wait...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading(); // Show loader
        },
      });
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then(async(userCredential) => {
        const user = userCredential.user;
        const docRef = await addDoc(collection(db2, "admins"), {
            username: signupUsername,
            email: signupEmail,
            password: signupPassword,
        });
        Swal.close(); // Stop loader
        Swal.fire("Success", "Signup successful!", "success")
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.close();
        if (errorMessage == "Firebase: Error (auth/email-already-in-use)."){
            Swal.fire("Error", "Email Already In Use", "error");
        }
      });

    setSignupEmail('');
    setSignupUsername('');
    setSignupPassword('');
  };

  const toggleFormVisibility = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <>
    <div className="login-form-container">
      {isLoginFormVisible ? (
        <>
          <h2 className="form-title">Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <label>
              Email:
              <input
                type="email"
                value={loginEmail}
                onChange={handleLoginEmailChange}
                className="input-field"
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={loginPassword}
                onChange={handleLoginPasswordChange}
                className="input-field"
              />
            </label>
            <br />
            <button type="submit" className="form-button">
              Login
            </button>
            <p>
              Don't have an account?{' '}
              <a href="#" onClick={toggleFormVisibility}>
                Sign up
              </a>
            </p>
          </form>
        </>
      ) : (
        <>
          <h2 className="form-title">Sign Up</h2>
          <form onSubmit={handleSignupSubmit}>
            <label>
              Email:
              <input
                type="email"
                value={signupEmail}
                onChange={handleSignupEmailChange}
                className="input-field"
              />
            </label>
            <br />
            <label>
              Username:
              <input
                type="text"
                value={signupUsername}
                onChange={handleSignupUsernameChange}
                className="input-field"
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={signupPassword}
                onChange={handleSignupPasswordChange}
                className="input-field"
              />
            </label>
            <br />
            <button type="submit" className="form-button">
              Sign Up
            </button>
            <p>
            Already have an account?{' '}
          <a href="#" onClick={toggleFormVisibility}>
            Login
          </a>
        </p>
      </form>
    </>
  )}

    </div>
    </>
  );
}

export default Profile;