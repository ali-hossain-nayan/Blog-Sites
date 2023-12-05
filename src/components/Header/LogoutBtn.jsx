import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
  //To make changes to the state in store you need to send dispatch actions to 
  //update the state
    const dispatch = useDispatch()
    //for logout here is handler
    const logoutHandler = () => {
      //as we know we get logout from authService and this logout method is actually
      //a promies so we have to use then operation here
        authService.logout().then(() => {
            dispatch(logout())//here after logout state management ar jonnu we use
            //dispatch to update logout important information store ar moddey
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}//here onclick when we click for logout
    >Logout</button>
  )
}

export default LogoutBtn