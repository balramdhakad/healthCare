import { trusted } from "mongoose";
import Doctor from "../../models/healthCare/doctorModel.js";


const createDoctorFilter = (query) => {
    const { status, search } = query;
    const filter = {};

    if (status === 'unverified') {
        filter.verified = false;
    } else if (status === 'verified') {
        filter.verified = true;
    } 

    if (search) {
        const orConditions = [
            { name: { $regex: new RegExp(search, "i") } },
            { clinicAddress: { $regex: new RegExp(search, "i") } },
            { specialization: { $regex: new RegExp(search, "i") } },
            { qualifications: { $regex: new RegExp(search, "i") } },
        ];

        if (Object.keys(filter).length > 0) {
            return { $and: [filter, { $or: orConditions }] };
        } else {
  
            return { $or: orConditions };
        }
    }

    return filter;
};


export const getAllDoctors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = createDoctorFilter(req.query);

        const doctors = await Doctor.find(filter)
            .limit(limit)
            .skip(skip)
            .select("name email verified specialization")
            .sort({ createdAt: -1 })
            .lean();

        const totalDoctors = await Doctor.countDocuments(filter);

        res.status(200).json({
            success: true,
            page,
            totalPages: Math.ceil(totalDoctors / limit),
            totalResults: totalDoctors,
            doctors,
        });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ success: false, message: "Server Error fetching doctors.", Error: error.message });
    }
};


//verify Doctor and Unverify as well
export const verifyDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const newVerifiedStatus =
      req.body?.verifiedStatus !== undefined ? false : true;

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { verified: newVerifiedStatus },
      { new: true, select: "name email verified appointmentTypes" }
    );

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found." });
    }

    res.status(200).json({
      success: true,
      message: `Doctor ${doctor.name} successfully verified.`,
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while verifying doctor.",
      Error: error?.message,
    });
  }
};
