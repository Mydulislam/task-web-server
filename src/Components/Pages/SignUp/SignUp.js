import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
const SignUp = () => {
    const {creatSignUp, updateUser} = useContext(AuthContext)
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const handleSignup = (data)=>{
        creatSignUp(data.email, data.password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            toast.success('User created successfully')
            handleProfile(data.name, data.email);
            reset();
        })
        .catch(error => setLoginError(error.message))
    }

    // create displayName
    const handleProfile = (name,email)=>{
        const profile = {
            displayName : name
        }
        updateUser(profile)
        .then(()=>{
            saveUserToDatabase(name, email)
        })
        .catch()
    }
    
    // user pathanor path
    const saveUserToDatabase = (name, email)=>{
        const userInfo = {name, email};
        fetch('http://localhost:5000/users',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(userInfo)
        })
    }

    return (
        <div className="container">
            <div className='w-50 mx-auto'>
                <h1 className='text-4xl text-center mb-3'>Please Register</h1>
                <div className='border border-solid p-4 rounded-md'>
                    <form onSubmit={handleSubmit(handleSignup)}>
                        <div className="w-full mb-3">
                            <label className="label mb-2"><span className="label-text">Name</span></label>
                            <input type="text"
                                {...register("name", { required: "Name is Required" })}
                                placeholder="Your Name"
                                className="input p-2 border border-1 rounded w-100" />
                            {errors.email && <p className='text-danger' role='alert'>{errors.name?.message}</p>}
                        </div>

                        <div className="w-full mb-3">
                            <label className="label mb-2"><span className="label-text">Email</span></label>
                            <input type="email"
                                {...register("email", { required: "Email Address is Required" })}
                                placeholder="Your Email"
                                className="input p-2 border border-1 rounded w-100" />
                            {errors.email && <p className='text-danger' role='alert'>{errors.email?.message}</p>}
                        </div>

                        <div className="w-full">
                            <label className="label mb-2"><span className="label-text">Password</span></label>
                            <input type="password"
                                {...register("password",
                                    {
                                        required: "Password is Required",
                                        minLength: { value: 6, message: 'Password must be 6 character' }
                                    })}
                                placeholder="Password"
                                className="input p-2 border border-1 rounded w-100" />
                            {errors.password && <p className='text-danger' role='alert'>{errors.password?.message}</p>}
                        </div>
                        <input className='btn btn-primary w-100 text-white mt-3' value='Signup Now' type="submit" />
                        {
                            loginError && <p className='text-danger'>{loginError}</p>
                        }
                        <p className='mt-2 mb-2'>Already have an account <Link className='underline text-primary' to='/login'>Login</Link></p>
                    
                    </form>
                </div>

            </div>
        </div>
    );
};

export default SignUp;