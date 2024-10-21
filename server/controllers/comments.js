import Comment from "../models/Comment.js";

const fetchComments = async(req, res) => {
    const id = req.params.postId;
    

}

const createComment = async(req, res) => {
    const id = req.params.postId;
    const { comment, username } = req?.body;

    try {
        if(id) {
            const newComment = new Comment({
                postId: id,
                comment,
                username
            })
            await newComment.save();
            res.status(201).json(newComment)
        } else {
            res.status(404).json({ message: "comment with this post id not found"})
        }


    } catch(error) {
        res.status(404).json({ message: error });
    }
}

export { createComment, fetchComments };