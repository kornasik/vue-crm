import httpClient from "../httpClient/httpClient";

const getListTeethMapImage = () => {
  return httpClient.get("/medicine/teeth-map/list", {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export { getListTeethMapImage };
