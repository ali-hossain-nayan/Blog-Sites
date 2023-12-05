import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])//appwrite document list ka array mile ga
    useEffect(() => {}, [])//efferct undar array ley liya usko run kortey thako
    appwriteService.getPosts([]).then((posts) => {//getposts sey sob post le liya and .then mey agaar posts hey toh usko set kar dea and document sey sob 
        //content mil jaye ga
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (//here just map loop chalaya and key sey post ko le liya and postCard ki undar sab post ko dal dea spread operator sey
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts