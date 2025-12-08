# Car Valuation Web Application - Design Guidelines

## Design Approach

**Selected Approach**: Reference-Based + Custom Aesthetic
- Primary inspiration: Modern SaaS applications (Linear, Notion) combined with automotive platforms (PakWheels, Autotrader)
- Aesthetic direction: Based on provided screenshot showing gradient treatments and modern card-based layouts
- Focus: Balance between utility (evaluation tools, dashboards) and experience (landing, marketing)

## Core Design Elements

### Typography
**Font Family**: Inter (Google Fonts) for UI, Manrope for headings
- **Headings**: 
  - H1: text-5xl md:text-6xl font-bold tracking-tight
  - H2: text-3xl md:text-4xl font-bold
  - H3: text-2xl font-semibold
  - H4: text-xl font-semibold
- **Body Text**:
  - Large: text-lg leading-relaxed
  - Default: text-base leading-normal
  - Small: text-sm
  - Caption: text-xs
- **Form Labels**: text-sm font-medium
- **Buttons**: text-sm md:text-base font-semibold

### Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Card padding: p-6 md:p-8
- Section padding: py-16 md:py-24 lg:py-32
- Component gaps: gap-4 to gap-8
- Form field spacing: space-y-6
- Container max-width: max-w-7xl mx-auto px-4 md:px-6

### Component Library

#### Navigation
- **Header**: Fixed top navigation with backdrop blur (backdrop-blur-lg)
  - Logo left, navigation center, CTA buttons right
  - Height: h-16 md:h-20
  - Transparent on scroll top, solid with shadow on scroll
  - Mobile: Hamburger menu with slide-in drawer

#### Cards & Containers
- **Evaluation Card**: Elevated card with subtle shadow (shadow-xl)
  - Border radius: rounded-2xl
  - Backdrop with gradient overlay treatment
  - Padding: p-6 md:p-8
- **Feature Cards**: Grid layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
  - Icon at top (w-12 h-12), title, description
  - Hover: Subtle lift effect (hover:-translate-y-1)
- **Alert Cards**: Notification-style cards with icon, timestamp, and action buttons
  - Border-left accent stripe (border-l-4)

#### Forms
- **Input Fields**: 
  - Height: h-12
  - Padding: px-4
  - Border radius: rounded-lg
  - Focus ring: focus:ring-2 focus:ring-offset-2
  - Placeholder text subtle
- **Select/Dropdown**: 
  - Consistent height with inputs
  - Custom arrow icon
  - Dropdown menu: rounded-lg shadow-xl with max height and scroll
- **Textarea** (for condition descriptions):
  - Min height: min-h-32
  - Resize: resize-none
  - Character counter below
- **Buttons**:
  - Primary: h-12 px-8 rounded-lg font-semibold (gradient background when applicable)
  - Secondary: h-12 px-6 rounded-lg border-2
  - Icon buttons: w-10 h-10 rounded-lg

#### Data Display
- **Price Display Card**: Large, prominent card
  - Estimated range in large text (text-4xl md:text-5xl font-bold)
  - Recommended price highlighted with badge/chip
  - Breakdown section with expandable details
- **Stats/Metrics**: Grid of stat cards (grid-cols-2 md:grid-cols-4)
  - Large number, small label below
- **Timeline/History**: Vertical timeline with dots and connecting lines
  - Each entry: date, event, price change indicator

#### Overlays
- **Modal**: 
  - Backdrop: bg-black/50 backdrop-blur-sm
  - Panel: max-w-2xl rounded-2xl shadow-2xl
  - Close button: top-right absolute
- **Toast Notifications**: 
  - Bottom-right positioned (bottom-4 right-4)
  - Slide-in animation
  - Auto-dismiss with progress bar
- **Confirmation Dialogs**: 
  - Centered modal with max-w-md
  - Icon at top, title, description, action buttons

### Animations
**Minimal, Purposeful Usage**:
- Page transitions: Subtle fade-in (duration-300)
- Card hover: Slight lift (hover:-translate-y-1 transition-transform duration-200)
- Form submission: Loading spinner on button
- Success states: Checkmark animation (scale + fade)
- NO scroll-triggered animations
- NO parallax effects

## Page-Specific Layouts

### Landing Page
**Structure** (6-7 sections):
1. **Hero Section** (80vh min-height):
   - Split layout: 60% content (left) + 40% hero image (right) on desktop
   - Large headline (text-5xl md:text-6xl)
   - Subheadline (text-xl md:text-2xl)
   - CTA buttons (primary + secondary)
   - Trust indicators below (text-sm with icons)

2. **How It Works** (3-column grid):
   - Icon, step number, title, description
   - Visual connector lines between steps on desktop

3. **Features Grid** (3-column layout):
   - Icon cards with hover effects
   - Title + description for each feature

4. **Price Estimation Preview** (full-width):
   - Interactive demo or screenshot of evaluation form
   - Live example showing price range

5. **Social Proof/Stats** (4-column stat grid):
   - Cars evaluated, average accuracy, users, ratings

6. **CTA Section**:
   - Centered content with gradient background treatment
   - Large CTA button
   - Secondary link

7. **Footer**: 
   - 4-column layout (About, Features, Support, Legal)
   - Newsletter signup
   - Social icons
   - Copyright

### Authentication Pages
**Layout**: Centered card (max-w-md mx-auto)
- Logo at top
- Form in card with p-8
- Social login buttons with divider ("or continue with")
- Switch between sign up/sign in link at bottom
- Background: Subtle gradient or pattern

### Car Evaluation Page
**Layout**: Two-column on desktop (2/3 form + 1/3 preview)
- **Left Column**: Multi-step form
  - Progress indicator at top (steps: Details → Condition → Review)
  - Form sections with clear grouping
  - Each section: 2-column grid for related fields
  - Condition text areas full-width
  - Bottom: Back + Next/Submit buttons
- **Right Column** (sticky):
  - Car preview card
  - Filled details summary
  - Tips/help section

### Results Page
**Layout**: Single column, centered (max-w-4xl)
- Large price display card at top
- Confidence indicator/gauge
- Price breakdown (expandable sections)
- Market comparison chart
- Action buttons: Save, Set Alert, Share
- Similar cars section (3-column grid)

### Dashboard
**Layout**: Sidebar + main content
- **Sidebar** (w-64):
  - User profile card
  - Navigation menu (My Evaluations, Alerts, Settings)
- **Main Content**:
  - Header with greeting + quick action button
  - Stats overview (grid-cols-3)
  - Recent evaluations (table or card list)
  - Active alerts (card list with toggle switches)

### Alert Setup Modal
**Layout**: Modal overlay (max-w-2xl)
- Car details summary at top
- Price comparison display
- Radio button selection (System price vs. Custom price)
- If custom: Number input with validation
- Notification preferences checkboxes
- Create Alert button (full-width at bottom)

## Images
1. **Hero Image**: Modern car photo (luxury sedan or SUV), professional automotive photography with clean background - positioned right side of hero section
2. **Feature Icons**: Use Heroicons for UI elements (outline style)
3. **Dashboard**: Small car thumbnail images in evaluation history cards
4. **Empty States**: Illustration-style graphics (not photos) for "No evaluations yet", "No alerts"

## Critical Implementation Notes
- Maintain consistent form field heights (h-12) throughout application
- All interactive elements have clear focus states
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Form validation: Inline error messages (text-red-600 text-sm) below fields
- Loading states: Skeleton screens for data-heavy pages
- Multi-column layouts collapse to single column on mobile
- Sticky positioning for form preview on desktop (sticky top-20)
- Gradient backgrounds receive backdrop blur treatments for overlay content