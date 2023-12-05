import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Contact, Login } from './components/index.js'


import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
  {
    path: "/",//path
    element: <App />,//keya render karana chaytey ho
    children: [//chidren ki undar page ko de deya
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                //we create AuthLayout for protection ki liya uskey undar wrap kar deya and authentication ka value false pass kara kew ki login ki 
                //leya
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (//signup k leya same nehi chai hey authentication
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",//all post k leya chai hey true
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/contact",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Contact />
                </AuthLayout>
            ),
        },
        {
            path: "/confirmation",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Contact />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* here we set provider and store ko props hesebey pass kar dea */}
    <Provider store={store}>
        {/* here we set RouterProvider and router ko props pass kar dea as dynamic value */}
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)