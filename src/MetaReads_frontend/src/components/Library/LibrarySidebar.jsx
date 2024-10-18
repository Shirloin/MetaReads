import React, { useState, useEffect, useRef } from "react";
import CategoryAccordion from "./CategoryAccordion";

const LibrarySidebar = ({ selectedCategory, handleCategorySelect }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("20%");
  const sidebarRef = useRef(null);
  const handleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing && sidebarRef.current) {
        const parentWidth =
          sidebarRef.current.parentElement.getBoundingClientRect().width;
        const newWidth =
          ((e.clientX - sidebarRef.current.getBoundingClientRect().left) /
            parentWidth) *
          100;

        if (newWidth >= 15 && newWidth <= 50) {
          setSidebarWidth(`${newWidth}%`);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };
    console.log("ads");

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      className="resizable-sidebar relative"
      ref={sidebarRef}
      style={{ width: `${sidebarWidth}` }}
    >
      <div
        className="max-h-[100vh] min-h-[100vh] overflow-y-auto"
        style={{ backgroundColor: "#202429" }}
      >
        <CategoryAccordion
          categoryName={"Uncategorized"}
          count={20}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <CategoryAccordion
          categoryName={"Category 1"}
          count={10}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <CategoryAccordion
          categoryName={"Category 2"}
          count={10}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <CategoryAccordion
          categoryName={"Category 3"}
          count={5}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <CategoryAccordion
          categoryName={"Category 4"}
          count={5}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <CategoryAccordion
          categoryName={"Testing"}
          count={5}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </div>
      <div
        className="resizable-handle"
        ref={handleRef}
        style={{ height: `100vh` }}
        onMouseDown={() => setIsResizing(true)}
      />
    </div>
  );
};

export default LibrarySidebar;
