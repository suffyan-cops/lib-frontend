import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.tsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
    <ToastContainer />
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <App />
    </CookiesProvider>
    </Provider>

  // </StrictMode>,
)
