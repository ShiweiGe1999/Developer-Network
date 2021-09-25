const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Post Model
const Post = require("../../models/Post");

// Load Profile Model
const Profile = require("../../models/Profile");

// Load Post Validator
const validatePostInput = require("../../validation/post");

// @route GET /api/post/test
// @desc Tests post route
// @access Public
router.get("/test", (req, res) => res.json({ message: "Posts Working!" }));

// @route GET /api/post
// @desc Get Posts
// @access Public
router.get("/", (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.status(404).json({ message: "No posts found!" }));
});

// @route GET /api/post/:post_id
// @desc Get Posts by Id
// @access Public
router.get("/:post_id", (req, res) => {
  const { post_id } = req.params;
  Post.findById(post_id)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => res.status(404).json({ message: "No post with that ID" }));
});

// @route POST /api/post
// @desc Create Post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id,
    });
    newPost.save().then((post) => res.json(post));
  }
);

// @route POST /api/post/like/:id
// @desc Like Post
// @access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        const { id } = req.params;
        Post.findById(id)
          .then((post) => {
            if (
              post.likes.filter((like) => {
                return like.user.toString() == req.user.id;
              }).length > 0
            ) {
              return res.status(400).json({ message: "User liked this post" });
            }

            // Add user id to likes array
            post.likes.unshift({ user: req.user.id });
            post
              .save()
              .then(() => res.json({ message: "Successfully saved!", post }));
          })
          .catch((err) =>
            res.status(404).json({
              message: "No post found!",
            })
          );
      })
      .catch((err) =>
        res.status(404).json({ message: "Profile Not Found!", post })
      );
  }
);

// @route POST /api/post/unlike/:id
// @desc Like Post
// @access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        const { id } = req.params;
        Post.findById(id)
          .then((post) => {
            if (
              post.likes.filter((like) => {
                return like.user.toString() == req.user.id;
              }).length === 0
            ) {
              return res
                .status(400)
                .json({ message: "User has not yet liked the post" });
            }

            // Add user id to likes array
            const newLikes = post.likes.filter(
              (e) => e.user.toString() !== req.user.id
            );
            post.likes = newLikes;
            post
              .save()
              .then(() => res.json({ message: "Successfully unliked!", post }));
          })
          .catch((err) =>
            res.status(404).json({
              message: "No post found!",
            })
          );
      })
      .catch((err) =>
        res.status(404).json({ message: "Profile Not Found!", post })
      );
  }
);

// @route POST /api/post/comment/:id
// @desc Add comment to post
// @access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { id: postId } = req.params;
    Post.findById(postId)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        // Add comment to post
        post.comments.unshift(newComment);

        // Save comment
        post.save().then((post) => res.json(post));
      })
      .catch((err) => {
        res.status(404).json({ message: "Post not found!" });
      });
  }
);

// @route Delte /api/post/comment/:id/:comment_id
// @desc Delete comment from post
// @access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id: postId, comment_id } = req.params;
    const { id: userId } = req.user;
    Post.findById(postId)
      .then((post) => {
        const userComment = post.comments.filter(
          (e, i) => e.id === comment_id
        )[0];
        if (!userComment) {
          return res.status(404).json({ message: "Comment not found!" });
        }
        if (userComment.user.toString() !== userId) {
          return res
            .status(401)
            .json({ message: "The Comment is not your comment" });
        }
        post.comments = post.comments.filter((e, i) => e.id !== comment_id);
        // Save comment
        post.save().then((post) => res.json(post));
      })
      .catch((err) => {
        res.status(404).json({ message: "Post not found!" });
      });
  }
);

// @route Delete /api/post/:id
// @desc Delete Post
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(id)
          .then((post) => {
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({ message: "Unauthorized User" });
            }

            //Delete
            post.remove().then(() => res.json({ success: true }));
          })
          .catch((err) => res.status(404).json({ message: "Post not found" }));
      })
      .catch((err) => res.status(404).json({ message: "Profile Not Found" }));
  }
);

module.exports = router;
