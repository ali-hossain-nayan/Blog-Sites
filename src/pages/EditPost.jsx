import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)//post ley liya as we can edit
    const {slug} = useParams()//useParmams sey url ley liya slug ko
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {//slug hey toh
            appwriteService.getPost(slug).then((post) => {//getPost sey post ley liya
                if (post) {
                    setPosts(post)//then post ko set kar dea 
                }
            })
        } else {//agar slug nehi toh home mey navigate kar dea
            navigate('/')
        }
    }, [slug, navigate])//slug means url change howa,or navigate change howa dubara sey run karo

  return post ? (//reutrn ke undar aagr post hey tho edit karo nehi toh nehi karo
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost