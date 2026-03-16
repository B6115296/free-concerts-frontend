# API Connections Configuration

## Centralized API Configuration
- **Base URL**: `http://localhost:3001`
- **Location**: `app/utils/api.ts`
- **Headers**: `Content-Type: application/json`

## API Endpoints by Hook

### useAdminConcerts Hook
- `GET /admin/concerts` - Fetch all concerts
- `GET /admin/concerts/seats-summary` - Get seat statistics
- `POST /admin/concerts` - Create new concert
- `DELETE /admin/concerts/:id` - Delete concert

### useUserConcerts Hook
- `POST /user/login` - User authentication
- `GET /concerts/:userId` - Fetch user concerts
- `POST /reservations` - Create reservation
- `PATCH /reservations/:id/cancel` - Cancel reservation

### useHistory Hook
- `GET /reservation-history` - Fetch reservation history

## Pages Using Hooks

### Admin Page (`/admin`)
- Uses: `useAdminConcerts`
- Features: Concert management, stats, create/delete

### User Page (`/user`)
- Uses: `useUserConcerts`
- Features: View concerts, reserve/cancel

### History Page (`/admin/history`)
- Uses: `useHistory`
- Features: View reservation history

## API Connection Status
✅ All pages use centralized API configuration
✅ Consistent error handling across all hooks
✅ Proper loading states management
✅ Toast notifications for user feedback
