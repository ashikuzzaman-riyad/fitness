# Foode Backend API

This project is a backend API for managing **brands, categories, products, and orders**. Built with **Node.js, Express, Prisma, and PostgreSQL**.

---

## ✅ API Endpoints

### **Brands**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/brands` | Create brand |
| GET | `/api/brands` | Get all brands |
| GET | `/api/brands/:id` | Get brand by ID |
| GET | `/api/brands/slug/:slug` | Get brand by slug |
| PUT | `/api/brands/:id` | Update brand |
| DELETE | `/api/brands/:id` | Delete brand |

### **Categories**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/categories` | Create category |
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get category by ID |
| GET | `/api/categories/slug/:slug` | Get category by slug |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

### **Products**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Create product (with nested variants, images, nutrition) |
| GET | `/api/products` | Get all products (with filtering, sorting, pagination) |
| GET | `/api/products/:id` | Get product by ID |
| GET | `/api/products/slug/:slug` | Get product by slug |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### **Orders**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order (updates inventory log automatically) |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get order by ID |
| GET | `/api/orders/number/:num` | Get order by order number |
| PUT | `/api/orders/:id` | Update order |
| DELETE | `/api/orders/:id` | Delete order |

---

## ✅ Sample JSON Payloads

### **User**
```json
{
  "name": "riyad",
  "email": "riam@example.com",
  "password": "1234",
  "role": "ADMIN"
}

Category
{
  "name": "frute",
  "parentId": null
}

Brand
{
  "name": "HealthPlus",
  "slug": "healthplus",
  "description": "Premium health and fitness products",
  "country": "Bangladesh",
  "logoUrl": "https://example.com/logo.png"
}

Product
{
  "name": "black milk",
  "basePrice": 30,
  "salePrice": 25,
  "description": "A handbook of agile software craftsmanship",
  "ingredients": "Paper, Ink, Glue",
  "expiryDays": 0,
  "categoryId": "c8c0dd52-82c2-49ed-a238-726411db1b35",
  "brandId": "c0c9fc9a-5239-4ac3-a13d-34eade92e534",
  "nutrition": {
    "calories": 120,
    "protein": 10,
    "carbs": 5,
    "fats": 2,
    "sugar": 1,
    "fiber": 0.5,
    "sodium": 10,
    "cholesterol": 0,
    "vitamins": "B12",
    "minerals": "Iron"
  },
  "images": [
    { "url": "https://example.com/images/clean-code-main.jpg", "isMain": true },
    { "url": "https://example.com/images/clean-code-back.jpg", "isMain": false }
  ],
  "variants": [
    {
      "sku": "CCddddB-HC",
      "price": 25,
      "stock": 50,
      "isDefault": true,
      "attributes": [
        { "attribute": "Format", "value": "Hardcover" },
        { "attribute": "Language", "value": "English" }
      ]
    },
    {
      "sku": "CdddCdB-PC",
      "price": 20,
      "stock": 30,
      "attributes": [
        { "attribute": "Format", "value": "Paperback" }
      ]
    }
  ]
}

Order
{
  "userId": "1965ec23-7d4d-4417-8d94-c2af3b840392",
  "orderNumber": "ORD-20260117-001",
  "totalAmount": 100,
  "discountAmount": 10,
  "finalAmount": 90,
  "orderItems": [
    {
      "productId": "ded13c46-3370-4dc8-aa80-85c66eccf33d",
      "variantId": "9149ec04-11fa-490d-9f66-a992d589b36a",
      "quantity": 2,
      "unitPrice": 25
    },
    {
      "productId": "f74c1f03-67b4-4384-a23d-e95e1eb837de",
      "variantId": "9149ec04-11fa-490d-9f66-a992d589b36a",
      "quantity": 1,
      "unitPrice": 50
    }
  ]
}

✅ Setup Instructions

Clone the repository:

git clone <repo-url>


Install dependencies:

npm i


Generate Prisma client:

npx prisma generate


Run database migrations:

npx prisma migrate dev --name init


Start the development server:

npm run dev