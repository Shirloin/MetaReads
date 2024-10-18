import * as React from "react";
import PageLayout from "../components/Layout/PageLayout";
import { Title } from "../components/Utility/TitleUtility";
import LibrarySidebar from "../components/Library/LibrarySidebar";

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] =
    React.useState("Uncategorized");

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };
  return (
    <PageLayout>
      <div className="flex w-full">
        <LibrarySidebar
          selectedCategory={selectedCategory}
          handleCategorySelect={handleCategorySelect}
        />
        <div className="blurred-background flex w-full flex-col">
          <div>
            <Title text={selectedCategory} />
          </div>
        </div>
      </div>
      <script src="../../"></script>
    </PageLayout>
  );
}
