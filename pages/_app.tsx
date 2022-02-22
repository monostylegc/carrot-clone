import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

function MyApp ({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className='w-full max-w-xl mx-auto'>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default MyApp
