import instance from "@/utils/axios-instance";

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

