import React, { useState } from 'react'
import LoginForm from '../forms/LoginForm'
import SignUpForm from '../forms/SignUpForm'

export default function Auth() {
  const [auth,setAuth] = useState('login');
  return (
    <div className='w-[100%] h-[100%] flex items-center justify-center bg-slate-300'>
      {auth === 'login' ? <LoginForm setAuth={setAuth}/> :<SignUpForm setAuth={setAuth}/>}
    </div>
  )
}
