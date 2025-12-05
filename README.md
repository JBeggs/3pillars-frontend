# Three Pillars Web Application

A modern React + Tailwind web application that connects customers with the business through three core pillars: Operations & Management, Sales & Marketing, and Product & Development.

## Overview

This application allows customers to:
- Browse services by department
- Submit service requests
- Send messages to departments
- Track request status
- Request quotes and consultations

All customer interactions create requests and messages in the Django CRM, which are then delivered to the Flutter mobile application for team response.

## Technology Stack

- **React 18+** - UI framework
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Django CRM backend running
- API endpoint access

### Installation

```bash
cd 3piller
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Configuration

Update `src/config/api.js` with your Django API URL:

```javascript
export const API_BASE_URL = 'http://localhost:8000/api';
```

## Project Structure

See [PLAN.md](./PLAN.md) for detailed architecture and implementation plan.

## The Three Pillars

1. **Operations & Management** - Project and task management services
2. **Sales & Marketing** - Sales, technical support, and client relations
3. **Product & Development** - Software development and technical solutions

## Integration

This app integrates with:
- **Django CRM** - Backend API for requests, messages, deals, tasks
- **Flutter App** - Receives notifications when customers submit requests

## Documentation

- [PLAN.md](./PLAN.md) - Development plan and architecture
- [docs/](../docs/) - Additional documentation
