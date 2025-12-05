# Three Pillars - What I Plan to Develop

## Summary

Building a **React + Tailwind CSS** web application that serves as the customer-facing portal for the three pillars of business. Customers interact with the website, which creates requests and messages in Django CRM, triggering notifications in the Flutter mobile app.

## What Will Be Built

### 1. **Landing Page**
- Modern hero section
- Three prominent pillar cards:
  - Operations & Management (Project & Task Management)
  - Sales & Marketing (Technical & Sales)
  - Product & Development (Development)
- Clean, minimal, professional design
- Fully responsive

### 2. **Department Pages** (3 separate pages, one per pillar)
Each department page includes:
- **Overview Section**: Department description, team members, key services
- **Services Section**: Detailed list of available services with descriptions
- **Request Service Form**: Multi-step form for service requests
  - Service selection
  - Project requirements
  - Contact information
  - File uploads (for project specs, etc.)
- **Contact Form**: Direct messaging to department
- **Project Inquiry**: Detailed forms for complex projects

### 3. **Complex Flows**
- **Service Request Flow**:
  1. Select service
  2. Fill requirements
  3. Upload files (optional)
  4. Submit → Creates Request in Django
  5. Creates ChatMessage for department
  6. Flutter receives notification
  
- **Quote Request Flow**:
  1. Select service
  2. Fill specifications
  3. Budget range
  4. Timeline requirements
  5. Submit → Creates Deal + Request
  6. Creates Task for sales team
  7. Creates ChatMessage notifications

- **Project Inquiry Flow**:
  1. Select development service
  2. Project description
  3. Technical requirements
  4. Upload specifications
  5. Timeline and budget
  6. Submit → Creates Request + Deal + Task
  7. Multiple ChatMessages to different departments

### 4. **Customer Portal** (Optional - for tracking)
- View submitted requests
- Status updates
- Messages/updates from team

## Technical Implementation

### Frontend Stack
- **React 18** with functional components and hooks
- **Tailwind CSS** for styling (modern, minimal, professional)
- **React Router** for navigation
- **React Hook Form** for form handling
- **Axios** for API calls
- **Zustand** or Context API for simple state management

### Key Features
- ✅ Modern, professional, minimal design
- ✅ Fully responsive (mobile-first)
- ✅ Smooth animations and transitions
- ✅ Form validation
- ✅ File uploads
- ✅ Error handling
- ✅ Loading states
- ✅ Accessibility (WCAG compliant)

### Integration Points
- **Django API Endpoints**:
  - `/api/auth/login/` - Customer login (optional)
  - `/api/requests/` - Create service requests
  - `/api/chat/` - Send messages
  - `/api/companies/` - Create company records
  - `/api/contacts/` - Create contact records
  - `/api/deals/` - Create deals for quotes
  - `/api/tasks/` - Create tasks for projects

- **Flutter Integration**:
  - When Request is created → Flutter notification
  - When ChatMessage is created → Flutter notification
  - Team responds via Flutter → Customer sees update (if portal implemented)

## Design Approach

### Visual Style
- **Modern**: Clean lines, contemporary UI patterns
- **Professional**: Business-appropriate color scheme, typography
- **Minimal**: No clutter, focus on essential elements
- **Color Palette**: 
  - Primary: Professional blue/purple gradient
  - Accent: Complementary colors per department
  - Neutral: Grays for text and backgrounds

### User Experience
- **Clear Navigation**: Easy to find services
- **Progressive Disclosure**: Show information as needed
- **Feedback**: Clear success/error messages
- **Fast**: Optimized performance, lazy loading

## File Structure

```
3piller/
├── public/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── store/          # State management
│   ├── config/         # Configuration
│   ├── utils/          # Utilities
│   └── App.jsx         # Main app
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Development Phases

1. **Setup** - React + Tailwind initialization
2. **Landing** - Hero and pillar cards
3. **Department Pages** - Basic structure
4. **Forms** - Service request forms
5. **Integration** - Connect to Django API
6. **Complex Flows** - Multi-step forms, file uploads
7. **Polish** - Animations, error handling, optimization

## Expected Outcomes

- Customers can easily find and request services
- All requests create proper records in Django CRM
- Flutter app receives notifications for team response
- Professional, modern web presence
- Seamless customer experience

---

**Ready to build!** Starting with React + Tailwind setup.

