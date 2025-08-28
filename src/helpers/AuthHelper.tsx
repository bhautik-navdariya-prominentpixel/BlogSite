import { toast } from "react-toastify";
import { SignUpModel } from "../models/SignUpModel";
import { globalTostTheme } from "../utils/tost-theme-util";

export function getAllUsers(): SignUpModel[] {
  return JSON.parse(localStorage.getItem("users") ?? "[]");
}

export function signUpUser(user: SignUpModel): boolean {
  const users = getAllUsers();
  if (users.some((u) => u.email == user.email)) {
    toast.error("Sorry! User Alrady Exist With Same Email", globalTostTheme);
    return false;
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  toast.success("Sign Up Succsessfully!", globalTostTheme);
  return true;
}

export function setUserLogin(userData: SignUpModel): void {
  localStorage.setItem("login", JSON.stringify(userData));
}

export function loginUser(user: Partial<SignUpModel>): [boolean, SignUpModel | null] {
  const users = getAllUsers();
  const isLoginEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(user.username ?? "");
  console.log(isLoginEmail);

  const index = users.findIndex((u) => {
    if (isLoginEmail) {
      return u.email == user.username && u.password == user.password;
    }
    return u.username == user.username && u.password == user.password;
  });
  if (index > -1) {
    setUserLogin(users[index]);
    toast.success("Login Succsessfully!", globalTostTheme);
    return [true, users[index]];
  }
  toast.error("Wrong Username or Password!", globalTostTheme);
  return [false, null];
}

export function isLogin(): boolean {
  if (localStorage.getItem("login")) {
    return true;
  }
  return false;
}

export function getLoginUser(): SignUpModel {
  return JSON.parse(localStorage.getItem("login") ?? "{}");
}

export function getUserById(userId: string): SignUpModel {
  const users = getAllUsers();
  const user = users.find((user) => user.userId === userId);
  if (user) {
    return user;
  }
  return new SignUpModel();
}

export function logout(): void {
  toast.success("Logout Succsessfully!", globalTostTheme);
  localStorage.removeItem("login");
}
