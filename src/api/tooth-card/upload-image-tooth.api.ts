import httpClient from "../httpClient/httpClient";

const uploadImageTooth = (file: any) => {
  return httpClient.post("medicine/teeth-map", file, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export { uploadImageTooth };
