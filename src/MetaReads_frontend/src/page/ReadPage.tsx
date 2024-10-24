import { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { highlightPlugin, Trigger } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';

// Set the worker path to match the version of pdf.js installed
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

export default function ReadPage() {
    const [selectedText, setselectedText] = useState<string | undefined>()
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const zoomPluginInstance = zoomPlugin();
    useEffect(() => {
        console.log(selectedText);

    }, [selectedText])

    const highlightPluginInstance = highlightPlugin({
        trigger: Trigger.TextSelection,
        renderHighlightContent: ({ selectedText, cancel }) => (
            <div style={{ backgroundColor: 'black', padding: '5px' }}>
                <span>{selectedText}</span>
                <button onClick={cancel}>Cancel</button>
                Selected
            </div>
        ),
        renderHighlightTarget: ({ highlightAreas, toggle, selectedText }) => {
            setselectedText(selectedText);
            return (
                <div
                    style={{ position: 'absolute', background: 'transparent' }} // Set to transparent to show highlights
                    onClick={toggle}
                >
                    {/* {
                        highlightAreas.map((highlightArea, index) => (
                            <div
                                key={index}
                                style={{
                                    position: 'absolute',
                                    top: highlightArea.top,
                                    left: highlightArea.left,
                                    width: highlightArea.width,
                                    height: highlightArea.height,
                                    backgroundColor: 'rgba(255, 255, 0, 0.5)', // Highlight color
                                }}
                            >
                                <span style={{ color: 'black', zIndex: 1 }}>
                                    {selectedText}
                                </span>
                            </div>
                        ))
                    } */}
                    You can keep this for debugging or remove it
                    <span style={{ color: 'black', position: 'absolute', bottom: '0', left: '0', backgroundColor: "red" }}>test</span>
                </div>
            );
        }


    });

    const {
        jumpToNextPage,
        jumpToPreviousPage,
        CurrentPageLabel,
    } = pageNavigationPluginInstance;

    const { CurrentScale } = zoomPluginInstance;

    const [book] = useState<string>(
        "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/20000-Leagues-Under-the-Sea.pdf?alt=media&token=007762dc-f73b-439b-bd75-c993514d6866"
    );

    // Custom zoom levels
    const zoomLevels = [0.5, 1, 1.5, 2]; // Customize as needed

    // Function to handle zoom
    const handleZoom = (scale: number) => {
        zoomPluginInstance.zoomTo(scale);
    };

    // Set default zoom level to 100% when component mounts
    useEffect(() => {
        handleZoom(1); // Set the default zoom level to 100%
    }, []);

    return (
        <div className="text-white h-screen flex justify-center items-center bg-fuchsia-400">
            <div className="w-full h-full">
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <div className="flex justify-between mb-4">
                        <button onClick={jumpToPreviousPage} className="bg-gray-800 text-white p-2 rounded">
                            Previous
                        </button>
                        <div className="flex items-center">
                            {zoomLevels.map((scale) => (
                                <button
                                    key={scale}
                                    onClick={() => handleZoom(scale)}
                                    className="bg-gray-800 text-white p-2 rounded mx-1"
                                >
                                    {scale === 1 ? '100%' : `${scale * 100}%`}
                                </button>
                            ))}
                            <span className="mx-2">Current Scale: <CurrentScale /></span>
                        </div>
                        <div className="flex items-center">
                            <CurrentPageLabel>
                                {({ currentPage, numberOfPages }) => (
                                    <span>
                                        Current Page: {currentPage} of {numberOfPages}
                                    </span>
                                )}
                            </CurrentPageLabel>
                        </div>
                        <button onClick={jumpToNextPage} className="bg-gray-800 text-white p-2 rounded">
                            Next
                        </button>
                    </div>
                    <Viewer
                        fileUrl={book}
                        plugins={[pageNavigationPluginInstance, zoomPluginInstance, highlightPluginInstance]}
                    />
                </Worker>
            </div>
        </div>
    );
}
