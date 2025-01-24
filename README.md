Task Manager Server NodeJS
## Kurulum ve Çalıştırma

### Gereksinimler
- Node.js
- npm

### Projeyi Klonlama
```bash
git clone https://github.com/erdembay/task_manager_server.git
cd task_manager_serer
```

### Bağımlılıkları Yükleme
```bash
npm install
```

### Ortam Değişkenlerini Ayarlama
Proje kök dizininde `.env.example` dosyasını `.env`  olarak değiştirin ve gerekli ortam değişkenlerini ekleyin:

MongoDB bağlantılarını özellikle kontrol ediniz development ortamında çalışacaksanız : connectionstringi düzeltiniz
`v1/src/loaders/mongo` içerisinde...


### Veritabanı Kurulumu
Veritabanını oluşturmak ve gerekli tabloları eklemek için aşağıdaki komutu çalıştırın:

DB yi migrate ediniz;
```bash
npm run migrate
```

Seederları çalıştırınız; (Priority tablosu için gereklidir!...)
```bash
npm run seeder
```

Veritabanı `mysql` tabloları [SQL Komutları](sql.sql) içerisinde bulunmaktadır
MongoDB şemaları model altında belirtilmiştir.

### Sunucuyu Başlatma
```bash
npm start
```

### API Dokümantasyonu
# Task Manager

## Base URL
The base URL for all endpoints:
```
http://localhost:3000
```

---

## Endpoints

### 1. **Users**
#### List All Users
- **Method**: `GET`
- **Endpoint**: `/users/list`
- **Description**: Retrieves a list of all users.

---

### 2. **Auth**
#### Register
- **Method**: `POST`
- **Endpoint**: `/auth/register`
- **Body (JSON)**:
  ```json
  {
      "username": "erdem",
      "email": "m.erdembay@gmail.com",
      "password": "12345678",
      "passwordRepeat": "12345678"
  }
  ```

#### Login
- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Body (JSON)**:
  ```json
  {
      "username": "erdem",
      "password": "12345678"
  }
  ```

#### Logout
- **Method**: `GET`
- **Endpoint**: `/auth/logout`

---

### 3. **Tasks**

#### Create Task
- **Method**: `POST`
- **Endpoint**: `/tasks`
- **Body (Form-Data)**:
  - `title`: Task title (text)
  - `description`: Task description (text)
  - `endDate`: End date of the task (text, e.g., `2025-01-29 13:55:50`)
  - `priorityId`: Priority ID of the task (text, e.g., `1`)
  - `attachment`: File attachment(s)

#### Update Task
- **Method**: `PUT`
- **Endpoint**: `/tasks/:id`
- **Body (Form-Data)**:
  - `title`: Updated title (text)
  - `description`: Updated description (text)
  - `endDate`: Updated end date (text)
  - `priorityId`: Updated priority ID (text)
  - `attachment`: Updated file attachment(s) (optional)
  - `status`: (optional)

#### Delete Task
- **Method**: `DELETE`
- **Endpoint**: `/tasks/:id`

#### List All Tasks
- **Method**: `GET`
- **Endpoint**: `/tasks`
- **Query Parameters**:
  - `orderBy`: Field to order by (e.g., `id`)
  - `sortOrder`: Sort direction (e.g., `DESC`)
  - `page`: Page number (e.g., `1`)
  - `limit`: Number of results per page (e.g., `12`)
  - `priority`: priorityId (e.g., `1`)
  - `endDate`: endDate (e.g., `2025-01-30`)
  - `status`: status (e.g., `0` / `1`)

#### Get Task by ID
- **Method**: `GET`
- **Endpoint**: `/tasks/:id`

---

## Environment Variables
To simplify requests, the collection uses the following environment variable:
- `baseUrl`: Base URL for API requests (default: `http://localhost:3000`)

---

