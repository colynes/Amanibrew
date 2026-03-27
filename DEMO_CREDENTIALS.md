# Amani Brew E-Commerce System - Demo Credentials

## Test Accounts

Use these credentials to test different user roles in the system:

---

### 👤 Customer/User Account
**Role:** Customer  
**Email:** `customer@example.com`  
**Password:** `customer123`

**Access:**
- Shop products and browse catalog
- Add items to cart
- Place and track orders
- View promotions
- Manage profile and delivery preferences

**Test Journey:**
1. Login with customer credentials
2. Navigate to `/shop` or click "Order Now" from landing page
3. Browse products and add to cart
4. Proceed to checkout
5. Track your order

---

### 👨‍💼 Staff Account
**Role:** Staff  
**Email:** `staff@amanibrew.com`  
**Password:** `staff123`

**Access:**
- Staff dashboard
- View and process orders
- Update order status (preparation, dispatch, etc.)
- View inventory and reports
- **Cannot** access user management or promotional controls

**Test Journey:**
1. Login with staff credentials
2. Access dashboard at `/dashboard`
3. View and manage orders
4. Update order statuses

---

### 👑 Admin Account
**Role:** Admin  
**Email:** `admin@amanibrew.com`  
**Password:** `admin123`

**Access:**
- Full system access
- User management
- Product and inventory management
- Create and manage promotions
- Sales analytics and reports
- Staff oversight
- System settings

**Test Journey:**
1. Login with admin credentials
2. Access full dashboard at `/dashboard`
3. Manage users, products, and promotions
4. View comprehensive analytics

---

## Quick Access URLs

- **Landing Page:** `/`
- **Login Page:** `/login`
- **Customer Shop:** `/shop`
- **Admin/Staff Dashboard:** `/dashboard`
- **Products:** `/shop/products`
- **Cart:** `/shop/cart`
- **Promotions:** `/shop/promotions`
- **Profile:** `/shop/profile`

---

## System Features by Role

| Feature | Customer | Staff | Admin |
|---------|----------|-------|-------|
| Browse & Shop Products | ✅ | ❌ | ✅ |
| Manage Cart | ✅ | ❌ | ✅ |
| Place Orders | ✅ | ❌ | ✅ |
| Track Orders | ✅ | ✅ | ✅ |
| View Promotions | ✅ | ✅ | ✅ |
| Process Orders | ❌ | ✅ | ✅ |
| Manage Inventory | ❌ | ❌ | ✅ |
| Create Promotions | ❌ | ❌ | ✅ |
| User Management | ❌ | ❌ | ✅ |
| View Analytics | ❌ | ✅ | ✅ |

---

## Testing Notes

- All data is stored in browser localStorage
- Orders persist across sessions
- Cart items are saved automatically
- Customer profile can be edited from `/shop/profile`
- Order tracking shows 3-stage timeline: Payment → Dispatch → Received

---

**Last Updated:** March 26, 2026
