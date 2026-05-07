import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const inventoryApi = {
  getAll: () => axios.get(`${BASE_URL}/inventory`),
  
  getById: (id) => axios.get(`${BASE_URL}/inventory/${id}`),
  
  // Створення (multipart/form-data згідно з вимогами)
  create: (formData) => axios.post(`${BASE_URL}/register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' } // за допомогою axios конструюємо HTTP-запит, який і переносить нас у бекенд
  }),
  
  updateData: (id, data) => axios.put(`${BASE_URL}/inventory/${id}`, data),
  
  updatePhoto: (id, formData) => axios.put(`${BASE_URL}/inventory/${id}/photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  delete: (id) => axios.delete(`${BASE_URL}/inventory/${id}`)
};

/*
За допомогою бібліотеки Axios ми надсилаємо POST-запит на сервер (на endpoint /register ).
Після цього йде на бекенд

далі у server.js
*/