import React from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Modal from "../../components/Modal";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log("Email: ", event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log("Password: ", event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted. Email: ", email, " Password: ", password);
  };

  const handleSignUpEmailChange = (event) => {
    setSignUpEmail(event.target.value);
    console.log("Sign Up Email: ", event.target.value);
  };

  const handleSignUpPasswordChange = (event) => {
    setSignUpPassword(event.target.value);
    console.log("Sign Up Password: ", event.target.value);
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    console.log(
      "Sign Up Form Submitted. SignUpEmail: ",
      signUpEmail,
      " SignUpPassword ",
      signUpPassword
    );
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          value={signUpPassword}
          onChange={handlePasswordChange}
          placeholder="Password"
          required={true}
        />
        <Button text="Login" onClick={() => {}} />
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
    </div>
  );
};

export default Login;
