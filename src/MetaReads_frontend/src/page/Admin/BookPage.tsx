import PageLayout from "../../components/Layout/PageLayout";
import BookTable from "../../components/Table/BookTable";
import { Title } from "../../components/Utility/TitleUtility";

export default function BookPage() {
  return (
    <PageLayout>
      <div className="my-6">
        <Title text={"Book Management"} />
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        <div className="w-[85%]">
          <BookTable />
        </div>
      </div>
    </PageLayout>
  );
}
