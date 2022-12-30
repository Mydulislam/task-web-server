import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
const Login = () => {
    const {login, googleSign} = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const googleProvider = new GoogleAuthProvider();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/'

    const handleLogin = (data)=>{
        setLoginError('')
        login(data.email, data.password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            navigate(from, {replace:true});
            toast.success('Login Successfuly')
        })
        .catch(error => setLoginError(error.message))
    }
    const handleGoogleSignIn = ()=>{
        googleSign(googleProvider)
        .then(result=>{
            const user = result.user;
            console.log(user);
            saveUserDatabase(user.displayName, user.email)
            navigate(from, {replace:true});
        })
        .catch(error => setLoginError(error.message))
    }

    const saveUserDatabase = (name, email) => {
        const userInfo = { name, email};
        fetch('https://task-managment-server-one.vercel.app/users', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <div className="container">
            <div className='w-50 mx-auto'>
                <h1 className='text-4xl text-center mb-3'>Login</h1>
                <div className='border border-solid p-4 rounded-md'>
                    <form onSubmit={handleSubmit(handleLogin)}>
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
                        <input className='btn btn-primary w-100 text-white mt-3' value='Login' type="submit" />
                        {
                            loginError && <p className='text-danger'>{loginError}</p>
                        }
                        <p className='mt-2 mb-0'>You are new? Please <Link className='underline text-primary' to='/signup'>Signup Now</Link></p>
                    </form><hr/>
                    <button onClick={handleGoogleSignIn} className="btn btn-danger uppercase w-100">Login With Google</button>
                </div>

            </div>
        </div>
    );
};

export default Login;