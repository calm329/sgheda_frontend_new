export const SectionContainer = ({
    id,
    children,
    className = "",
    style = ""
}) => {
    return (
        <section
            id={id}
            className={`${className && className}`}
            style={{ ...style }}
        >
            {children}
        </section>
    );
};
