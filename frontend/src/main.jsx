import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Router'
import { Toaster } from "react-hot-toast";
import AuthProvider from './context/AuthContext';

createRoot(document.getElementById('root')).render(
    <>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
        <Toaster position="top-right" />
    </>
)
