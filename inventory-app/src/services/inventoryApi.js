import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Замініть на реальний URL бекенду

export const inventoryApi = {
  // Отримання всього інвентарю
  getAll: () => axios.get(`${BASE_URL}/inventory`),
  
  // Отримання деталей по ID
  getById: (id) => axios.get(`${BASE_URL}/inventory/${id}`),
  
  // Створення (multipart/form-data згідно з вимогами)
  create: (formData) => axios.post(`${BASE_URL}/register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Оновлення текстових даних (JSON)
  updateData: (id, data) => axios.put(`${BASE_URL}/inventory/${id}`, data),
  
  // Оновлення фото (multipart/form-data)
  updatePhoto: (id, formData) => axios.put(`${BASE_URL}/inventory/${id}/photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Видалення
  delete: (id) => axios.delete(`${BASE_URL}/inventory/${id}`)
};