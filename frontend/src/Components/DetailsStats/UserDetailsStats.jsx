import React, {useState, useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllUsers } from '../../actions/actions'

const UserDetailsStats = () => {

  const [userData, setUserData] = useState([]);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllUsers)
    }, [])

    console.log('User Details Component');
    const users = useSelector(state => state.user.users)

  console.log(users);

  if(users){
    let newuserData = users
    setUserData()
  }else{
    console.log('no users')
  }
  
  return (
    <>
    <h1>Users Details</h1>
    <div className="user_Container">
    {users ? users.forEach((user)=>{
        <>
                <h1>{user}</h1>
        </>
            }) : <h1>'No User Available'</h1> }
    </div>
    </>
  )
}

export default React.memo(UserDetailsStats);