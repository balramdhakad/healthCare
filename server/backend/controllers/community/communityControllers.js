import Community from "../../models/community/communityModel.js";
import Post from "../../models/community/postModel.js";
import Patient from "../../models/healthCare/patientModel.js";
import Doctor from "../../models/healthCare/doctorModel.js";

//create community
export const createCommunity = async (req, res) => {
  const { name, description, disease } = req.body;
  const userId = req.user._id;

  try {
    const newCommunity = await Community.create({
      name,
      description,
      disease,
      admin: userId,
      members: [userId],
    });

    if (req.user.role === "patient") {
      await Patient.findByIdAndUpdate(userId, {
        $push: { communities: newCommunity._id },
      });
    }

    if (req.user.role === "doctor") {
      await Doctor.findByIdAndUpdate(userId, {
        $push: { communities: newCommunity._id },
      });
    }

    res.status(201).json({
      success: true,
      message: "Community created.",
      data: newCommunity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while create community.",
      Error: error?.message,
    });
  }
};

//get community
export const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find({}).sort({ postCount: -1 });
    res
      .status(200)
      .json({ success: true, count: communities.length, data: communities });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetch communities.",
      Error: error?.message,
    });
  }
};

//get community detils
export const getCommunityDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const community = await Community.findById(id)
      .populate("members", "name")
      .populate("admin", "name");
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found." });
    }
    const posts = await Post.find({ communityId: id })
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: { community, posts } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetch community details.",
      Error: error?.message,
    });
  }
};

//join community
export const joinCommunity = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const community = await Community.findById(id);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found." });
    }
    if (community.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You are already a member of this community.",
      });
    }
    community.members.push(userId);
    await community.save();

    if (req.user.role === "patient") {
      await Patient.findByIdAndUpdate(userId, {
        $push: { communities: community._id },
      });
    }

    if (req.user.role === "doctor") {
      await Doctor.findByIdAndUpdate(userId, {
        $push: { communities: community._id },
      });
    }

    res.status(200).json({
      success: true,
      message: "community Joined",
      data: community,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while join community.",
      Error: error?.message,
    });
  }
};

// get all communities where the user is a member
export const getMyCommunities = async (req, res) => {
  const userId = req.user._id;

  try {
    const communities = await Community.find({
      members: { $in: [userId] }
    })
    .select('name members postCount') 
    .sort({ name: 1 });

    res.status(200).json({
      success: true,
      message: "Communities fetched successfully.",
      count: communities.length,
      data: communities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching communities.",
      Error: error.message,
    });
  }
};