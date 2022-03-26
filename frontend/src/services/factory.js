import playersService from "./players.service";
import gamesService from "./games.services";

const services = {
    players: playersService,
    games: gamesService
}

export const serviceFactory = {
    get: name => services[name],
}