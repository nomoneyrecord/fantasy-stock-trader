import React from 'react';
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { useState } from 'react';




const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      </form>
    </div>
  );
};

export default Login;