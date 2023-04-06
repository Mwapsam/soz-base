import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input
  } from "@material-tailwind/react";
  import { userSelector } from '../../reducers/users';
  import { loginUser } from '../../services/sessions.service';
  import useForm from '../../pages/hooks/useForm';
  import { initialLoginState } from '../../helpers/state';

const Login = ({handleOpen, open}) => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const history = useNavigate();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );

  const {userData, setUserData} = useForm(initialLoginState);

  const onSubmit = () => {
    // e.preventDefault();
    const data = {
        email: userData.email,
        password: userData.password,
    }
    dispatch(loginUser(data));
    if(isSuccess){
      history('/checkout')
    }
  };

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Fragment>
    <Button onClick={handleOpen} style={{borderRadius: 0}}  className='bg-gray-900 mt-2 '>Safe to Checkout</Button>
    <Dialog open={open} handler={handleOpen} className='w-full' >
      <DialogHeader className='m-auto'>Please Sign in Before you Continue</DialogHeader>
      <DialogBody divider>
        <div className="flex lg:w-72 flex-col m-auto gap-6">
          <Input color="teal" type='email' onChange={handleChange} required label="Email" />
          <Input 
            label="Password" 
            color="teal" 
            onChange={handleChange}
            type={showPassword ? "text" : "password"} 
            required 
            icon={<button className='text-start font-thin text-xs mr-3' onClick={togglePasswordVisibility}>
                {showPassword ? 
                  <p>Hide</p> : <p>Show</p>}
            </button>} 
          />
          <Button onClick={onSubmit} fullWidth>Login</Button>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
      </DialogFooter>
    </Dialog>
  </Fragment>
  )
}

export default Login;