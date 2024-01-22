import React from 'react';
import Button from "../../components/Button";
import InputField from "../../components/InputField";


const Login = () => {
  return (
    <div>
      <form>
        <InputField 
          type='text'
          name='email'
          value=''
          onChange={() => {}}
          placeholder='Enter your email'
        />
        <InputField 
          type='password'
          name='password'
          value=''
          onChange={() => {}}
          placeholder='Enter your password'
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