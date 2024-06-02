import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import AuthProviders from './Components/Providers/AuthProviders.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
// import {
//   QueryClient,
//   QueryClientProvider,
  
// } from '@tanstack/react-query'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProviders>
   <QueryClientProvider client={queryClient}>
   <div className='lg:px-10'>
  <RouterProvider router={router} />
  </div>
  </QueryClientProvider>
   </AuthProviders>
  </React.StrictMode>,
)

