
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.ts'
import './App.css'

console.log('Main.tsx is loading');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
