import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MetaReads_backend } from "../../../declarations/MetaReads_backend";
import { Principal } from "@dfinity/principal";
import { useCookie } from "../components/Hook/Cookie/useCookie";
import { useUser } from "../lib/user_provider";
import { useModalState } from "../components/Hook/Ui/useModalState";
import { useCheckUserAuthorization } from "../components/Hook/Data/User/useCheckUserAuthorization";
import LoginWarningModal from "../components/Modal/Warning/LoginWarningModal";
import { BookModel } from "../components/Props/model";
import PDFViewer from "../components/PDFReader/PDFViewer";
import { CircularProgress } from "@mui/material";

const ReadPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { getCookie } = useCookie();
  const navigate = useNavigate();
  const { user } = useUser();
  const [detailBook, setDetailBook] = useState<BookModel | undefined>();
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string | undefined>();
  const { modalState: loginState, handleClose, handleOpen } = useModalState();
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

  useEffect(() => {
    fetchData();
  }, [bookId]);

  useEffect(() => {
    if (isLoggedIn === false) {
      handleOpen();
    }
  }, [isLoggedIn]);

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
      const newCard = {
        id: cards.length + 1,
        name: `Summarized Text - ${cards.length + 1}`,
        content: <p>{text}</p>,
      };
      setCards((prevCards) => [...prevCards, newCard]);
    } catch (error) {
      console.error("Failed to fetch summary text:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoggedIn === false ? (
        <LoginWarningModal
          open={loginState.other}
          handleClose={() => navigate("/login")}
          fetchData={() => {}}
        />
      ) : (
        <>
          {detailBook && user ? (
            !authorize ? (
              <>Change into Popup</>
            ) : (
              <PDFViewer
                fileUrl={detailBook.book_url}
                onDocumentLoad={() => {}}
                cards={cards}
                setCards={setCards}
                loading={loading}
                setLoading={setLoading}
                selectedText={selectedText}
                setSelectedText={setSelectedText}
              />
            )
          ) : (
            <div className="flex h-screen items-center justify-center">
              <CircularProgress />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ReadPage;
