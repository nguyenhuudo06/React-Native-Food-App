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

export const callAddress = (userId: string) => {
  return instance.get(`/api/v1/client/address/get-all-address?userId=${userId}&pageNo=0&pageSize=10&sortBy=createdAt&sortDir=asc`);
};

export const callDeleteAddress = (addressId: string) => {
  return instance.delete(`/api/v1/client/address/delete/${addressId}`);
};

export const callAllProduct = async (pageNumber: number) => {
  return instance.get(`/api/v1/auth/guest/get-all-dishes?pageNo=${pageNumber}&pageSize=2&sortBy=dishName&sortDir=asc`);
};

export const callProductDetail = (productId: string) => {
  return instance.get(`/api/v1/auth/guest/get-dish-by-id/${productId}`)
}

export const callGetAllDishes = async (query: string) => {
  return instance.get(`/api/v1/auth/guest/get-all-dishes?${query}`);
};

export const callGetDishDetail = async (dishId: string) => {
  return instance.get(`/api/v1/auth/guest/get-dish-by-id/${dishId}`);
};