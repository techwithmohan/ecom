# URBAN THREADS E-commerce Website Architecture

## 🚀 Technology Stack
- **Frontend Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context or Zustand
- **Backend/Data**: For this phase, we will use a mock data structure (JSON) for products and categories.

## 📁 Project Structure
```text
/
├── public/                # Static assets (images, logos)
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── layout/        # Navbar, Footer
│   │   ├── home/          # Hero, Category cards, etc.
│   │   └── common/        # Buttons, Inputs, Cards
│   ├── data/              # Mock data (products.json, categories.json)
│   ├── pages/             # Next.js pages
│   │   ├── index.js       # Homepage
│   │   ├── category/      # Category pages ([slug].js)
│   │   ├── product/       # Product pages ([id].js)
│   │   ├── about.js       # About Us
│   │   ├── contact.js     # Contact Page
│   │   └── ...            # Policy pages
│   └── styles/            # Global styles
└── tailwind.config.js
```

## 🗺️ Sitemap & Routing
1. **Homepage** (`/`): Featured hero, categories, best sellers, etc.
2. **Category Pages** (`/category/[gender]`): Men, Women, Kids.
3. **Product Details** (`/product/[id]`): Detailed view of a T-shirt.
4. **Collections** (`/collection/[slug]`): Trending, Summer, Printed.
5. **Static Pages**:
   - `/about`: Brand story.
   - `/contact`: Contact details.
   - `/shipping`: Shipping policy.
   - `/returns`: Return & refund policy.

## 🛠️ Components Breakdown
- **Navbar**: Logo, search, cart, user profile.
- **Hero**: Main banner with headline and CTA.
- **Product Card**: Image, title, price, discount badge.
- **Footer**: Quick links, social icons, newsletter.

## 📊 Data Schema (Example)
```json
{
  "id": "men-oversized-black",
  "title": "Men’s Oversized Graphic T-Shirt – Black",
  "category": "men",
  "price": 499,
  "mrp": 699,
  "description": "Comfort meets style in this premium oversized T-shirt.",
  "features": ["100% Premium Cotton", "Soft & Breathable Fabric"],
  "sizes": ["S", "M", "L", "XL"],
  "images": ["/images/products/men-black-1.jpg"],
  "tags": ["trending", "summer"]
}
```
