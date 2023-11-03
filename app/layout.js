import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RecipeAI',
  description: 'RecipeAI mends recipes to fit your dietary restrictions.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link href="https://api.fontshare.com/v2/css?f[]=zodiak@401&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap" rel="stylesheet"/>
      </Head>
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
