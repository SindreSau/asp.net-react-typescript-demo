# Game Library App

A modern game library application that lets users browse, search, and manage game information with a React front end and ASP.NET Core backend.

## Technology Stack

- **Frontend**: React, TypeScript, Axios
- **Backend**: ASP.NET Core

---

### Project Structure

```plaintext
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── components
│   │   ├── MainLayout.tsx
│   │   └── games
│   ├── config
│   │   └── api.ts // API configuration, timeout and baseURL
│   ├── index.tsx
│   ├── pages
│   │   ├── About.tsx
│   │   ├── Axios.tsx
│   │   └── Home.tsx
│   ├── react-app-env.d.ts
│   ├── services
│   │   ├── axios.ts // Axios instance and setup
│   │   └── gameService.ts // Game service with api calls
│   └── types
│       └── game.ts
└── tsconfig.json
```

## API Integration
### Why Axios?
We use Axios over the native Fetch API for multiple reasons:

- Automatic JSON Transformation: Axios provides JSON data automatically, eliminating the need for .json() calls.
- Better Error Handling: It rejects requests with 4xx/5xx status codes and includes detailed error information.
- Interceptors: Enables global request/response handling, centralized error handling, and auth token management.
- Simplified API Calls: Cleaner syntax and centralized configurations.

### API Configuration
A centralized API configuration keeps the code clean and consistent:

```typescript
// src/config/api.ts
export const API_CONFIG = {
baseURL: process.env.REACT_APP_API_URL,
timeout: 5000,
};
```

### Service Layer
API calls are organized within service modules for easy maintenance:

```typescript

// src/services/gameService.ts
import axios from './axios';
import { Game } from '../types/game';

export const gameService = {
getAll: async () => {
const { data } = await axios.get<Game[]>('/game');
return data;
},

    search: async (query: string) => {
        const { data } = await axios.get<Game[]>('/game/search', {
            params: { name: query }
        });
        return data;
    }
};
```

## ASP.NET Core Integration
### CORS Configuration
Your ASP.NET Core backend needs this CORS setup to allow requests from the React frontend:

```csharp

// Program.cs
builder.Services.AddCors(options =>
{
options.AddPolicy("AllowReactApp",
builder => builder
.WithOrigins("http://localhost:3000")
.AllowAnyHeader()
.AllowAnyMethod()
);
});

app.UseCors("AllowReactApp");
```

## Environment Setup
Use different API URLs for different environments:

```env

# .env.development
REACT_APP_API_URL=https://localhost:7080/api

# .env.production
REACT_APP_API_URL=https://api.yoursite.com/api
```

## Features
- ✅ Game listing
- ✅ Search functionality
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ URL-based search parameters
- ✅ TypeScript type safety


## Component Usage
### GameList Example
The following example component displays a list of games:

```typescript

import { useEffect, useState } from 'react';
import { gameService } from '../services/gameService';
import { Game } from '../types/game';

const GameList = () => {
const [games, setGames] = useState<Game[]>([]);
const [loading, setLoading] = useState(true);

    useEffect(() => {
        gameService.getAll()
            .then(data => {
                setGames(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch games:', error);
                setLoading(false);
            });
    }, []);

    // Component JSX...
};
```