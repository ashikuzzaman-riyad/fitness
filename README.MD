## To generate schema.prisma file

npm run prisma:generate-schema

```
┌─────────────────────────────────────────────────────────────────┐
│                     API ENDPOINTS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BRANDS                                                         │
│  POST   /api/brands                  Create brand               │
│  GET    /api/brands                  Get all brands             │
│  GET    /api/brands/:id              Get brand by ID            │
│  GET    /api/brands/slug/:slug       Get brand by slug          │
│  PUT    /api/brands/:id              Update brand               │
│  DELETE /api/brands/:id              Delete brand               │
│                                                                 │
│  CATEGORIES                                                     │
│  POST   /api/categories              Create category            │
│  GET    /api/categories              Get all categories         │
│  GET    /api/categories/:id          Get category by ID         │
│  GET    /api/categories/slug/:slug   Get category by slug       │
│  PUT    /api/categories/:id          Update category            │
│  DELETE /api/categories/:id          Delete category            │
│                                                                 │
│  PRODUCTS                                                       │
│  POST   /api/products                Create product             │
│  GET    /api/products                Get all products           │
│  GET    /api/products/:id            Get product by ID          │
│  GET    /api/products/slug/:slug     Get product by slug        │
│  PUT    /api/products/:id            Update product             │
│  DELETE /api/products/:id            Delete product             │
│                                                                 │
│  ORDERS                                                         │
│  POST   /api/orders                  Create order               │
│  GET    /api/orders                  Get all orders             │
│  GET    /api/orders/:id              Get order by ID            │
│  GET    /api/orders/number/:num      Get order by number        │
│  PUT    /api/orders/:id              Update order               │
│  DELETE /api/orders/:id              Delete order               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#for git clone

1. npm i
2. npm run dev
