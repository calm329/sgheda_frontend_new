import { Footer } from "@components/Footer";
import { Header } from "@components/Header";

export const Layout = ({ children, className = "" }) => {
    return (
        <main
            className={`main relative bg-[#111A32] overflow-hidden ${
                className && className
            }`}
        >
            <Header />
            {children}
            <Footer />
        </main>
    );
};
