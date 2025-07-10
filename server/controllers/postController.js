const Post = require ('../models/Post')
const jwt = require("jsonwebtoken")

exports.getPosts = async (req, res, next)=> {
    try {
        const posts = await Post.find().populate('author').populate('category');
        res.json(posts);

    }catch (error){
        res.json({ message: error.message})
    }
};
exports.getPostById = async (req,res,next) => {
    try {
        const post = await Post.findById(req.params.id).populate('author').populate( 'category');
        if(!post) return res.status(404).json({ message: 'Post not found'});
        await post.incrementViewCount();
        res.json(post)
    }
    catch(error){
        res.json({error})

    }
};
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({message: "Post not found"})
        
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );
        res.json(updatedPost)
        }
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
exports.createPost = async (req, res, next) => {
  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Attach author ID to post
    const newPost = new Post({
      ...req.body,
      author: decoded.id, // ✅ set author from token
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
exports.deletePost = async (req, res, next )=>{
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }
        await (Post.findByIdAndDelete(req.params.id))
        res.json({message: "Post successfully deleted"})
        
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
};
exports.addComment = async (req, res, next ) => {
    try {
        const {user, content} = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({message: 'Post not found'});
        await post.addComment(user, content);
        res.status(201).json(post)
        
    } catch (error) {
        next(err)
        
    }
};
