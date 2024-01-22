import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RouterManager from './routes/router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterManager />
  </React.StrictMode>,
)
