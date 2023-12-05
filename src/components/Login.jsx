import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()//useForm ham react-hook-form sey leti hey and isko liya two things cahi hey
    //register,handleSubmit syntactic sugar for using useForm document
    const [error, setError] = useState("")//error ko handle ki liya useState

    const login = async(data) => {//here we use async bcz data submit hogi then come so wait toh karna parega
        //setError ki empty kar dea bcz after submitting form error toh clean ho jani cahey
        setError("")
        try {
            const session = await authService.login(data)//pass the data to login
            if (session) {//now check if session hey toh user login hey
                const userData = await authService.getCurrentUser()//and login user sey ham userdata ko le liya
                if(userData) dispatch(authLogin(userData));//and userdata ki dispatch kar dea if userdata hey toh
                navigate("/")//after login usko ham  root or sey home mey vej diya
            }//navigate  sey programmatic vej diya but Link sy click parna pakta hey khud sey nehi hota
        } catch (error) {
            setError(error.message)//if error hoa then we just show error msg 
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {/* form sey ham handlesubmit liya and its a method and inside it we gave our own mehtod that we want this way to submit the form.handlesubmit ak
        event hey e ha */}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "//same as password
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    //here we extra pass a option name validate where match kara hey our validate pattern jisko accept kare ga and .test(value)
                    //or we just give the msg valid email needed
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                // here we use ...register bcz zetney input field use kar rahi hey uskey liya syntactic sugar hey as we use useForm
                {...register("password", {//inside register we take key value password then ak object where requred true its a option we pass
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login