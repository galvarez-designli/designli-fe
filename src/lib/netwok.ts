import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const client = (() => {
  return axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  });
})();

const request = async <T = unknown>(
  options: AxiosRequestConfig,
): Promise<T> => {
  const onSuccess = (response: AxiosResponse) => {
    const { data } = response;

    return data;
  };

  const onError = function (error: AxiosError) {
    return Promise.reject({
      message: error.message,
      code: error.code,
      response: error.response,
    });
  };

  return client(options).then(onSuccess).catch(onError);
};

client.interceptors.request.use((config) => {
  return config;
});

client.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error) => {
    console.log("Error on network", error.response);

    return Promise.reject(error);
  },
);

export default request;
