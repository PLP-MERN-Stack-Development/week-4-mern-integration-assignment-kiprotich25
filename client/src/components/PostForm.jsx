import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PostForm({ onSubmit}) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
        
    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({title, content});
        setTitle("");
        setContent("");
  };

return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="title" value={title} onChange={ e => setTitle(e.target.value)} placeholder="Post Title" />
      <Textarea name="content"  value={content} onChange={e => setContent(e.target.value)} placeholder="Write your content..." rows={6} />
      <Button type="submit" className="w-full" >Submit</Button>
    </form>

)
    

}