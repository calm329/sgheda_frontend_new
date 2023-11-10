import dynamic from "next/dynamic";
// React dynamic imports
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

export default function TestScan() {
    const handleScan = (data) => {
        if (data) {
            console.log("QR code scanned data: ", data);
            // add License retrieval logic here
        }
    };
    const handleError = (err) => {
        console.error(err);
    };
    return (
        <div>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
            />
            <p>Scan QR Code</p>
        </div>
    );
}
