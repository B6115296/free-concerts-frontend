# Free Concerts Frontend

A modern concert booking application built with Next.js 13+ and TypeScript, featuring admin and user interfaces for concert management and reservations.

## 🚀 Setup & Configuration

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:3001`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd free-concerts-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_DEFAULT_USER_EMAIL=john.doe@example.com
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Application Architecture

### **Design Pattern: Custom Hooks Architecture**

The application follows a clean separation of concerns with custom React hooks encapsulating business logic:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Components    │───▶│   Custom Hooks   │───▶│   API Layer     │
│   (UI Layer)    │    │  (Logic Layer)   │    │ (Data Layer)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### **Core Architecture Components**

#### **1. Custom Hooks Layer**
- **`useAdminConcerts`** - Admin concert management, stats, CRUD operations
- **`useUserConcerts`** - User authentication, concert viewing, reservations
- **`useHistory`** - Reservation history management

#### **2. Components Layer**
- **Pages**: Admin, User, History
- **UI Components**: ConcertCard, ConcertForm, StatsBox, ConfirmModal, Toast, LoadingSpinner
- **Layout**: Sidebar with mode switching

#### **3. API Layer**
- **Centralized API Instance**: `app/utils/api.ts`
- **Base URL**: `http://localhost:3001`
- **Consistent Headers**: JSON content type
- **Error Handling**: Unified error management across hooks

### **State Management Strategy**
- **Local State**: React hooks (`useState`, `useEffect`)
- **No Global State**: Each hook manages its own domain
- **Persistence**: User data stored in localStorage
- **Real-time Updates**: Hooks automatically refresh data after mutations

## 📦 Libraries & Packages

### **Core Framework**
- **`next` (13+)** - React framework with App Router
- **`react` & `react-dom`** - UI library
- **`typescript`** - Type safety

### **Styling & UI**
- **`tailwindcss`** - Utility-first CSS framework
- **`react-icons`** - Icon library (Fi, Pi, Md, Bs)
- **Custom CSS** - Component-specific styles in `app/styles/`

### **HTTP Client & Validation**
- **`axios`** - HTTP client for API calls
- **`zod`** - Schema validation for forms

### **Development Tools**
- **`@types/node`** - Node.js type definitions
- **`@types/react`** - React type definitions
- **`eslint`** - Code linting
- **`eslint-config-next`** - Next.js ESLint configuration

## 🧪 Testing

### **Running Tests**

Currently, the project uses Next.js's built-in development tools. To set up unit tests:

1. **Install testing dependencies** (if needed):
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. **Create test configuration** (if needed):
   ```bash
   npm run test
   ```

3. **Run development mode**:
   ```bash
   npm run dev
   ```

### **Testing Strategy**

#### **Component Testing**
- Test UI components with React Testing Library
- Verify user interactions and state changes
- Test custom hooks independently

#### **Integration Testing**
- Test API integration with mock responses
- Verify data flow between hooks and components
- Test form validation and error handling

#### **Manual Testing**
- **Admin Mode**: Create, view, delete concerts
- **User Mode**: View concerts, make/cancel reservations
- **Mode Switching**: Test admin/user navigation
- **Responsive Design**: Test mobile/desktop layouts

## 🔧 Features

### **Admin Features**
- ✅ Concert CRUD operations
- ✅ Real-time seat statistics
- ✅ Reservation history viewing
- ✅ Form validation with Zod schemas
- ✅ Toast notifications for feedback

### **User Features**
- ✅ Concert browsing and filtering
- ✅ Seat reservation system
- ✅ Reservation cancellation
- ✅ Persistent user sessions
- ✅ Responsive mobile experience

### **Technical Features**
- ✅ Custom hooks architecture
- ✅ Type-safe TypeScript implementation
- ✅ Centralized API management
- ✅ Custom CSS with utility classes
- ✅ Environment variable configuration
- ✅ Error boundary handling
- ✅ Loading states management

## 📁 Project Structure

```
free-concerts-frontend/
├── app/
│   ├── admin/
│   │   ├── page.tsx
│   │   └── history/
│   │       └── page.tsx
│   ├── user/
│   │   └── page.tsx
│   ├── components/
│   │   ├── ConcertCard.tsx
│   │   ├── ConcertForm.tsx
│   │   ├── ConfirmModal.tsx
│   │   ├── StatsBox.tsx
│   │   ├── Toast.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── HistoryTable.tsx
│   │   └── Sidebar/
│   ├── styles/
│   │   ├── concert-card.css
│   │   ├── concert-form.css
│   │   ├── stats-box.css
│   │   ├── confirm-modal.css
│   │   ├── toast.css
│   │   ├── loading-spinner.css
│   │   └── history-table.css
│   └── utils/
│       └── api.ts
├── hooks/
│   ├── useAdminConcerts.ts
│   ├── useUserConcerts.ts
│   ├── useHistory.ts
│   └── useToast.ts
├── types/
│   └── index.ts
├── .env.local
├── package.json
└── README.md
```

## 🌐 API Endpoints

### **Authentication**
- `POST /user/login` - User authentication

### **Admin Operations**
- `GET /admin/concerts` - Fetch all concerts
- `GET /admin/concerts/seats-summary` - Get seat statistics
- `POST /admin/concerts` - Create new concert
- `DELETE /admin/concerts/:id` - Delete concert

### **User Operations**
- `GET /concerts/:userId` - Fetch user concerts
- `POST /reservations` - Create reservation
- `PATCH /reservations/:id/cancel` - Cancel reservation

### **History**
- `GET /reservation-history` - Fetch reservation history

## 🎨 Styling Approach

The application uses a hybrid styling approach:
- **Tailwind CSS** for rapid prototyping and utilities
- **Custom CSS** for component-specific styles
- **Responsive design** with mobile-first approach
- **Consistent design system** with defined color palette and spacing

## 🔒 Environment Variables

- `NEXT_PUBLIC_DEFAULT_USER_EMAIL` - Default user for auto-login
- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL

## 🚀 Deployment

The application is optimized for deployment on Vercel, Netlify, or any Next.js-compatible platform.

## 📝 Development Notes

- Built with **TypeScript** for type safety
- **Custom hooks** pattern for reusable logic
- **Environment variables** for configuration
- **Responsive design** for all screen sizes
- **Error handling** throughout the application
- **Loading states** for better UX
