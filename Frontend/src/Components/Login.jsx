
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
   
     const SubmitEvent = async(e)=>{
       e.preventDefault();
       console.log({email,password});
       if(!email || !password){
        toast.error('Please fill all the fields! ❌')
        return;
       }

       try{
         const response = await axios.post('http://localhost:8000/api/v1/user/login',{
            email,password,
            headers:{
                'Content-Type':'application/json'
            }
            
         })
         if(response.data.success){
            toast.success(response.data.message)
           
            setEmail('')
            setPassword('')
         }
       }catch(error){
        console.log(error)
         toast.error('Error while registering! ❌');
       }
     }

    return (

        <div className='flex items-center justify-center w-screen h-screen'>
            <form onSubmit={SubmitEvent} className='shadow-lg flex flex-col gap-5 p-8  bg-gray-100'>
                <div className='my-4'>
                    <h1 className='text-center font-extrabold text-2xl'>LOGO</h1>
                    <p className='text-center text-xl'>Welcome to the SnapSphere! Login Yourself </p>
                </div>
             
                <div>
                    <span className='font-semibold'>Email</span>
                   <input type="text"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='email' 
                    className='w-full border-2 rounded-sm py-1 my-1 ring-transparent' />
                </div>
                <div>
                    <span className='font-semibold'>Password</span>
                   <input type="text"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder='password' 
                    className='w-full border-2 rounded-sm py-1 my-1 ring-transparent' />
                </div>

                <button
                   type='submit'
                 className='w-full bg-black border-2 rounded-lg py-1 text-white '>SignUp</button>
                 <span className='text-center font-bold'> don't have an account? <Link to="/signup" className='text-blue-600 underline' >SignUp</Link></span>
             
            </form>
            <ToastContainer position='top-right' autoClose={3000} />
        </div>
    )
}

export default Login
