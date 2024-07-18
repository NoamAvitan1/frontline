import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Api from '../services/ApiRequests'; 
import UserContext, {UserProvider} from '../components/UserContext';
import {useNavigate} from 'react-router-dom'

const LoginForm = ({setAuth}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await Api.post('/user/login', data);
      setUserData(response.data);
      navigate('/')
      console.log('Login successful:', response.data);
    } catch (error) {
      alert("Password or email is incorrect");
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='w-[300px] bg-white min-h-[360px] rounded-sm shadow-xl py-4'>
      <h1 className='font-bold text-xl text-center'>Welcome</h1>
      <form className='text-foreground p-4 flex w-full flex-col justify-center gap-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-1'>
          <label className='font-bold'>Email</label>
          <input placeholder='noam@example.com' className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label className='font-bold'>Password</label>
          <input placeholder='1234' className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:border-blue-600 w-full p-3"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className='flex gap-4 justify-center items-center'>
          <button className='bg-blue-500 p-2 rounded-md' type="submit">Login</button>
          <span className='font-bold text-xl'>/</span>
          <button onClick={() => setAuth('sign-up')} className='bg-blue-500 p-2 rounded-md'>Sign-Up</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
