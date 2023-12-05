import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  //we use useSelector for access the state from store and here we access status 
  //its use for accessing the stores pieces of data
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()//to use the navigation we use useNavigate()


  //we take the object here for all pages we are created inside a object
  //if status true then show karo false nehi show karo
  const navItems = [
    {
      name: 'Home',//page name
      slug: "/",//where url are going to
      active: true
    }, //status check
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,//here we check activeness from authstatus ar value ar
      //maddomey if its value false then login slug bcz you know when a user
      //login he dont need to see the login page anymore
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,//same as login
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  {
    name: 'Contact',//page name
    slug: "/contact",//where url are going to
    active: true
  }, //status check
  ]


  return (
    <header className='py-3 bg-blue-600 shadow'>
      {/* we take all things in a container s */}
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => //navItems inside we loop kar dea
            item.active ? (//here we check if the item active or not agar active to navigate karonga nehi hey toh kuch nehi karonga
            //as list items repeat how rahi a like home,login,logout in html we  have to use use and key have to unique so we take their name as key 
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}//here when someone click in navigate he will go item.slug(url) menas key page
                className='px-6 py-2 duration-200 rounded-full inline-bock hover:bg-blue-100'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (//here if authStatus true then logoutbtn component ko lo or nehi toh kew chaihey
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header