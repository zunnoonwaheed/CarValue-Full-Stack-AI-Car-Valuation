# Auto-Price-Pro

**CarValue** - Pakistan's AI-Powered Car Valuation Platform (Frontend Only)

## Overview

This repository contains a **standalone frontend application** with static/mock data. All backend infrastructure has been removed, and the application now runs completely independently using mock API functions.

## Project Structure

```
Auto-Price-Pro/
├── frontend/              # Complete standalone frontend application
│   ├── src/
│   │   ├── api/          # API documentation for backend developers
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities and configurations
│   │   ├── mock/         # Mock data and API functions
│   │   └── pages/        # Application pages
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.ts    # Vite configuration
│   ├── tsconfig.json     # TypeScript configuration
│   └── README.md         # Detailed frontend documentation
├── .env                  # Environment variables (empty for now)
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Quick Start

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

## Features

✅ **Complete car valuation platform UI**
- Multi-step evaluation wizard
- Price estimation with market insights
- Price alert management
- User dashboard
- Modern, responsive design

✅ **Static data for demonstration**
- Pre-populated car database (10+ brands, 100+ variants)
- Mock evaluations and alerts
- Simulated API responses

✅ **Production-ready frontend**
- TypeScript with strict mode
- Tailwind CSS + shadcn/ui components
- React Query for state management
- Form validation with React Hook Form + Zod
- Light/Dark theme support

## For Backend Developers

All API endpoints required by the frontend are documented in:

**`frontend/src/api/API_DOCUMENTATION.md`**

This file contains:
- Complete API endpoint specifications
- Request/response formats
- Data types and schemas
- Example requests
- Error handling

### Required Endpoints

1. `POST /api/evaluations` - Create car evaluation
2. `GET /api/evaluations?userId={userId}` - Get user evaluations
3. `DELETE /api/evaluations/{id}` - Delete evaluation
4. `POST /api/alerts` - Create price alert
5. `GET /api/alerts?userId={userId}` - Get user alerts
6. `PATCH /api/alerts/{id}/status` - Update alert status
7. `DELETE /api/alerts/{id}` - Delete alert

### Mock Implementation

All API calls are currently mocked in `frontend/src/mock/mockApi.ts`. To integrate with a real backend:

1. Replace mock API imports with real API client
2. Update the base URL
3. Add authentication headers

Example:
```typescript
// Current (mock):
import mockApi from "@/mock/mockApi";
await mockApi.createEvaluation(data);

// Future (real API):
await fetch("/api/evaluations", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```

## Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Wouter** - Lightweight routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Recharts** - Data visualization
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Removed (Backend)
- ❌ Express server
- ❌ PostgreSQL database
- ❌ Drizzle ORM
- ❌ Server-side authentication
- ❌ OpenAI integration

## Pages

1. **Landing** (`/`) - Marketing homepage
2. **Evaluate** (`/evaluate`) - Car evaluation wizard
3. **Results** (`/results`) - Evaluation results with charts
4. **Dashboard** (`/dashboard`) - User evaluations and alerts
5. **Login** (`/login`) - Login page
6. **About** (`/about`) - About page
7. **Contact** (`/contact`) - Contact form

## Development

### Install Dependencies
```bash
cd frontend
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Type Check
```bash
npm run check
```

### Preview Production Build
```bash
npm run preview
```

## Deployment

The frontend can be deployed to any static hosting service:

- **Vercel** (Recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **GitHub Pages**
- **Any static web server**

Simply run `npm run build` and deploy the `dist/` directory.

## Environment Variables

Currently not required. For production with a real backend, add:

```env
VITE_API_BASE_URL=https://api.carvalue.pk
```

## Mock Data

### Mock User
- **User ID**: `user-001`
- **Username**: `demo@carvalue.pk`
- **Name**: Demo User

### Mock Evaluations
- 5 pre-created evaluations
- Various car makes/models (Toyota, Honda, Suzuki)
- Different years and conditions

### Mock Alerts
- 4 pre-created price alerts
- Different statuses (active, paused, triggered)

All mock data is defined in `frontend/src/mock/mockData.ts`

## Car Database

Includes comprehensive Pakistan car data:

- **Toyota**: Corolla, Yaris, Camry, Fortuner, Land Cruiser, Prado, Hilux
- **Honda**: Civic, City, Accord, BR-V, HR-V, Vezel
- **Suzuki**: Alto, Cultus, Swift, Wagon R, Jimny, Vitara
- **Hyundai**: Elantra, Sonata, Tucson, Santa Fe, Staria
- **KIA**: Picanto, Stonic, Sportage, Sorento, Carnival
- **Others**: Changan, MG, Proton, DFSK, Haval

Total: 10+ brands, 50+ models, 100+ variants with base prices

## What Changed

### Removed
- ✅ All backend code (server/, shared/)
- ✅ Original client/ folder (moved to frontend/)
- ✅ Backend dependencies
- ✅ Database configuration
- ✅ Server routing and middleware
- ✅ Real API integrations

### Added
- ✅ Standalone frontend/ folder
- ✅ Mock data and API functions
- ✅ Comprehensive API documentation
- ✅ Updated configuration files
- ✅ Frontend-specific README

### Modified
- ✅ All API calls now use mock functions
- ✅ User ID hardcoded to `user-001`
- ✅ Image handling simplified (base64)
- ✅ Authentication removed (prepared for future integration)

## Contributing

For backend integration:

1. Read the API documentation in `frontend/src/api/API_DOCUMENTATION.md`
2. Implement the required endpoints
3. Update frontend API calls to use real endpoints
4. Add authentication/authorization
5. Test integration with frontend

## License

MIT

## Support

For questions about the frontend implementation or API integration, please refer to:
- `frontend/README.md` - Detailed frontend documentation
- `frontend/src/api/API_DOCUMENTATION.md` - Complete API specifications

---

**Ready for development!** 🚀

Start the frontend with:
```bash
cd frontend && npm install && npm run dev
```
