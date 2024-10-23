import { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pdfjs } from "react-pdf";

// Set the worker path to match the version of pdf.js installed
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

export default function ReadPage() {
    const [book] = useState<string>(
        "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/20000-Leagues-Under-the-Sea.pdf?alt=media&token=007762dc-f73b-439b-bd75-c993514d6866"
    );

    return (
        <div className="text-white h-screen flex justify-center items-center">
            <div className="w-full h-full">
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={book} />
                </Worker>
            </div>
        </div>
    );
}
