// import httpClient from "../httpClient/httpClient";

// const END_POINT = "/medicine/manufacturer";

// const getManufacturerList = () => httpClient.get(`${END_POINT}/list`);

// export { getManufacturerList };

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}/list`);
  }
});
