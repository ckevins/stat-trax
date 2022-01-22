import apiBase from "./api-base";

const resource = "/IndividualPlayers";
export default {
    get(){
        return apiBase.get(`${resource}`)
    },
    post(player){
        return apiBase.post(`${resource}`, player)
    }
}