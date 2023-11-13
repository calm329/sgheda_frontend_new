import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import jsQR from "jsqr";

// const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

export default function QRCodeScanner() {
    const [result, setResult] = useState("No result");
    const [src, setSrc] = useState(null);

    const options = {
        apiKey: process.env.NEXT_PUBLIC_BYTESCALE_API_KEY, // Get API key: https://www.bytescale.com/get-started
        maxFileCount: 1,
        mimeTypes: ["image/png"],
        showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
        styles: {
            colors: {
                primary: "#377dff"
            }
        }
    };

    const handleScan = (data) => {
        if (data) {
            setResult(data);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const imageData = new Image();
            imageData.onload = function () {
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = imageData.width;
                canvas.height = imageData.height;
                context.drawImage(
                    imageData,
                    0,
                    0,
                    imageData.width,
                    imageData.height
                );
                const imageDataCanvas = context.getImageData(
                    0,
                    0,
                    imageData.width,
                    imageData.height
                );
                const code = jsQR(
                    imageDataCanvas.data,
                    imageDataCanvas.width,
                    imageDataCanvas.height
                );
                if (code) {
                    setResult(code.data);
                }
            };
            imageData.src = event.target.result;
            setSrc(imageData.src); // Update the src state variable with the uploaded image src
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "500px" }}
            />
            <UploadDropzone
                options={options}
                onUpdate={({ uploadedFiles }) =>
                    console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"))
                }
                onComplete={(files) =>
                    alert(files.map((x) => x.fileUrl).join("\n"))
                }
                width="500px"
                height="500px"
            />
            <input
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleUpload}
            />
            <p>{result}</p>
            {src && <img src={src} alt="Uploaded QR" />}
        </div>
    );
}
