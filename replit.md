# CarValue - Pakistan's Car Valuation Platform

## Overview

CarValue is a web application designed to provide AI-powered car valuations for the Pakistani automotive market. The platform allows users to evaluate their vehicles, track price trends, set price alerts, and access market insights. It's built as a modern SaaS application with a focus on user experience and accurate valuation data.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives with custom styling)
- **Theme System**: Custom light/dark mode implementation with localStorage persistence

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful API with `/api` prefix
- **Build Process**: esbuild for server bundling, Vite for client bundling

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **Migrations**: Drizzle Kit with migrations in `./migrations` directory
- **Current Storage**: In-memory storage implementation (MemStorage class) as default, with interface ready for database integration

### Design System
- **Typography**: Inter for UI, Manrope for headings (via Google Fonts)
- **Color System**: HSL-based CSS variables with semantic naming (primary, secondary, muted, accent, destructive)
- **Component Patterns**: Card-based layouts, fixed navigation, responsive grid systems
- **Border Radius**: Custom scale (sm: 3px, md: 6px, lg: 9px)

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route-level page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and configurations
├── server/           # Backend Express application
├── shared/           # Shared types and schemas
└── migrations/       # Database migrations
```

### Key Pages
- Landing page with hero, features, and testimonials
- Car evaluation wizard (multi-step form)
- Results page with valuation details and charts
- User dashboard with saved evaluations
- Authentication (Login/Signup)
- About and Contact pages

## External Dependencies

### UI Component Libraries
- Radix UI primitives (dialogs, dropdowns, forms, navigation)
- shadcn/ui component system
- Lucide React icons
- React Icons (social media icons)
- Embla Carousel for carousels
- Recharts for data visualization

### Database & ORM
- Drizzle ORM for database operations
- PostgreSQL as the database (via DATABASE_URL environment variable)
- Drizzle Zod for schema validation integration

### State & Forms
- TanStack React Query for API state management
- React Hook Form with Zod resolvers for form validation

### Styling
- Tailwind CSS with custom configuration
- Class Variance Authority for component variants
- clsx and tailwind-merge for class composition

### Session Management
- express-session for server sessions
- connect-pg-simple for PostgreSQL session storage

### Development Tools
- Vite development server with HMR
- Replit-specific plugins for development (cartographer, dev-banner, error overlay)
- TypeScript with strict mode enabled