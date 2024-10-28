import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Modal, Button, CircularProgress } from "@mui/material";
import { MetaReads_backend } from "../../../declarations/MetaReads_backend";
import { BookModel } from "../components/Props/model";
import { Principal } from "@dfinity/principal";
import { useCookie } from "../components/Hook/Cookie/useCookie";
import { useUser } from "../lib/user_provider";
import { useCheckUserAuthorization } from "../components/Hook/Data/User/useCheckUserAuthorization";

const ReadPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { getCookie } = useCookie();
  const { user } = useUser();
  const [detailBook, setDetailBook] = useState<BookModel | undefined>();

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

  const { authorize, isLoggedIn } = useCheckUserAuthorization({
    user,
    getCookie,
    detailBook,
  });

  useEffect(() => {
    fetchData();
  }, [bookId]);

  return (
    <div className="text-white">
      {detailBook && user ? (
        !authorize ? (
          <>Change into Popup</>
        ) : (
          // <div className="flex h-[100vh] flex-col items-center justify-center">
          //   <div className="text-center text-[red]">
          //     You are not allowed to read this book
          //   </div>
          //   <div>
          //     <Link to={"/store"}>
          //       <Button>Back</Button>
          //     </Link>
          //     <Link to={"/subscriptions"}>
          //       <Button>Buy Subscription</Button>
          //     </Link>
          //   </div>
          // </div>
          // Rest of the component content
          <div className="flex h-screen flex-col text-white">
            {/* PDF Viewer and other components */}
          </div>
        )
      ) : (
        <div className="flex h-screen items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default ReadPage;
