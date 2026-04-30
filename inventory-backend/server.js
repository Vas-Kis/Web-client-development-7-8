const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// --- Налаштування проміжних обробників (Middleware) ---
app.use(cors()); // Дозвіл на крос-доменні запити (вирішення помилки CORS)
app.use(express.json()); // Дозвіл на читання JSON-даних (для оновлення текстових полів)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Надання прямого доступу до папки з фото

// --- Налаштування завантаження файлів (Multer) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    // Папку буде створено автоматично, якщо її ще немає
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Ім'я файлу було згенеровано на основі поточного часу для уникнення дублікатів
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// --- База даних (імітація) ---
let inventory = [
  {
    id: '1',
    inventory_name: 'Приклад інвентарю',
    description: 'Це початкова позиція, яку було додано для демонстрації.',
    photo_url: null
  }
];

// --- Маршрутизація (Endpoints) ---

// 1. Читання списку (GET /inventory)
app.get('/inventory', (req, res) => {
  res.json(inventory);
});

// 2. Читання деталей однієї позиції (GET /inventory/:id)
app.get('/inventory/:id', (req, res) => {
  const item = inventory.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Позицію не знайдено' });
  res.json(item);
});

// 3. Створення нової позиції (POST /register)
app.post('/register', upload.single('photo'), (req, res) => {
  const { inventory_name, description } = req.body;
  
  if (!inventory_name) {
    return res.status(400).json({ message: 'Назва є обов\'язковою' });
  }

  const newItem = {
    id: Date.now().toString(), // Генерація унікального ID
    inventory_name,
    description: description || '',
    photo_url: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : null
  };
  
  inventory.push(newItem);
  res.status(201).json(newItem);
});

// 4. Оновлення текстових даних (PUT /inventory/:id)
app.put('/inventory/:id', (req, res) => {
  const { inventory_name, description } = req.body;
  const index = inventory.findIndex(i => i.id === req.params.id);
  
  if (index === -1) return res.status(404).json({ message: 'Позицію не знайдено' });

  inventory[index] = { 
    ...inventory[index], 
    inventory_name: inventory_name || inventory[index].inventory_name, 
    description: description || inventory[index].description 
  };
  res.json(inventory[index]);
});

// 5. Оновлення фотографії (PUT /inventory/:id/photo)
app.put('/inventory/:id/photo', upload.single('photo'), (req, res) => {
  const index = inventory.findIndex(i => i.id === req.params.id);
  
  if (index === -1) return res.status(404).json({ message: 'Позицію не знайдено' });

  if (req.file) {
    inventory[index].photo_url = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json(inventory[index]);
  } else {
    res.status(400).json({ message: 'Файл не було завантажено' });
  }
});

// 6. Видалення позиції (DELETE /inventory/:id)
app.delete('/inventory/:id', (req, res) => {
  const index = inventory.findIndex(i => i.id === req.params.id);
  
  if (index === -1) return res.status(404).json({ message: 'Позицію не знайдено' });

  inventory.splice(index, 1);
  res.status(204).send(); // 204 No Content означає успішне видалення
});

// --- Запуск сервера ---
app.listen(PORT, () => {
  console.log(`Сервер інвентарю було успішно запущено на http://localhost:${PORT}`);
});