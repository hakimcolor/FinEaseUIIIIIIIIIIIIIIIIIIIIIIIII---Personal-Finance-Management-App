# FinTrack Frontend - React + Vite + Tailwind CSS

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Application runs on: `http://localhost:5173`

## 🔐 Admin Credentials

### Primary Admin:

```
Email: admin@fintrack.com
Password: Admin@123456
```

### Your Account (Also Admin):

```
Email: hakimcolor777@gmail.com
Password: (your existing password)
```

## 📍 Dashboard Routes

### User Dashboard

- **URL:** `/user-dashboard`
- **Access:** All authenticated users
- **Features:**
  - Financial Overview (Income, Expense, Balance)
  - Quick Actions
  - Financial Health Score
  - Spending Overview
  - Savings Goals
  - Financial Insights
  - Recent Transactions

### Admin Dashboard

- **URL:** `/admin-dashboard`
- **Access:** Users with role="admin" only
- **Features:**
  - User Management (View all users)
  - Role Assignment (Change user roles)
  - Category Management (CRUD operations)
  - Financial Reports Monitoring (Platform-wide statistics)
  - Featured Financial Tips Management (CRUD operations)
  - Platform Statistics

## 🛣️ All Routes

### Public Routes:

- `/` - Home page
- `/signin` - Login
- `/signup` - Register
- `/about` - About page
- `/features` - Features
- `/contact` - Contact

### Protected Routes (User):

- `/user-dashboard` - User dashboard
- `/add-transaction` - Add transaction
- `/my-transactions` - View transactions
- `/reports` - Financial reports
- `/budget-planning` - Budget management
- `/myprofile` - User profile
- `/transaction-details/:id` - Transaction details
- `/update-transaction/:id` - Edit transaction

### Protected Routes (Admin):

- `/admin-dashboard` - Admin control panel

## 🎨 Key Features

### For Normal Users:

✅ Transaction Management (Add, Edit, Delete)
✅ Category-based Tracking
✅ Search & Filter Transactions
✅ Financial Dashboard with Charts
✅ Savings Goals Tracker
✅ Budget Planning with Alerts
✅ Smart Financial Insights
✅ Monthly Reports & Analytics

### For Admins:

✅ User Management
✅ Role Assignment
✅ Category CRUD Operations
✅ Financial Reports Monitoring
✅ Featured Tips Management
✅ Platform Monitoring
✅ All User Features

## 🔧 Environment Variables

Create `.env` file:

```env
VITE_BACKEND_API=http://localhost:3000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

## 📦 Tech Stack

- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 4.1.17
- **Routing:** React Router DOM 7.9.6
- **Charts:** Chart.js 4.5.1 + React-Chartjs-2 5.3.1
- **Animations:** Framer Motion 12.24.10
- **Forms:** React Hook Form 7.68.0
- **HTTP:** Axios 1.13.2
- **Auth:** Firebase 12.6.0
- **Notifications:** React Hot Toast 2.6.0
- **Alerts:** SweetAlert2 11.26.10
- **Icons:** React Icons 5.5.0
- **Smooth Scroll:** Lenis 1.3.17

## 🎯 Role-Based Access

### Normal User (role: "user" or no role):

- ✅ Access User Dashboard
- ✅ Manage own transactions
- ✅ Create savings goals
- ✅ Set budgets
- ✅ View reports
- ❌ Cannot access Admin Dashboard

### Admin (role: "admin"):

- ✅ Access Admin Dashboard
- ✅ Access User Dashboard
- ✅ Manage all users
- ✅ Manage categories
- ✅ Change user roles
- ✅ All user permissions

## 🧪 Testing

### Test User Dashboard:

1. Register/Login as normal user
2. Go to `/user-dashboard`
3. Add transactions
4. Set savings goals
5. Create budgets
6. View insights

### Test Admin Dashboard:

1. Login with admin credentials
2. Go to `/admin-dashboard`
3. View all users
4. Change user roles
5. Create/edit/delete categories
6. Monitor financial reports
7. Manage featured financial tips

## 📱 Responsive Design

✅ Mobile (320px - 767px)
✅ Tablet (768px - 1023px)
✅ Desktop (1024px+)

## 🎨 UI Components

- Header with Navigation
- Footer
- Dashboard Cards
- Transaction List/Table
- Forms (Add/Edit)
- Charts (Pie, Bar, Doughnut)
- Modal Dialogs
- Loading States
- Empty States
- Error Messages
- Success Notifications
- Confirmation Dialogs

## 🚀 Build for Production

```bash
npm run build
```

Output: `dist/` folder

## 📊 Features Checklist

✅ Authentication (Firebase)
✅ User Dashboard
✅ Admin Dashboard
✅ Transaction CRUD
✅ Category Management
✅ Search & Filter
✅ Savings Goals
✅ Budget Planning
✅ Financial Insights
✅ Reports & Charts
✅ Responsive Design
✅ Dark/Light Mode Support
✅ Smooth Animations
✅ Loading States
✅ Error Handling

## 🎉 Project Status

**Status:** ✅ Complete & Ready for Submission

All mandatory features implemented!
Bonus features included!
