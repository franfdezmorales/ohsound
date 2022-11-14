import { SessionProvider } from "next-auth/react"
import { AppLayout } from 'components/AppLayout'
import 'styles/globals.css'
import { RecoilRoot } from "recoil"
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SWRConfig 
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}>
      <RecoilRoot>
        <SessionProvider session={session}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </SessionProvider>
      </RecoilRoot>
    </SWRConfig>
  )
}

export default MyApp
