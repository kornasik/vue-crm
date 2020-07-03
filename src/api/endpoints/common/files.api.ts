// import httpClient from "../httpClient/httpClient";

// const END_POINT = "/common/files";

// const downloadFile = (id: number) => httpClient.post(`${END_POINT}/download`, {'id': id}, {responseType: 'blob'});
// const uploadFiles = (files: any) => {
//   return httpClient.post(`${END_POINT}/upload`, files, {headers: {'Content-Type': 'multipart/form-data'}});
// };

// export {
//   downloadFile,
//   uploadFiles
// };

export default (httpClient: any, endpoint: string) => ({
  download(id: number) {
    return httpClient.post(`${endpoint}/download`, {'id': id}, {responseType: 'blob'});
  },
  // TODO: use class
  upload(files: any) {
   return httpClient.post(`${endpoint}/upload`, files, {headers: {'Content-Type': 'multipart/form-data'}});
  }
});