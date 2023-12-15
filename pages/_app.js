import "@styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { PrimeReactProvider } from "primereact/api";
import { ToastProvider } from "react-toast-notifications";

export default function App({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <ToastProvider>
                <PrimeReactProvider>
                    <Component {...pageProps} />
                </PrimeReactProvider>
            </ToastProvider>
        </SessionProvider>
    );
}
