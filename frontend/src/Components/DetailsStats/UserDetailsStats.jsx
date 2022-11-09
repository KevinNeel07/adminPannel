import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllUsers } from '../../actions/actions'

const UserDetailsStats = () => {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users)


  useEffect(() => {
    console.log('dispatch');
    dispatch(getAllUsers())
  }, [dispatch])

  console.log('User Details Component');

  if (users) {
    users.forEach((user) => {
      console.log(user.name);
    })
  } else {
    console.log('no users');
  }


  return (
    <>
      <h1>Users Details</h1>
      <div className="user_Container">
        {/* {users.forEach((user) => {
          <>
          <h1>{user.name}</h1>
          </>
        })} */}
      </div>
    </>
  )
}

export default React.memo(UserDetailsStats);