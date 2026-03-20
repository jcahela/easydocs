import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export interface Document {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export const documentApi = {
  async getAll(): Promise<Document[]> {
    const response = await axios.get(`${API_BASE_URL}/documents`);
    return response.data;
  }
};
