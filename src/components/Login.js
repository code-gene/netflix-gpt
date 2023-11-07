/**
 * The above code is a React component for a login form that allows users to sign in or sign up using
 * Firebase authentication.
 * @returns The Login component is being returned.
 */

import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/formValidation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { BG_URL, USER_AVATAR } from "../utils/constants";
import useLocalStorageUser from "../hooks/useLocalStorageUser";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();

  const { userInLocal, setUser } = useLocalStorageUser();
  console.log("[Login Screen] User stored in local storage", userInLocal);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    console.group(message);
    if (message) return;

    // Sign Up Logic
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const signedUpUser = userCredential.user;
          console.log("User signed up successfully", signedUpUser);
          
          updateProfile(signedUpUser, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              setUser(auth.currentUser);
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const signedInUser = userCredential.user;
          
          console.log("User signed in", signedInUser);
          setUser(signedInUser);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="w-screen object-cover" src={BG_URL} alt="logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-4/12 absolute p-12 bg-black my-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-semibold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <p className="text-[#e50914] font-semibold text-md py-2">
          {errorMessage}
        </p>
        <button
          className="p-4 mt-4 mb-2 bg-[#e50914] w-full rounded-lg font-semibold"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
