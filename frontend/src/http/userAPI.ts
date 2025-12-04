import { User } from "../types/types.ts";
import { $authhost, $host } from "./index.ts";
import { jwtDecode } from "jwt-decode";

export const registration = async (
  name: string,
  email: string,
  password: string
) => {
  const { data } = await $host.post("api/users/registration", {
    name,
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode<User>(data.token);
};

export const authorization = async (
  email: string,
  password: string
): Promise<User> => {
  const { data } = await $host.post("api/users/authorization", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);

  return jwtDecode<User>(data.token);
};

export const check = async () => {
  const { data } = await $authhost.get("api/users/check");
  localStorage.setItem("token", data.token);
  return jwtDecode<User>(data.token);
};

