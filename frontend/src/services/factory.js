import playersService from "./players.service";

const services = {
    players: playersService
}

export const serviceFactory = {
    get: name => services[name]
}