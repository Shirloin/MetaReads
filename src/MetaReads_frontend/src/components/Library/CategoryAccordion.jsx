import { RiArrowDownSFill } from "react-icons/ri";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

export default function CategoryAccordion({
  categoryName,
  selectedCategory,
  onCategorySelect,
  count,
}) {
  const [expanded, setExpanded] = React.useState(true);

  const handleIconClick = (event) => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  const handleAccordionClick = () => {
    onCategorySelect(categoryName);
  };

  return (
    <div>
      <Accordion expanded={expanded} onClick={handleAccordionClick}>
        <AccordionSummary
          sx={{
            backgroundColor:
              selectedCategory === categoryName ? "#2C3E50" : "#14181E",
            color: "white",
          }}
          className="inject-accordion"
          expandIcon={<RiArrowDownSFill onClick={handleIconClick} />}
        >
          <div className="flex flex-grow gap-2">
            <Typography>{categoryName}</Typography>
            <Typography className="text-gray-400">( {count} )</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "transparent" }}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
