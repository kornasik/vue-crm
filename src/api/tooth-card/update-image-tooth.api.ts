import httpClient from "../httpClient/httpClient";

const updateImageTooth = (file: any) => {
  return httpClient.post("medicine/teeth-map/update", file, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export { updateImageTooth };
