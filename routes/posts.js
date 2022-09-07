const express = require("express");
const router = express.Router();
const managePosts = require("../models/post");
const mongoose = require("mongoose");
const passport = require("passport");
const manageProfile = require("../models/users")

router.post(
  "/addPost",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const postFields = {};
    postFields.user = req.user._id;
     
    if (req.body.postText) postFields.postText = req.body.postText;
    if (req.body.media) postFields.media = "";

    const post1 = new managePosts(postFields); 
    post1
      .save()
      .then((postData) => res.json({data : postData}))
      .catch((err) => {
        console.log(err);
      });
  }
);


router.post("/getPostList", passport.authenticate("jwt", {session:false}), (req,res)=>{
  const postFields = {};
  const post1 = new managePosts(postFields);
  managePosts.find().then(posts =>{
       res.status(200).json({data:posts})
  }).catch(err=>{
    console.log(err)
    res.status(500).json({error:err})
  })
})



module.exports = router;
