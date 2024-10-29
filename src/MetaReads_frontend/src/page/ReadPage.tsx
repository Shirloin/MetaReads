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
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { MetaReads_backend } from "../../../declarations/MetaReads_backend";
import { BookModel } from "../components/Props/model";
import { Principal } from "@dfinity/principal";
import { useCookie } from "../components/Hook/Cookie/useCookie";
import { useUser } from "../lib/user_provider";
import LoginWarningModal from "../components/Modal/Warning/LoginWarningModal";
import { useModalState } from "../components/Hook/Ui/useModalState";
import { useCheckUserAuthorization } from "../components/Hook/Data/User/useCheckUserAuthorization";
import SubscriptionWarningModal from "../components/Modal/Warning/SubscriptionWarningModal";
const ReadPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { getCookie } = useCookie();
  const navigate = useNavigate();
  const { user } = useUser();
  const [detailBook, setDetailBook] = useState<BookModel | undefined>();
  const [selectedText, setSelectedText] = useState<string | undefined>();
  const [pageInput, setPageInput] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchPluginInstance = searchPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin({ enableShortcuts: false });
  const { authorize, isLoggedIn } = useCheckUserAuthorization({
    user,
    getCookie,
    detailBook,
  });

  const fetchData = async () => {
    try {
      const booksResponse: any = await MetaReads_backend.get_book(
        Principal.fromText(bookId as string),
      );
      const book = booksResponse.Ok;
      setDetailBook(book);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const onLoginWarning = () => {
    navigate("/login");
  };
  const onSubscriptionWarning = () => {
    navigate("/subscriptions");
  };

  useEffect(() => {
    fetchData();
  }, [bookId]);

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
      id: cards.length + 1,
      name: `Summarized Text - ${cards.length + 1}`,
      content: <p>{text}</p>,
    };
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const summarizeText = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://91.108.111.225:6468/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: selectedText,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await response.text();
      console.log(text);

      addNewCard(text);
    } catch (error) {
      console.error("Failed to fetch summary text:", error);
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
              text={loading ? "Summarizing..." : "Summarize"}
              onClick={() => {
                if (selectedText && !loading) {
                  summarizeText();
                }
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

  const handlePageInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    const pageNumber = parseInt(value, 10);
    setPageInput(pageNumber);
  };

  useEffect(() => {
    if (pageInput !== undefined) {
      jumpToPage(pageInput);
    }
  }, [pageInput]);
  return (
    <>
      {isLoggedIn == false ? (
        <div className="text-white">
          <LoginWarningModal
            open={true}
            handleClose={onLoginWarning}
            fetchData={() => { }}
          />
        </div>
      ) : (
        <>
          {detailBook && user ? (
            !authorize ? (
              <div className="z-[999] text-white">
                <SubscriptionWarningModal
                  open={true}
                  handleClose={onSubscriptionWarning}
                  fetchData={() => { }}
                />
              </div>
            ) : (
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
                      fileUrl={detailBook.book_url}
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
                {cards.length > 0 && (
                  <>
                    {!loading ? (
                      <div className="fixed bottom-2 right-4 z-10 flex items-center justify-center">
                        <CardStack items={cards} />
                      </div>
                    ) : (
                      <div className="fixed bottom-2 right-4 z-10 flex h-[300px] w-[300px] items-center justify-center">
                        <CircularProgress />
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          ) : (
            <>
              <div className="flex h-screen items-center justify-center">
                <CircularProgress />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ReadPage;
