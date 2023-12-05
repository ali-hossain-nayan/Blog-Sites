import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);//post taken
    const { slug } = useParams();//url taken
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);//userdata taken

    //here post and userdata hey toh post ka id and userdata ka id check kiya for comfrim the authhor hey kiya nehi false
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {//url taken
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);//post ko set kiya
                else navigate("/");//else home mey navigate kiya
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {//deletepost sey id nea .then a status check kiya and delete kar dea post ko deletefile ko
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (//agar post hey toh
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {/* container ki undar img ko getfilepreview kiya */}
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (//agar authorr hey  toh usko edit and and delete ki button de diya nehi toh serf dekhney diya
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {/* content parse kiya html element ko jsx mey convert */}
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}