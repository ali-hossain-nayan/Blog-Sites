import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
//protection component for protected first value children and authentication ko default true le liya
export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)//loading ke liya
    const authStatus = useSelector(state => state.auth.status)//here we take the authStatus using useSelector

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        //authentication = true , authstatus true != authentication true
        //so true, true != true
        //true , false
        //second false,false
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
//load ho rahi hey toh loading nehi toh show children
  return loader ? <h1>Loading...</h1> : <>{children}</>
}
