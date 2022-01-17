import apiBase from "./api-base";

const resource = "/PlayerGames";
export default {
    get(id){
        return apiBase.get(`${resource}/${id}`)
    }
}