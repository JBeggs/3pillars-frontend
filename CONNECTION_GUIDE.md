# Connecting 3piller Frontend to Django Backend

This guide explains how to connect the React frontend (3piller) to the Django backend.

## Current Configuration

### Backend (Django)
- **URL**: `http://192.168.1.100:8000`
- **API Base**: `http://192.168.1.100:8000/api`
- **CORS**: Configured to allow requests from `http://192.168.1.100:3000`

### Frontend (React)
- **URL**: `http://192.168.1.100:3000` (when running)
- **API Config**: Points to `http://192.168.1.100:8000/api`

## Setup Steps

### 1. Start Django Backend

```bash
cd django-crm
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py runserver 0.0.0.0:8000
```

**Important**: Use `0.0.0.0:8000` instead of just `8000` to allow network access.

### 2. Start React Frontend

```bash
cd 3piller
npm install  # If not already installed
npm run dev
```

The frontend will start on `http://localhost:3000` and be accessible at `http://192.168.1.100:3000`.

### 3. Verify Connection

1. Open browser to `http://192.168.1.100:3000`
2. Check browser console for any CORS errors
3. Test API connection by trying to login or fetch data

## Configuration Files

### Frontend API Configuration

**File**: `3piller/src/config/api.js`
```javascript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://192.168.1.100:8000/api'
```

**File**: `3piller/.env`
```env
VITE_API_BASE_URL=http://192.168.1.100:8000/api
```

### Backend CORS Configuration

**File**: `django-crm/webcrm/settings.py`
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.100:3000",
]
```

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. **Check CORS settings** in `django-crm/webcrm/settings.py`
2. **Verify backend is running** on `http://192.168.1.100:8000`
3. **Check ALLOWED_HOSTS** includes `192.168.1.100`
4. **Restart Django server** after changing CORS settings

### Connection Refused

If you get "Connection refused" errors:

1. **Verify backend is running**: Visit `http://192.168.1.100:8000/api/` in browser
2. **Check firewall**: Ensure port 8000 is not blocked
3. **Verify IP address**: Make sure `192.168.1.100` is correct for your network

### API Not Found (404)

If endpoints return 404:

1. **Check API base URL** in frontend config
2. **Verify endpoint paths** match Django URL patterns
3. **Check Django URL routing** in `django-crm/api/urls.py`

### Authentication Issues

If login fails:

1. **Check token storage**: Verify tokens are saved in localStorage
2. **Verify JWT settings**: Check `djangorestframework-simplejwt` configuration
3. **Check request headers**: Ensure `Authorization: Bearer <token>` is sent

## API Endpoints

The frontend uses these endpoints:

- **Auth**: `/api/auth/login/`, `/api/auth/register/`
- **Requests**: `/api/requests/`
- **Chat**: `/api/chat/`
- **Companies**: `/api/companies/`
- **Contacts**: `/api/contacts/`
- **Deals**: `/api/deals/`
- **Tasks**: `/api/tasks/`

## Testing the Connection

### Test 1: Check Backend is Running

```bash
curl http://192.168.1.100:8000/api/
```

Should return API response or 404 (which is fine, means server is running).

### Test 2: Check CORS Headers

```bash
curl -H "Origin: http://192.168.1.100:3000" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     http://192.168.1.100:8000/api/
```

Should return CORS headers.

### Test 3: Test from Frontend

Open browser console on `http://192.168.1.100:3000` and run:

```javascript
fetch('http://192.168.1.100:8000/api/')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

## Production Deployment

For production:

1. **Update `.env`** with production backend URL
2. **Update CORS_ALLOWED_ORIGINS** in Django settings
3. **Use HTTPS** for both frontend and backend
4. **Set proper ALLOWED_HOSTS** in Django

## Network Access

To access from other devices on the same network:

1. **Backend**: Already configured with `0.0.0.0:8000`
2. **Frontend**: Vite is configured with `host: '0.0.0.0'` in `vite.config.js`
3. **Access**: Use `http://192.168.1.100:3000` from any device on the network

