
import "../core/assets/styles/globals.css"
import "../core/assets/styles/main.scss"
import React from "react"
import Providers from "../core/libs/context/Providers";
import NextNProgress from 'nextjs-progressbar';
import { AuthProvider } from '../core/libs/context/AuthContext';

export default function App({ Component, pageProps }) {
    return (
    <Providers>
      <AuthProvider>
       <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
          options={{ easing: 'ease', speed: 500 }}
       />
       <Component {...pageProps} />
      </AuthProvider>
    </Providers>
    )
  }




