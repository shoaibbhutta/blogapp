import * as yup from "yup";

export let validationSchema = yup.object({
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid firstName")
    .min(3)
    .required("firstName is required"),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid lastName")
    .min(3)
    .required("lastName is required"),
  date_of_birth: yup.date().required("please select your date  of birth"),
  email: yup.string().email().required("email is required"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  Repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("confirm your password"),
});

export const initialValues = {
  firstName: "",
  lastName: "",
  date_of_birth: "",
  email: "",
  password: "",
  Repassword: "",
};
