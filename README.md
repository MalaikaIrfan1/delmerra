# Delmerra 🛋️

A full-stack e-commerce platform for home decor, built end to end as a freelance project for a client.

🌐 **Live:** [www.delmerra.com](https://www.delmerra.com)

![Delmerra homepage](./screenshots/home.png)

## Features

- **Storefront:** custom Next.js + Tailwind UI, category-based browsing, interactive product carousel, fully responsive
- **Atomic stock reservation:** prevents overselling when multiple customers check out at the same time
- **Checkout:** cash-on-delivery order flow with order status tracking
- **Admin dashboard:** authenticated CRUD for products, image uploads, and order fulfillment tracking
- **Image pipeline:** product images stored and served through Cloudinary
- **Design system:** custom visual identity and components, designed from scratch

## Tech Stack

| Layer | Tech |
| --- | --- |
| Frontend | Next.js, Tailwind CSS |
| Backend | Node.js, Express (REST API) |
| Database | MongoDB Atlas |
| Media | Cloudinary |
| Hosting | Vercel (frontend), Render (backend), custom domain |

## Screenshots

| Storefront | Product page | Admin dashboard |
| --- | --- | --- |
| ![Storefront](./screenshots/home.png) | ![Product](./screenshots/product.png) | ![Admin](./screenshots/admin.png) |

## Project Structure

```
├── frontend/   # Next.js storefront and admin UI
└── backend/    # Express API
```

## Run Locally

```bash
# 1. Clone
git clone https://github.com/MalaikaIrfan1/[REPO-NAME].git
cd [REPO-NAME]

# 2. Backend
cd backend
npm install
npm run dev        # [change if your script is different]

# 3. Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Environment variables

Create a `.env` file in `backend/` (and `.env.local` in `frontend/` if needed):

```
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
# [replace with the exact variable names your project uses]
```

## Author

**Malaika Irfan**, Software Engineering student & full-stack developer
[GitHub](https://github.com/MalaikaIrfan1)
