// TODO: move to shared/classes
interface updateStageTypes {
  id: number;
  name: string;
  salesFunnelId: number;
  nextId: number;
}

export default (httpClient: any, endpoint: string) => ({
  update(updateStageData: updateStageTypes) {
    return httpClient.put(`${endpoint}/${updateStageData.id}`, {
      name: updateStageData.name,
      sales_funnel_id: updateStageData.salesFunnelId,
      move_after: updateStageData.nextId
    });
  },
  // TODO: create class
  add(newStage: object) {
    return httpClient.post(`${endpoint}/create`, newStage);
  },
  // TODO: create class
  delete(id: any) {
    return httpClient.delete(`${endpoint}/${id}`);
  },
  listStageFunnelByFunnelId(funnelId: number) {
    return httpClient.post(`${endpoint}/list?sales_funnel_id=${funnelId}`);
  }
});
