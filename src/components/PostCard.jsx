import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
//when we are log in and add the blog we add the card where clicked then blog ka content dekh ra ha hey
function PostCard({$id, title, featuredImage}) {
    
  return (
    //here we use Link to ki inside we pass the /post kew ki post ki inside jana hey hamko and here $id is variable its a appwrite syntactic sugar
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
              {/* and img ki undar appwrite sey ham getFilePreview method sey featuredImage ka id ley liya 
              post ka id toh id hey then featuredImage ka id post ki sath aa rahi hey alt ki inside whose title we pass the title */}
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard