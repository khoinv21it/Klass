import { apiClient } from "../libraries/api-client";

export const getAllProducts = async () => {
    const response = await apiClient.get('/products');
    return response;
}