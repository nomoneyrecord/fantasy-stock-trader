import React from 'react';
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Modal from "../../components/Modal";
import { useState } from 'react';




const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log('Email: ', event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log('Password: ', event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted. Email: ", email, " Password: ", password);
  }

  const handleModalOpen = () => {
    setModalOpen(true); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputField 
          type='text'
          name='email'
          value={email}
          onChange={handleEmailChange}
          placeholder='Enter your email'
          required={true}
        />
        <InputField 
          type='password'
          name='password'
          value={password}
          onChange={handlePasswordChange}
          placeholder='Enter your password'
          required={true}  
        />
        <Button 
          text='Login'
          onClick={() => {}}
        />
        <Button
          text='Sign Up'
          onClick={handleModalOpen}  
          type='button'
        />
      </form>
      <Modal onClose={handleModalOpen}/>
    </div>
  );
};

export default Login;