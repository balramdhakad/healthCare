import Community from "../../models/community/communityModel.js";
import Post from "../../models/community/postModel.js";
import Doctor from "../../models/healthCare/doctorModel.js";
import Patient from "../../models/healthCare/patientModel.js";

export const createPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user._id;
  try {
    const community = await Community.findById(id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found." });
    }

    if (!community.members.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: "You must be a member to post in this community.",
      });
    }
    const newPost = await Post.create({
      communityId: id,
      userId,
      title,
      content,
    });

    community.postCount += 1;
    await community.save();

    let postData = await Post.findById(newPost._id)
      .populate("userId", "name role")
      .lean(); 

    let profilePic = null;
    if (req.user.role === "doctor") {
      const doctor = await Doctor.findOne({ userId }).select("profilePic").lean(); 
      profilePic = doctor?.profilePic || null
    } else if (req.user.role === "patient") {
      const patient = await Patient.findOne({ userId }).select("profilePic").lean();
      profilePic = patient?.profilePic || null;  
    }

    postData.userId.profilePic = profilePic;

    res
      .status(201)
      .json({ success: true, message: "Post created .", data: postData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while post in community.",
      Error: error?.message,
    });
  }
};

export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    const community = await Community.findById(post.communityId);
    if (!community.members.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: "You must be a member of the community to comment.",
      });
    }
    post.comments.push({ text, userId });
    await post.save();
    res.status(200).json({
      success: true,
      message: "Comment added.",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
      Error: error?.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate("userId", "name role")
      .populate("comments.userId", "name role")
      .lean();

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found.",
      });
    }

    if (post.userId?.role === "patient") {
      const patient = await Patient.findOne(
        { userId: post.userId._id },
        "profilePic"
      );
      post.userId.profilePic = patient?.profilePic || null;
    } else if (post.userId?.role === "doctor") {
      const doctor = await Doctor.findOne(
        { userId: post.userId._id },
        "profilePic"
      );
      post.userId.profilePic = doctor?.profilePic || null;
    }

    const enhancedComments = await Promise.all(
      post.comments.map(async (comment) => {
        if (!comment.userId) return comment;

        if (comment.userId.role === "patient") {
          const patient = await Patient.findOne(
            { userId: comment.userId._id },
            "profilePic"
          );
          comment.userId.profilePic = patient?.profilePic || null;
        } else if (comment.userId.role === "doctor") {
          const doctor = await Doctor.findOne(
            { userId: comment.userId._id },
            "profilePic"
          );
          comment.userId.profilePic = doctor?.profilePic || null;
        }

        return comment;
      })
    );

    post.comments = enhancedComments;

    res.status(200).json({
      success: true,
      message: "Post fetched successfully.",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching post.",
      error: error?.message,
    });
  }
};
