Инструкция по тестированию API

1. Установка зависимостей
```bash
npm install
```

2. Настройка базы данных

Создайте файл `.env` в корне проекта:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=booking_db
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/booking_db
```

3. Выполнение миграций
```bash
setup-database.bat
```

Этот скрипт автоматически:
- Создаст базу данных
- Создаст таблицы
- Добавит тестовые данные

5. Запуск сервера

```bash
npm run dev
```

6. Тестирование API

Успешное бронирование:
```bash
curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Content-Type: application/json" \
  -d '{"event_id": 1, "user_id": "user123"}'
```

Попытка повторного бронирования (ошибка):
```bash
curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Content-Type: application/json" \
  -d '{"event_id": 1, "user_id": "user123"}'
```

Несуществующее событие (ошибка):
```bash
curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Content-Type: application/json" \
  -d '{"event_id": 999, "user_id": "user789"}'
```

Невалидные данные (ошибка):
```bash
curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Content-Type: application/json" \
  -d '{"event_id": 1}'
```

Ожидаемые ответы
Успешное бронирование (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "event_id": 1,
    "user_id": "user123",
    "created_at": "2024-01-01T12:00:00.000Z"
  }
}
```

Ошибка - событие не найдено (404):
```json
{
  "success": false,
  "error": "Event not found"
}
```

Ошибка - уже забронировано (400):
```json
{
  "success": false,
  "error": "User has already booked this event"
}
```

Ошибка - нет мест (400):
```json
{
  "success": false,
  "error": "No available seats"
}
```

Ошибка валидации (400):
```json
{
  "success": false,
  "error": "user_id is required"
}
```

Проверка в базе данных

Подключитесь к базе и проверьте данные:
```sql
SELECT * FROM events;
SELECT * FROM bookings;
```