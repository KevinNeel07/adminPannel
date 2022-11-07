import React from 'react'

import { Routes, Route } from 'react-router-dom';

import MainPage from './Components/MainPage/MainPage';
import SignUp from './Components/SIgnUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import Admin from './Components/Admin/Admin';
import Navbar from './Components/MainPage/Navbar';
import Summary from './Components/Admin/Summary';
import UserDetailsStats from './Components/DetailsStats/UserDetailsStats';

const App = () => {

  return (
    <>
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route exact path='/createAccount' element={<SignUp />} />
        <Route exact path='/signIn' element={<SignIn />} />
        <Route  path='/admin' element={<Admin />}>
          <Route path='summary' element={<Summary />} />
          <Route path='userDetials' element={<UserDetailsStats />} />
        </Route>
      </Routes>

    </>
  )
}

export default App