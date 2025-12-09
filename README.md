# Auto-Price-Pro

**CarValue** - Pakistan's AI-Powered Car Valuation Platform (Frontend Only)

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


### Endpoints

1. `POST /api/evaluations` - Create car evaluation
2. `GET /api/evaluations?userId={userId}` - Get user evaluations
3. `DELETE /api/evaluations/{id}` - Delete evaluation
4. `POST /api/alerts` - Create price alert
5. `GET /api/alerts?userId={userId}` - Get user alerts
6. `PATCH /api/alerts/{id}/status` - Update alert status
7. `DELETE /api/alerts/{id}` - Delete alert

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

---

**Ready for development!** 🚀

Start the frontend with:
```bash
cd frontend && npm install && npm run dev
```
