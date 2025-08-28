import { redirect } from "react-router-dom";
import { isLogin } from "../helpers/AuthHelper";

export function protectedRoute() {
  const isUserLogin = isLogin();
  if(!isUserLogin){
    return redirect("/");
  }
}
