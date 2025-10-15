import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendOtp(mobileNo) {
  try {

    const verification = await client.verify.v2
      .services(process.env.VERIFY_SERVICE_SID)
      .verifications.create({
        to: `${mobileNo}`,
        channel: "sms",
      });

    console.log(`OTP sent to ${mobileNo}`);
    return verification;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}

export async function checkOtp(mobileNo, code) {
  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: mobileNo,
        code,
      });

    return verificationCheck.status === "approved";
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}
