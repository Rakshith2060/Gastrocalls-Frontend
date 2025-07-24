// api/user.js
import axiosInstance from "./axiosInstance";

export const loginUserApi = async ({ email, password }) => {
  const response = await axiosInstance.post("/api/auth/login", { email, password });
  return response.data;
};

export const registerUserApi = async ({ email, password, givenName, familyName, gender, phoneNumber }) => {
  const response = await axiosInstance.post("/api/auth/register", { email, password, givenName, familyName, gender, phoneNumber });
  return response.data;
};

export const confirmUserApi = async ({ email, code}) => {
  const response = await axiosInstance.post("/api/auth/confirm", { email, code});
  return response.data;
};

export const resendConfirmationUserApi = async ({ email }) => {
  const response = await axiosInstance.post("/api/auth/resendcode", { email });
  return response.data;
};

