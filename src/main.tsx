import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import StateContextProvider from './context/StateContext.tsx'
import { MantineProvider } from '@mantine/core';
import { NextUIProvider } from '@nextui-org/react'

import App from './App.tsx'
// style
import '@mantine/core/styles.css';
import './index.css'
import './App.css'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store} >
      <StateContextProvider>
        <MantineProvider>
          <NextUIProvider>
            <App />
          </NextUIProvider>
        </MantineProvider>
      </StateContextProvider>
    </Provider>
  </BrowserRouter>
)
