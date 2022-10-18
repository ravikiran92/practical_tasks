const postModal = require("../models/Posts")

const index = async (req, res, next) => {
  try {
    const posts = await postModal.find();
    res.status(200).json({ response: posts, success: true })
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

const show = async (req, res) => {
  let userID = req.params.id;
  try {
    const post = await postModal.findById(userID);

    res.status(200).json({ response: post, success: true });

  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

const create = async (req, res) => {

  try {
    const post = req.body
  
    const newPost = new postModal(post);

    const savePost = await newPost.save();
    res.status(200).json({ message: 'post created successfully', response: savePost, success: true })

  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
}

const update = async (req, res) => {
  let userID = req.params.id;

  const updatedData = req.body;

  if (!userID) {
    res.status(401).json({ message: 'please provide user id', success: false });
  }

  try {
    await postModal.findByIdAndUpdate(userID, { $set: updatedData });
    res.status(200).json({ message: "Record Updated Successfully...!", success: true });
  } catch (err) {
    res.status(401).json({ message: error.message, success: false });
  }
};

const destroy = async (req, res) => {
  let userID = req.params.id;

  if (!userID) {
    res.status(400).json({ message: 'please provide user id', success: false });
  }

  try {
    await postModal.findOneAndRemove(userID).then(() => {
      res.status(200).json({ message: "Record Deleted Successfully...!", success: true });
    });
  } catch (err) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const getActiveAndDeactivePostsCount = async (req, res) => {

  try {

    const status = req.body.active

    const posts = await postModal.count({active:status});
    res.status(200).json({ count: posts, success: true })
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};



module.exports = {
  index,
  create,
  show,
  update,
  destroy,
  getActiveAndDeactivePostsCount
}