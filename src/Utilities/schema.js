import * as yup from "yup";

export const valschema = yup.object().shape({
  ownername: yup
    .string()
    .required("Owners's Name  is required")
    .trim("Owners's Name  is required"),
  email: yup
    .string()
    .email("Email is invalid")
    .required("Email is required")
    .trim("Email is required"),
  number: yup
    .string()
    .required("Mobile Number is required")
    .trim("Mobile Number is required")
    .min(10, "Mobile number should be 10 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .trim("Password is required")
    .min(6, "Password should be 6 characters long"),
  pan: yup
    .string()
    .required("Owner's Pan is required")
    .trim("Owner's Pan is required"),
  gst: yup.string().required("GSTIN is required").trim("GSTIN is required"),
  bnum: yup
    .string()
    .required("Bank Number is required")
    .trim("Bank Number is required"),
  ifsc: yup
    .string()
    .required("IFSC Code is required")
    .trim("IFSC Code is required"),
  rname: yup
    .string()
    .required("Restaurant Name is required")
    .trim("Restaurant Name is required"),
  radd: yup
    .string()
    .required("Restaurant Address is required")
    .trim("Restaurant Address is required"),
  fssai: yup
    .string()
    .required("FSSAI Certification number is required")
    .trim("FSSAI Certification number is required"),
});
