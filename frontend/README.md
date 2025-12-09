# CarValue Frontend

A standalone frontend application for CarValue - Pakistan's AI-powered car valuation platform.

## Overview

This is a **static frontend** with mock data for demonstration purposes. All API calls are replaced with mock functions that return static data. This allows frontend development and design to proceed independently of backend implementation.

## Features

- 🚗 Car evaluation wizard with multi-step form
- 📊 Price estimation and market insights
- 🔔 Price alert management
- 📈 Dashboard with evaluations and alerts tracking
- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- 🌓 Light/Dark theme support
- 📱 Fully responsive design

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Charts**: Recharts
- **State Management**: TanStack React Query
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check with TypeScript

## Project Structure

```
frontend/
├── src/
│   ├── api/                    # API documentation for backend developers
│   │   └── API_DOCUMENTATION.md
│   ├── components/             # Reusable UI components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── lib/                   # Utilities and configurations
│   │   ├── carData.ts         # Car database and pricing logic
│   │   ├── theme.tsx          # Theme provider
│   │   ├── queryClient.ts     # React Query configuration
│   │   └── utils.ts           # Utility functions
│   ├── mock/                  # Mock data and API
│   │   ├── mockData.ts        # Static mock data
│   │   └── mockApi.ts         # Mock API functions
│   ├── pages/                 # Route pages
│   │   ├── Landing.tsx        # Home page
│   │   ├── Evaluate.tsx       # Car evaluation form
│   │   ├── Results.tsx        # Evaluation results
│   │   ├── Dashboard.tsx      # User dashboard
│   │   ├── Login.tsx          # Login page
│   │   ├── About.tsx          # About page
│   │   ├── Contact.tsx        # Contact page
│   │   └── not-found.tsx      # 404 page
│   ├── App.tsx                # Main app component with routing
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── README.md                  # This file
```

## Mock Data

All data is currently static and defined in `src/mock/`:

- **mockData.ts**: Contains mock evaluations, price alerts, and user data
- **mockApi.ts**: Mock API functions that simulate async API calls

### Current Mock User ID
`user-001` - All operations use this user ID

## API Integration

This frontend is ready for backend integration. See `src/api/API_DOCUMENTATION.md` for complete API specifications.

### Required Endpoints

1. `POST /api/evaluations` - Create car evaluation
2. `GET /api/evaluations?userId={userId}` - Get user evaluations
3. `DELETE /api/evaluations/{id}` - Delete evaluation
4. `POST /api/alerts` - Create price alert
5. `GET /api/alerts?userId={userId}` - Get user alerts
6. `PATCH /api/alerts/{id}/status` - Update alert status
7. `DELETE /api/alerts/{id}` - Delete price alert

### Switching to Real API

To integrate with a real backend:

1. Update the API base URL in mock API files or create a real API client
2. Replace imports of `mockApi` with real API calls
3. Update authentication to use real user IDs from auth system

Example:
```typescript
// Instead of:
import mockApi from "@/mock/mockApi";
const result = await mockApi.createEvaluation(data);

// Use:
const response = await fetch("/api/evaluations", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
const result = await response.json();
```

## Car Database

The application includes a comprehensive Pakistan car database in `src/lib/carData.ts` with:

- 10+ car manufacturers (Toyota, Honda, Suzuki, Hyundai, KIA, etc.)
- 50+ car models
- 100+ variants with base prices
- Transmission types, fuel types, and condition ratings

## Theme Support

The app supports light and dark themes:
- Toggle in the header or dashboard settings
- Persisted in localStorage
- Smooth transitions between themes

## Pages

1. **Landing** (`/`) - Marketing page with features and testimonials
2. **Evaluate** (`/evaluate`) - Multi-step car evaluation form
3. **Results** (`/results`) - Detailed evaluation results with charts
4. **Dashboard** (`/dashboard`) - User dashboard with saved evaluations and alerts
5. **Login** (`/login`) - Authentication page
6. **About** (`/about`) - About the company
7. **Contact** (`/contact`) - Contact form

## Environment Variables

Currently not required. For production with real backend:

```env
VITE_API_BASE_URL=https://api.carvalue.pk
```

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Deployment

The built app can be deployed to any static hosting service:

- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any web server

## Notes for Backend Developers

- See `src/api/API_DOCUMENTATION.md` for complete API specifications
- Mock data structure matches the expected API response format
- All TypeScript interfaces are defined in mock files and can be moved to a shared types file
- Current mock user ID: `user-001`
- Image handling is simplified (base64 encoding in mock)

## License

MIT
