import { useNavigate } from "react-router-dom";
import PostForm from "@/components/PostForm";
import { postService } from "@/services/api";

export default function CreatePost(){
    const navigate = useNavigate();

    const handleSubmit = async (data)=> {
        await postService.createPost(data)
        navigate("/");
    };
    return (
        <div className="max-w-2xl mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
          <PostForm onSubmit={handleSubmit} />
       </div>
    )
}