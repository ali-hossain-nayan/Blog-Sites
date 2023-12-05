import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  //Here we create loading state for fetch data for example if want to fetch data from server we can create conditon that if loading true then loading 
  //ar icon if false then show the data thats what exactly we did..default we true raka loading thats that mount how rahi hey.useEffect kuch kam kar 
  //rahey data ar jonnu
  const [loading, setLoading] = useState(true)
  //dispatch use for send something like current user ko ley oww as we change the state
  const dispatch = useDispatch()

  //after loading the application we take useEffect to asked the authservice for currentuser if login ho or nehi ho 
  useEffect(() => {
    authService.getCurrentUser()//here get the currentuser
    //then we perform .then operation and we know .then always take the callback function. inside the function  we get the userdata
    //and we take the dispatch bcz in authSlice login ki undhar action ar moddey userdata data mil jaye.
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {//if userdata hey nehi dispatch ko bejo and bolo logout koro
        dispatch(logout())
      }
      //after .then we can also take the catch but dont need it in this case.

    })//finally always run .then or.catch run hoor nehi ho iside finally in callback setloading ko ham false kar dea bcs above all the works done now 
    //u become false as it was true tha start mey isilia ham finally ko call kiya
    .finally(() => setLoading(false))
  }, [])
  

  //here we check if loading false hey if loading false then we render the all things
  return !loading ? (
    <div className='flex flex-wrap content-between min-h-screen bg-gray-400'>
      <div className='block w-full'>
        {/* outlet means header and footer always be the same outlate ki andar ham lok change karo gi */}
        <Header />
        <main>
        Modern Blog site  <Outlet />
        </main>
        <Footer />
      </div>
    </div>//if loading then we null
  ) : null
}

export default App