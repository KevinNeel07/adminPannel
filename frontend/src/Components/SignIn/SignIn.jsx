import React, {useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import {signIn} from '../../actions/actions'

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [userDetails, setUserDetails] = useState({
       email:'', password:''
    });
  
    function getUser(e){
      //get user
      let name = e.target.name;
      let value = e.target.value;
      console.log(value);
      let userData = (prevState => ({ ...prevState, [name]: value }));
      setUserDetails(userData);
  
    }
  
    function signInUser(e){
      e.preventDefault();
      dispatch(signIn(userDetails, navigate))
    }
  

    return (
        <>
            <form onSubmit={signInUser} method="post">
                <input onChange={getUser} value={userDetails.name} type="text" name="email" id="" placeholder='Enter Name' />
                <input onChange={getUser} value={userDetails.password} type="password" name='password' placeholder='Enter Password' />
                <button id='signUpBtn' type='submit'>Sign UP</button>
            </form>
        </>
    )
}

export default SignIn