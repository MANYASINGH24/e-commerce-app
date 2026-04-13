# Full-Stack E-Commerce Application (MERN)

This repository contains the implementation of **Practical 7** and **Practical 8** for the Full Stack Development course. The project is a simplified E-commerce platform featuring a React frontend with global state management and a Node.js backend with JWT authentication and file uploads.

---

## 🚀 Phase 1: Practical 7 - React Front-end
**Aim:** To create a dynamic frontend with product listings, individual product details, and a functional shopping cart using global state.

### Key Features
* **Product Catalog:** Fetches data from `fakestoreapi.com` using Axios.
* **Navigation:** Implemented `react-router-dom` for seamless page transitions (Home, Product Details, Cart, Checkout).
* **Global State Management:** Used **React Context API** to manage cart state (add/remove items) across all components.
* **Components built:** * `ProductList`: Grid view of all products.
    * `ProductDetail`: Specific product information with "Add to Cart" functionality.
    * `Cart`: Summary of selected items.
    * `Checkout`: Total calculation and final order mockup.

---

## 🔒 Phase 2: Practical 8 - Authentication & Testing
**Aim:** To secure the application using industry-standard authentication and implement backend utility features.

### Key Features
* **JWT Authentication:** * Secure User Registration and Login APIs.
    * Password hashing using `bcrypt`.
    * JWT token generation and protected middleware for secure routes.
* **Image Management:** Integrated **Multer/Cloudinary** for handling product image uploads.
* **Payment Mockup:** A dummy checkout API that simulates transaction success/failure responses.
* **Data Validation:** Server-side validation to ensure clean data entry and user-friendly error messages.
* **API Testing:** Verified all endpoints using **Postman** (Collection included in the repo).

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Axios, React Router, Context API.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (for User & Product data).
- **Security:** JSON Web Tokens (JWT), Bcrypt.
- **Storage:** Cloudinary / Multer.

---

## 📥 Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/ecommerce-fsd.git](https://github.com/your-username/ecommerce-fsd.git)
cd ecommerce-fsd
2. Backend Setup
Bash
cd backend
npm install
Create a .env file in the backend folder:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLOUDINARY_URL=your_cloudinary_link
Bash
npm start
3. Frontend Setup
Bash
cd frontend
npm install
npm start
🧪 Postman API Tests
The following endpoints were validated during development:

POST /api/auth/register - User Registration.

POST /api/auth/login - User Login (Returns JWT).

GET /api/products - Fetch all products.

POST /api/upload - Upload product image (Protected).

POST /api/payment - Mock payment gateway.

🌐 Deployment
Frontend: Deployed on [Vercel/Netlify].

Backend: Deployed on [Render/Railway].
