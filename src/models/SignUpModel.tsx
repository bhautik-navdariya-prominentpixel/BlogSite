import  * as Yup from "yup";
import { GetId } from "../utils/utils";

export class SignUpModel {
  userId: string = GetId();
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
}

export const SignUpModelValidation = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().required().matches(/^[^@]+@prominentpixel.com$/, { message: "Only Prominent Pixel email is allowd." }),
  username: Yup.string().required(),
  password: Yup.string()
    .required()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: "Minimum eight characters, at least one letter and one number.",
    }),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Passwords must match with password")
    .required("Confirm Password is required"),
});