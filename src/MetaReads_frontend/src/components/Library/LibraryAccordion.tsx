import { RiArrowDownSFill } from "react-icons/ri";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { BookModel } from "../Props/model";
import BookItem from "./BookItem";

interface LibraryAccordionProps {
  libraryName: string;
  selectedLibrary: string;
  bookList: BookModel[];
  onLibrarySelect: (category: string) => void;
  count: number;
  handleBookSelect: (book: BookModel) => void;
  selectedBook: BookModel | null;
  sidebarRef: React.RefObject<HTMLDivElement>
}

export default function LibraryAccordion({
  libraryName,
  selectedLibrary,
  bookList,
  onLibrarySelect,
  count,
  handleBookSelect,
  selectedBook,
  sidebarRef
}: LibraryAccordionProps) {
  const [expanded, setExpanded] = React.useState(true);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  const handleAccordionClick = () => {
    onLibrarySelect(libraryName);
  };

  const handleBookClick = (book: BookModel) => {
    handleBookSelect(book);
  };
  return (
    <div>
      <Accordion expanded={expanded} onClick={handleAccordionClick}>
        <AccordionSummary
          sx={{
            backgroundColor:
              selectedLibrary === libraryName ? "#2C3E50" : "#14181E",
            color: "white",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          className="inject-accordion"
          expandIcon={<RiArrowDownSFill onClick={handleIconClick} />}
        >
          <div className="flex flex-grow gap-2" style={{ fontSize: "5px" }}>
            <Typography>{libraryName}</Typography>
            <Typography className="text-gray-400">( {count} )</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "transparent", padding: 0 }}>
          {bookList.length > 0 ? (
            bookList.map((book, index) => (
              <BookItem
                key={index}
                book={book}
                isSelected={selectedBook?.id === book.id}
                isHovered={hoveredIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleBookClick(book)}
                sidebarRef={sidebarRef}
              />
            ))
          ) : (
            <Typography>No books available.</Typography>
          )}

        </AccordionDetails>
      </Accordion>
    </div>
  );
}
