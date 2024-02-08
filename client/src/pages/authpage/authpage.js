import React from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Modal from "../../components/Modal";
import { useState } from "react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Login failed')
      }
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ signUpEmail, signUpPassword })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Sign up failed');
      }
      console.log('Registration successful');
      setErrorMessage('');
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
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <Button text="Login" type="submit" />
        <Button text="Sign Up" onClick={handleModalOpen} type="button" />
      </form>
      <Modal show={modalOpen} onClose={handleModalClose}>
        <form onSubmit={handleSignUpSubmit}>
          <InputField
            type="text"
            name="Sign Up Email"
            value={signUpEmail}
            onChange={handleSignUpEmailChange}
            placeholder="Email"
            required={true}
          />
          <InputField
            type="password"
            name="Sign Up Password"
            value={signUpPassword}
            onChange={handleSignUpPasswordChange}
            placeholder="Password"
            required={true}
          />
          <Button text="Submit" type="submit" />
        </form>
      </Modal>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default AuthPage;
