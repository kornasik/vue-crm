// import httpClient from "../httpClient/httpClient";
import { TemplatePosition } from "@/shared/classes/template-position";
import Template from "@/shared/classes/template.model";

// const END_POINT = "/medicine/complaint-templates";

// const deleteTemplateById = (id: number) =>
//   httpClient.delete(`${END_POINT}/${id}`);
// const changePosition = (positions: TemplatePosition[]) =>
//   httpClient.post(`${END_POINT}/change-position`, positions);

// export { deleteTemplateById, changePosition };

export default (httpClient: any, endpoint: string) => ({
  deleteById(id: number) {
    return httpClient.delete(`${endpoint}/${id}`);
  },
  changePosition(positions: TemplatePosition[]) {
    return httpClient.post(`${endpoint}/change-position`, positions);
  },
  getList() {
    return httpClient.get(`${endpoint}/list`);
  },
  create(template: Template) {
    return httpClient.post(`${endpoint}/create`, template);
  },
  update(template: Template) {
    return httpClient.put(`${endpoint}/update`, template);
  }
});
