# 📚 StoryShelf

## 🔎 Project Description

Storyshelf is a web-based book review platform where users can browse books. It features a separate admin panel for managing books and users — perfect for small community-driven libraries.


## ✨ Features

- 🔍 Browse a growing collection of books
- 📝 Authenticated users can leave reviews
- 🧑‍💻 Admin-only panel for managing users and books
- 🍪 JWT authentication stored in cookies
- ⚙️ Built with a full MERN-style stack (MongoDB, Express, Vue 3, Node.js)

## 🛠 Tech Stack

### Frontend:

- **Vue 3**: A JavaScript framework used to build user interfaces.
- **TypeScript**: Provides static type checking for a better development experience.
- **Pinia**: State management library for Vue 3.
- **Vue Router**: A routing library to manage navigation in the Vue app.
- **Axios**: A library used to make HTTP requests to the backend.
- **Vite**: A build tool that provides a faster development and build process.

### Backend:

- **Node.js**: A JavaScript runtime used to build the server.
- **Express**: A web framework to create APIs and handle HTTP requests.
- **CORS**: A package used to enable cross-origin resource sharing between the frontend and backend.
- **bcrypt**: A library used to hash passwords for secure authentication.
- **JWT Authentication**: Used for user authentication via JSON Web Tokens (JWT).

### Database:

- **MongoDB**: A NoSQL database used for storing and managing book and user data.

### Code Quality:

- **ESLint**: A linter to maintain consistent code style and catch errors.
- **Prettier**: A code formatter to ensure consistent code style across the project.

## 📦 Installation


```bash
git clone https://github.com/MalinRosenquist/storyshelf-app
cd storyshelf
npm install
```

## 🔐 Environment Variables

This project uses two `.env` files — one for the backend and one for the frontend.

### 📁 `book-api/.env`

```env
MONGODB_URL="mongodb+srv://boss:fed24@cluster0.ht9iarw.mongodb.net/storyshelf_db"
JWT_SECRET="hemligthemligt"
```

### 📁 `client-side/.env`

```env
VITE_API_BASE_URL=http://localhost:3000
```

## ▶️ Running the Project (Dev)

Start backend (e.g. on port 3000):

```bash
cd book-api
npm install
npm run dev
```

Start frontend (e.g. on port 5173):

```bash
cd client-side
npm install
npm run dev
```
## 🔐 Authentication
JWT tokens are issued on login and stored in HTTP-only cookies for security.

Admin users are authorized to create, update, and delete both users and books.

Regular users can only read content.

## 👩‍💻 Authors

- [Malin Rosenquist](https://www.github.com/malinrosenquist)
- [Emelie Boss](https://www.github.com/emeliesonjaboss)

## 📸 Screenshots

### 🏠 Home

![Home](./screenshots/screenshot-home.png)

### 📝 Register

![Register](./screenshots/screenshot-register.png)

### 🔐 Login

![Login](./screenshots/screenshot-login.png)

### 👥 User Table (Admin)

![User Table](./screenshots/screenshot-usertable.png)

### 📚 Book Table (Admin)

![Book Table](./screenshots/screenshot-booktable.png)

### ✏️ Edit User

![Edit User](./screenshots/screenshot-edituser.png)

### 📖 Edit Book

![Edit Book](./screenshots/screenshot-editbook.png)

### ➕ Add Book

![Add Book](./screenshots/screenshot-addbook.png)
