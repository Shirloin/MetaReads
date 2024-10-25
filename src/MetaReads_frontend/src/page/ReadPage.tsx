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
import { cn } from "../lib/utils";
import { CardStack } from "../components/ui/card-stack";
import { CircularProgress, Skeleton } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

const ReadPage = () => {
  const [selectedText, setSelectedText] = useState<string | undefined>();
  const [pageInput, setPageInput] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // New loading state
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



  const addNewCard = (text: string) => {
    const newCard = {
      id: cards.length + 1, // Unique ID for each card
      name: `Summarized Text - ${cards.length + 1}`,
      // designation: "AI Summarizer",
      content: <p>{text}</p>,
    };
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const summarizeText = async () => {
    setLoading(true);

    try {

      const response = await fetch('http://91.108.111.225:6468/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: selectedText
        })
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const text = data.text;

      addNewCard(text);

    } catch (error) {
      console.error('Failed to fetch summary text:', error);
    } finally {
      setLoading(false);
    }
  };

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
              text={loading ? "Summarizing..." : "Summarize"} // Change button text
              onClick={() => {
                if (selectedText && !loading) {
                  summarizeText();
                }
              }}
            />
          </span>
        </div>,
        document.body
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      {
        cards.length > 0 && (
          <>
            {
              loading == false ? (
                <div className="fixed bottom-2 right-4 flex items-center justify-center z-10">
                  <CardStack items={cards} />
                </div>
              ) : (
                <div className="fixed bottom-2 right-4 flex items-center justify-center z-10 w-[300px] h-[300px]">
                  <CircularProgress />
                </div>
              )
            }
          </>
        )
      }
    </div>
  );
};

export default ReadPage;
