

export default (httpClient: any, endpoint: string) => ({
    getList() {
        return httpClient.get(`${endpoint}/list`);
        // httpClient.get(`/common/units-group/list`);
        
    }
});