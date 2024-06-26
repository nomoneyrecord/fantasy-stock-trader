import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import Backdrop from "../../components/Backdrop";
import Logo from "../../components/Logo";


const AuthPage = ({ onLoginSuccess, sessionExpired }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (sessionExpired) {
      alert("Your session has expired, please log in again.");
    }
  }, [sessionExpired]);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        throw new Error("Session expired. Please log in again.");
      }

      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      onLoginSuccess(); // <-- Update the state in App.js
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!validateEmail(event.target.value)) {
      setEmailError("Invalid. Please try again");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUpEmailChange = (event) => {
    setSignUpEmail(event.target.value);
  };

  const handleSignUpPasswordChange = (event) => {
    setSignUpPassword(event.target.value);
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(signUpEmail)) {
      setErrorMessage("Invalid email format");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signUpEmail, signUpPassword }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials. Try again");
      }
      setSuccessMessage("Success! Login to trade");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }

    setSignUpEmail("");
    setSignUpPassword("");
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSignUpEmail("");
    setSignUpPassword("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="background-container-authpage">
      {modalOpen && <Backdrop onClick={handleModalClose} />}

      <div className="description-container">
        Welcome to StockLab! A simple stock trading simulator to test the basics
        of buying and selling stocks with realtime market data.
      </div>

      {!modalOpen && (
        <div className="form-container">
          <form onSubmit={handleLogin} className="auth-form">
            <InputField
              type="text"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              required={true}
            />
            <InputField
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required={true}
            />
            <Button text="Login" type="submit" className="login-button" />
            <div className="or-text">or</div>
            <Button
              text="Create Account"
              onClick={handleModalOpen}
              type="button"
              className="create-account-button"
            />
            <Logo className="auth-page-logo" />
          </form>
        </div>
      )}

      <Modal show={modalOpen} onClose={handleModalClose} className="registration-modal-content">
        <div >
          <form onSubmit={handleSignUpSubmit} className="registration-form">
            <InputField
              type="text"
              name="Sign Up Email"
              value={signUpEmail}
              onChange={handleSignUpEmailChange}
              placeholder="Email"
              required={true}
            />
            {emailError && <div className="error">{emailError}</div>}
            <InputField
              type="password"
              name="Sign Up Password"
              value={signUpPassword}
              onChange={handleSignUpPasswordChange}
              placeholder="Password"
              required={true}
            />
            <Button text="Submit" type="submit" className="submit-button" />
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
        </div>
      </Modal>      
    </div>
  );
};

export default AuthPage;
