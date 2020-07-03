const getAuthToken = () =>
  localStorage.getItem("token") || "6122169a83195119ae466052a61cf814";

export default (config: any) => {
  config.headers["AuthToken"] = getAuthToken();
  // config.headers["Authorization"] = `Basic ${btoa("site:1234567890")}`;
  return config;
};
