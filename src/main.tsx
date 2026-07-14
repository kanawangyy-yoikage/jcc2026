import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { initPerfMode } from './lib/perf';
import App from './App.tsx';

initPerfMode();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
