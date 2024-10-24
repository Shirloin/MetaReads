import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { highlightPlugin, Trigger } from "@react-pdf-viewer/highlight";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import { searchPlugin } from "@react-pdf-viewer/search";
import ReactDOM from "react-dom";
import "@react-pdf-viewer/search/lib/styles/index.css";
import { Header } from "../components/PDFReader/Header";
import ShimmerButton from "../components/Form/Button/ShimmerButton";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

const ReadPage = () => {
  const [selectedText, setSelectedText] = useState<string | undefined>();
  const [pageInput, setPageInput] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  const searchPluginInstance = searchPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin({ enableShortcuts: false });

  const handleZoom = (scale: number) => {
    setZoomLevel(scale);
    zoomPluginInstance.zoomTo(scale);
  };

  useEffect(() => {
    if (isDocumentLoaded) {
      handleZoom(1);
    }
  }, [isDocumentLoaded]);

  useEffect(() => {
    console.log(selectedText);
  }, [selectedText]);

  const highlightPluginInstance = highlightPlugin({
    trigger: Trigger.TextSelection,
    renderHighlightTarget: ({ toggle, selectedText }) => {
      setSelectedText(selectedText);
      return ReactDOM.createPortal(
        <div
          style={{
            position: "fixed",
            top: 60,
            right: 20,
            zIndex: 9999,
          }}
          onClick={toggle}
        >
          <span
            style={{
              color: "black",
            }}
          >
            <ShimmerButton
              text={"Summarize"}
              onClick={() => {
                // Show Something
              }}
            />
          </span>
        </div>,
        document.body,
      );
    },
  });

  const { jumpToNextPage, jumpToPreviousPage, CurrentPageLabel, jumpToPage } =
    pageNavigationPluginInstance;
  const { ShowSearchPopover } = searchPluginInstance;
  const { EnterFullScreen } = fullScreenPluginInstance;
  const book =
    "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/20000-Leagues-Under-the-Sea.pdf?alt=media&token=007762dc-f73b-439b-bd75-c993514d6866";

  const handlePageInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    const pageNumber = parseInt(value, 10);
    setPageInput(pageNumber);
  };

  useEffect(() => {
    if (pageInput !== undefined) {
      handleJumpToPage();
    }
  }, [pageInput]);

  const handleJumpToPage = () => {
    if (pageInput && pageInput > 0) {
      jumpToPage(pageInput);
    }
  };

  return (
    <div className="flex h-screen flex-col text-white">
      <Header
        jumpToNextPage={jumpToNextPage}
        jumpToPreviousPage={jumpToPreviousPage}
        CurrentPageLabel={CurrentPageLabel}
        handlePageInputChange={handlePageInputChange}
        zoomLevel={zoomLevel}
        handleZoom={handleZoom}
        ShowSearchPopover={ShowSearchPopover}
        EnterFullScreen={EnterFullScreen}
      />
      <div className="flex-grow overflow-auto">
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <Viewer
            theme={"dark"}
            fileUrl={book}
            onDocumentLoad={() => setIsDocumentLoaded(true)}
            plugins={[
              pageNavigationPluginInstance,
              zoomPluginInstance,
              highlightPluginInstance,
              fullScreenPluginInstance,
              searchPluginInstance,
            ]}
          />
        </Worker>
      </div>
    </div>
  );
};

export default ReadPage;
