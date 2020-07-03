// import httpClient from "../httpClient/httpClient";

// const listDoctors = () => httpClient.get("/medicine/doctors/list");

// export { listDoctors };

export default (httpClient: any, endpoint: string) => ({
    getList() {
      return httpClient.get(`${endpoint}/list`);
    }
});