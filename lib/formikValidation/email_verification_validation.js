import * as Yup from "yup";

const VerificationSchema = Yup.object().shape({
    verificationCode: Yup.string()
        .required("Verification code is required")
        .matches(/^[0-9]{6}$/, "Verification code should be 6 digits long")
        .min(6, "Verification code should be 6 digits long")
        .max(6, "Verification code should be 6 digits long")
});

export default VerificationSchema;
