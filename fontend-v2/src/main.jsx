import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import '@ant-design/v5-patch-for-react-19';

// libraries
import store from './redux/store';
import ThemeProviderWrapper from './components/common/ThemeProviderWrapper.jsx'
import { loadSavedTheme } from './utils/themeLoader.js'
import { initTheme } from './redux/slices/themeSlice.js'

const savedTheme = loadSavedTheme();
store.dispatch(initTheme(savedTheme));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProviderWrapper>
      <App />
      </ThemeProviderWrapper>
    </Provider>
  </StrictMode>,
)
