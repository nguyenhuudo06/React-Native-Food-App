import instance from "@/utils/axios-instance";

export const callRegister = (
  email: string,
  password: string,
  fullName: string
) => {
  const data = instance.post('/api/v1/auth/sign-up', {
    email,
    password,
    fullName,
  });
  return data;
};

export const callLogin = async  (email: string, password: string) => {
  const response = await instance.post("/api/v1/auth/sign-in", { email, password });
  return response;
};

export const callProfile = () => {
  return instance.get('/api/v1/client/user/profile');
};

export const callRefreshToken = () => {
  return instance.get("/api/v1/auth/refresh-token");
};

export const callForgotPassword = (params: string) => {
  return instance.get(`/api/v1/auth/forgot-password?email=${params}`);
};

export const callUpdateProfile = (fullName: string, email: string) => {
  return instance.put('/api/v1/client/user/update', { fullName, email });
};