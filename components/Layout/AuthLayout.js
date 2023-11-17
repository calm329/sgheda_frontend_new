export const AuthLayout = ({ children, className = "" }) => {
    return (
        <main
            className={`main relative bg-[#111A32] overflow-hidden ${
                className && className
            }`}
        >
            {children}
        </main>
    );
};
