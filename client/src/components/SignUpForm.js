import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { baseUrl } from "../Utils";

function SignUpForm({
  username,
  password,
  email,
  setUsername,
  setPassword,
  setEmail,
}) {

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await axios.post(`${baseUrl}/createUser`, { username, password, email })
      console.log('response', response)
        setUsername("")
        setPassword("")
        setEmail("")
      setIsLoading(false)
      navigate(`/welcome/${username}`)
    } catch(err){
        setErrors(err.response)
        setTimeout(function(){
          setIsLoading(false);
      }, 1000);
        
      
    }
  };

  return (
    <>
    { !isLoading &&
    <div className="bg-gradient-to-r from-teal-200 via-teal-500  to-teal-800 h-screen px-[20px] lg:px-[150px] py-20"> 
      <div className="bg-white rounded-3xl lg:mt-[90px] mx-auto max-w-screen-sm px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Sign Up</h1>
        </div>

        <form action="post" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label for="username" className="sr-only">
              Username
            </label>

            <div className="relative">
              <input
                type="text"
                className={`w-full rounded-lg ${errors?.status === 400 || errors?.status === 401 ? 'border-red-500 border-2' : 'border-gray-200'} p-4 pe-12 text-md shadow-md`}
                placeholder="Create username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors?.status === 400 || errors?.status === 401 ? <div className="text-red-600 pt-2 text-sm">Username must be at least 3 characters</div> : null}
            </div>
          </div>

          <div>
            <label for="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className={`w-full rounded-lg ${errors?.status === 402 || errors?.status === 400 ? 'border-red-500 border-2' : 'border-gray-200'} p-4 pe-12 text-md shadow-md`}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors?.status === 402 || errors?.status === 400 ? <div className="text-red-600 pt-2 text-sm">Password must be at least 5 characters</div> : null}

            </div>
          </div>
          <div>
            <label for="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className={`w-full rounded-lg ${errors?.status === 400 || errors?.status === 403 ? 'border-red-500 border-2' : 'border-gray-200' } p-4 pe-12 text-md shadow-md`}
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors?.status === 400 || errors?.status === 403 ? <div className="text-red-600 pt-3 text-sm">Please enter a valid email address</div> : null}
              {errors?.status === 404 && <div className="text-red-600 pt-3 text-sm">User already exists</div>}

            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link  to="/login" className="underline font-medium text-black" href="">
                Login
              </Link>
            </p>

            <button
              type="submit"
              className={`inline-block rounded-lg bg-teal-600 px-5 py-3 text-md font-medium text-white`}
              onClick={handleSubmit}
            >
              Create user
            </button>
          </div>
        </form>
      </div>
</div>
}
{ isLoading &&
<LoadingScreen message="Saving..."/>
}
</>
  );
}

export default SignUpForm;
