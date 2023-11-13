import "@styles/globals.scss";
import { Toaster } from "react-hot-toast";
import { PrimeReactProvider } from "primereact/api";
export default function App({ Component, pageProps }) {
    return (
        <PrimeReactProvider>
            <Component {...pageProps} />
            <Toaster />
        </PrimeReactProvider>
    );
}
