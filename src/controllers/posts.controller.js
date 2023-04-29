const Post = require("../models/post.model");
const User = require("../models/user.model");

const getPosts = async (req, res) => {
  try {
    User.findById(req.user)
      .populate("interest")
      .exec()
      .then((user) => {
        Post.find({ interest: user.interest._id })
          .populate("interest", "name")
          .exec()
          .then((posts) => {
            res.status(200).json(posts);
          })
          .catch((err) => {
            res.status(500).send({ msg: "Internal server erro", err });
          });
      })
      .catch((err) => {
        res.status(500).send({ msg: "Internal server error", err });
      });
    // const user = await User.find({});
    // const posts = await Post.find();
    // res.status(200).json(posts);
  } catch (err) {
    res.status(500).send({ msg: "Internal server error", err });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getPosts,
  createPost,
};
