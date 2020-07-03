// import httpClient from "../httpClient/httpClient";

// const contactsList = () => httpClient.get("crm/contact/list");

// export { contactsList };
export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}/list`);
  }
});
