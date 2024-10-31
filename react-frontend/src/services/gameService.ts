import axios from './axios';
import {Game} from "../types/game";


export const gameService = {
    getAll: async () => {
        // No need to:
        // - Construct full URLs (handled by baseURL)
        // - Check response.ok (Axios throws on non-200)
        // - Parse JSON (Axios does automatically)
        const { data } = await axios.get<Game[]>('/game');
        return data;
    },

    search: async (query: string) => {
        // Axios handles:
        // - URL parameter encoding
        // - Query string construction
        // - Response parsing
        const { data } = await axios.get<Game[]>(`/game/search`, {
            params: { query }
        });
        return data;
    }
};