import Head from "next/head";

export default function ComingSoon() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}
        >
            <Head>
                <title>Coming Soon</title>
            </Head>

            <h1 style={{ fontSize: "50px", color: "#333" }}>Coming Soon</h1>
            <p>
                We're currently working to bring you something new. Stay tuned!
            </p>
        </div>
    );
}
