import * as Yup from "yup";

export class LoginModel {
  username: string = "";
  password: string = "";
}

export const LoginModelValidation = Yup.object({
  username: Yup.string().required(),
  password: Yup.string()
    .required()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: "Minimum eight characters, at least one letter and one number.",
    }),
});
