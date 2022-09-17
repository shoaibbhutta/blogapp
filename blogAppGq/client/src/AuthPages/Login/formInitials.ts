import * as yup from "yup";
export const initialValues = {
  email: "",
  password: "",
};

export let validationSchema = yup.object({
  email: yup.string().email().required("email is required"),

  password: yup.string().required("Password is required"),
});
