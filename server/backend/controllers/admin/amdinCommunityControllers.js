import mongoose from "mongoose";
import Community from "../../models/community/communityModel.js";
import Post from "../../models/community/postModel.js";
import Doctor from "../../models/healthCare/doctorModel.js";
import Patient from "../../models/healthCare/patientModel.js";

const createCommunityFilter = (query) => {
  const { name, disease } = query;
  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (disease) {
    filter.disease = { $regex: disease, $options: "i" };
  }

  return filter;
};

export const getAllCommunities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = createCommunityFilter(req.query);

    const communities = await Community.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ postCount: -1, createdAt: -1 })
      .populate("admin", "name email")
      .lean();

    const totalCommunities = await Community.countDocuments(filter);

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalCommunities / limit),
      totalResults: totalCommunities,
      communities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error fetching communities.",
      Error: error?.message,
    });
  }
};

//delete Community
export const deleteCommunity = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const communityId = req.params.id;

    const result = await Community.findByIdAndDelete(communityId, { session });

    if (!result) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ success: false, message: "Community not found." });
    }

    await Post.deleteMany({ communityId: communityId }, { session });

    const doctorUpdateResult = await Doctor.updateMany(
      { communities: communityId },
      { $pull: { communities: communityId } },
      { session }
    );

    const patientUpdateResult = await Patient.updateMany(
      { communities: communityId },
      { $pull: { communities: communityId } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: `Community "${result.name}" deleted successfully.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      message:
        "Server Error deleting community.",
      Error: error?.message,
    });
  }
};
