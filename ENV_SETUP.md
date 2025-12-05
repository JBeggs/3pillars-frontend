# Environment Configuration Setup

This guide explains how to configure the 3piller React app using `.env` files.

## Setup

### 1. Create .env File

Copy the example file:
```bash
cp .env.example .env
```

### 2. Configure .env File

Edit `.env` with your actual values:

```env
# Django CRM Backend API Configuration
VITE_API_BASE_URL=http://192.168.1.100:8000

# Development server port
VITE_PORT=3000

# Development server host (0.0.0.0 allows network access)
VITE_HOST=0.0.0.0

# Debug mode (true/false)
VITE_DEBUG=true
```

## Environment Variables

### Required

- `VITE_API_BASE_URL` - Base URL of your Django backend (without `/api` suffix)
  - Examples:
    - Local network: `http://192.168.1.100:8000`
    - Localhost: `http://localhost:8000`
    - Production: `https://yourdomain.com`

### Optional

- `VITE_PORT` - Development server port (default: 3000)
- `VITE_HOST` - Development server host (default: 0.0.0.0)
  - `0.0.0.0` allows access from network (e.g., `http://192.168.1.100:3000`)
  - `localhost` or `127.0.0.1` for local-only access
- `VITE_DEBUG` - Enable debug mode (default: true)

## How It Works

Vite automatically loads `.env` files. Variables prefixed with `VITE_` are exposed to your code via `import.meta.env`.

### Accessing Environment Variables

```javascript
// In your code
const apiUrl = import.meta.env.VITE_API_BASE_URL
const isDebug = import.meta.env.VITE_DEBUG === 'true'
```

## Current Configuration

The app is configured to:
- **Backend API**: `http://192.168.1.100:8000/api` (from `.env`)
- **Frontend URL**: `http://192.168.1.100:3000` (accessible from network)
- **Proxy**: Vite proxy forwards `/api/*` requests to backend

## Usage

### Development

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Access the app**:
   - Local: `http://localhost:3000`
   - Network: `http://192.168.1.100:3000`

3. **API requests** are automatically proxied:
   - Frontend: `http://192.168.1.100:3000/api/auth/login/`
   - Proxied to: `http://192.168.1.100:8000/api/auth/login/`

### Production

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Environment variables** are embedded at build time
3. **Update `.env`** before building for production

## Configuration Priority

The app uses the following priority order:

1. **.env file** (`VITE_API_BASE_URL`) - Highest priority
2. **Default values** - Fallback if not set

## Example Configurations

### Local Development (Same Machine)
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_PORT=3000
VITE_HOST=localhost
VITE_DEBUG=true
```

### Local Network Development
```env
VITE_API_BASE_URL=http://192.168.1.100:8000
VITE_PORT=3000
VITE_HOST=0.0.0.0
VITE_DEBUG=true
```

### Production
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_DEBUG=false
```

## Security Notes

- ✅ `.env` is already in `.gitignore` - never commit it
- ✅ Use `.env.example` as a template
- ✅ For production, use secure configuration methods
- ✅ Never commit sensitive credentials
- ✅ Only variables prefixed with `VITE_` are exposed to client code

## Troubleshooting

### App can't connect to backend

1. **Check .env file exists**:
   ```bash
   ls -la .env
   ```

2. **Verify API_BASE_URL is correct**:
   - Test in browser: `http://192.168.1.100:8000/api/`
   - Should return API response or 404 (means server is running)

3. **Check network connectivity**:
   - Ensure device and backend are on same network
   - Check firewall settings

4. **Verify backend is running**:
   ```bash
   curl http://192.168.1.100:8000/api/
   ```

### Environment variables not loading

1. **Restart dev server** after changing `.env`:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Check variable names**:
   - Must start with `VITE_` prefix
   - Case-sensitive

3. **Clear Vite cache**:
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

### CORS Errors

If you see CORS errors:
1. Check Django CORS settings include your frontend URL
2. Verify `VITE_HOST` is set correctly
3. Check backend `ALLOWED_HOSTS` includes your IP

## Proxy Configuration

The Vite proxy automatically forwards API requests:

- **Request**: `http://192.168.1.100:3000/api/auth/login/`
- **Proxied to**: `http://192.168.1.100:8000/api/auth/login/`

This eliminates CORS issues during development.

## Next Steps

1. ✅ `.env` file created with backend URL
2. ✅ Configuration updated to use environment variables
3. ⏳ Start dev server: `npm run dev`
4. ⏳ Test connection to backend

