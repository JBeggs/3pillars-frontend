# Three Pillars Web Application - Development Plan

## Overview

A modern, professional, minimal React + Tailwind web application that allows customers to interact with the business through three core pillars. Customer interactions create requests/messages in Django CRM, which are then delivered to the Flutter mobile application.

## The Three Pillars of a Successful Business

### 1. **Operations & Management** (Project & Task Management)
- **Focus**: Internal efficiency, project delivery, resource management
- **Services**: Project planning, task coordination, workflow management, resource allocation
- **Customer Interaction**: Request project management services, track project status, request resources

### 2. **Sales & Marketing** (Technical & Sales)
- **Focus**: Customer acquisition, relationship building, revenue generation
- **Services**: Sales consultation, technical support, client relations, product demonstrations, quotes
- **Customer Interaction**: Request quotes, schedule consultations, request support, inquire about products

### 3. **Product & Development** (Development)
- **Focus**: Product creation, innovation, technical solutions
- **Services**: Custom software development, web applications, API integration, system maintenance
- **Customer Interaction**: Request development services, submit project requirements, request technical solutions

## Architecture

```
Customer (Browser)
    ↓
React Web App (3piller)
    ↓ HTTP/REST API
Django CRM Backend
    ↓ Creates Request/ChatMessage
    ↓ Notifications
Flutter Mobile App (Team receives notifications)
```

## Technology Stack

### Frontend (3piller)
- **React 18+** - UI framework
- **Tailwind CSS** - Styling (modern, professional, minimal)
- **React Router** - Navigation
- **Axios/Fetch** - API communication
- **React Hook Form** - Form handling
- **Zustand/Context API** - State management (simple, no Redux needed)

### Backend Integration
- **Django REST API** - Already exists
- **Endpoints to use**:
  - `/api/auth/login/` - Authentication
  - `/api/auth/register/` - Registration (needs implementation)
  - `/api/requests/` - Create customer requests
  - `/api/chat/` - Send messages
  - `/api/companies/` - Company management
  - `/api/contacts/` - Contact management
  - `/api/deals/` - Deal creation
  - `/api/tasks/` - Task creation

## User Flows

### Flow 1: Customer Service Request
1. Customer visits website
2. Selects department (pillar)
3. Views available services
4. Fills out service request form
5. Submits → Creates `Request` in Django CRM
6. System creates `ChatMessage` for department users
7. Flutter app receives notification
8. Team member responds via Flutter app
9. Response creates `ChatMessage` back to customer (optional web notification)

### Flow 2: Customer Inquiry/Message
1. Customer wants to ask question
2. Selects department
3. Fills out contact form
4. Submits → Creates `ChatMessage` in Django CRM
5. Flutter app receives notification
6. Team responds via Flutter

### Flow 3: Project/Service Selection
1. Customer browses services
2. Selects specific service
3. Fills out detailed project requirements
4. Submits → Creates `Request` + `Deal` in Django CRM
5. Creates `Task` for project team
6. Creates `ChatMessage` notifications
7. Flutter app receives all notifications

## Features

### Landing Page
- Hero section with three pillar cards
- Modern, minimal design
- Clear call-to-action
- Responsive (mobile-first)

### Department Pages (3 separate pages)
- **Overview**: Department info, team members, services
- **Services**: List of available services with descriptions
- **Request Service**: Multi-step form for service requests
- **Contact**: Direct messaging to department
- **Project Inquiry**: Detailed project requirement forms

### Customer Portal (After submission)
- View request status
- Receive updates/messages
- Track project progress (if applicable)

### Complex Flows
- **Multi-step forms** for different service types
- **Conditional logic** based on service selection
- **File uploads** for project requirements
- **Quote requests** with detailed specifications
- **Project proposals** with timeline and budget

## Design Principles

- **Modern**: Clean, contemporary UI with smooth animations
- **Professional**: Business-appropriate styling, clear typography
- **Minimal**: No clutter, focus on essential features
- **Accessible**: WCAG compliant, keyboard navigation
- **Responsive**: Mobile-first, works on all devices
- **Fast**: Optimized performance, lazy loading

## File Structure

```
3piller/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── FormInput.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Navigation.jsx
│   │   ├── landing/
│   │   │   ├── Hero.jsx
│   │   │   └── PillarCard.jsx
│   │   └── department/
│   │       ├── ServiceList.jsx
│   │       ├── RequestForm.jsx
│   │       └── ContactForm.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Department.jsx
│   │   ├── Services.jsx
│   │   ├── Request.jsx
│   │   └── Status.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── requests.js
│   ├── store/
│   │   └── useStore.js (Zustand)
│   ├── config/
│   │   ├── api.js
│   │   └── departments.js
│   ├── utils/
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css (Tailwind imports)
├── package.json
├── tailwind.config.js
├── vite.config.js (or webpack)
└── README.md
```

## Implementation Phases

### Phase 1: Setup & Foundation
- [ ] Initialize React app (Vite)
- [ ] Setup Tailwind CSS
- [ ] Configure API service
- [ ] Setup routing
- [ ] Create base components

### Phase 2: Landing Page
- [ ] Hero section
- [ ] Three pillar cards
- [ ] Navigation
- [ ] Responsive design

### Phase 3: Department Pages
- [ ] Department overview
- [ ] Services listing
- [ ] Contact forms
- [ ] Request forms

### Phase 4: Complex Flows
- [ ] Multi-step forms
- [ ] Service-specific forms
- [ ] File uploads
- [ ] Form validation

### Phase 5: Integration
- [ ] Connect to Django API
- [ ] Test request creation
- [ ] Test message creation
- [ ] Verify Flutter notifications

### Phase 6: Polish
- [ ] Animations
- [ ] Error handling
- [ ] Loading states
- [ ] Accessibility
- [ ] Performance optimization

## Django Backend Updates Needed

1. **Registration Endpoint** (`/api/auth/register/`)
   - Create user
   - Assign to department (Group)
   - Return tokens

2. **Public Request Endpoint** (optional)
   - Allow unauthenticated requests
   - Create Request from web form
   - Auto-assign to department

3. **Notification System**
   - Ensure ChatMessage creation triggers Flutter notifications
   - Webhook or FCM integration

4. **CORS Configuration**
   - Allow React app domain
   - Configure in Django settings

## Services Configuration

Each department will have:
- **Service Name**
- **Description**
- **Category** (consultation, development, support, etc.)
- **Form Fields** (customizable per service)
- **Department Assignment** (which team handles it)

## Next Steps

1. ✅ Clear old 3piller folder
2. ✅ Organize docs folder
3. ✅ Create plan document
4. ⏭️ Initialize React + Tailwind project
5. ⏭️ Build landing page
6. ⏭️ Build department pages
7. ⏭️ Implement forms and flows
8. ⏭️ Integrate with Django API
9. ⏭️ Test end-to-end flow

