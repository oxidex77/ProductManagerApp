import axios from 'axios';
import { Product } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  console.log(response);
  return response.data;
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await axios.post(`${API_BASE_URL}/products`, product);
  return response.data;
};
