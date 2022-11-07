import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import {signUp} from '../../actions/actions'

import './SignUp.css'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userDetails, setUserDetails] = useState({
    name: '', email:'', password:'', conPassword:''
  });

  function getUser(e){
    //get user
    let name = e.target.name;
    let value = e.target.value;
    console.log(value);
    let userData = (prevState => ({ ...prevState, [name]: value }));
    setUserDetails(userData);

  }

  function signUpUser(e){
    e.preventDefault();
    dispatch(signUp(userDetails, navigate))
  }

  return (
    <>
        <div className="signUp">
        <h1>Sign Up</h1>
            <form onSubmit={signUpUser} method="post">
                <input onChange={getUser} value={userDetails.name} type="text" name="name" id="" placeholder='Enter Name' />
                <input onChange={getUser} value={userDetails.email} type="text" name='email' placeholder='Enter Email' />
                <input onChange={getUser} value={userDetails.password} type="password" name='password' placeholder='Enter Password' />
                <input onChange={getUser} value={userDetails.conPassword} type="password" name='conPassword' placeholder='Enter Confirm Password' />
                <button id='signUpBtn' type='submit'>Sign UP</button>
            </form>
            <Link to='/signIn'>Sign In</Link>
        </div>
    </>
  )
}

export default SignUp