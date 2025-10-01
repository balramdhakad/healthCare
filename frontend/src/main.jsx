import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './features/store'
import { Provider } from 'react-redux'
import App from './App'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>,
)
