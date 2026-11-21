// src/config/api.js
// Central API base URL configuration for MyDesk client.
// In production (e.g. Vercel), set VITE_API_URL to your Render backend URL (e.g. https://mydesk-backend.onrender.com).
// In development, falls back to http://localhost:5000.

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Remove any trailing slash to avoid double-slash endpoints (e.g. https://domain.com/ -> https://domain.com)
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

export default API_BASE_URL;
