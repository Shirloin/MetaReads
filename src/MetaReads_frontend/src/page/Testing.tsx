import PageLayout from "../components/Layout/PageLayout";
import TopNavbar from "../components/Navbar/TopNavbar";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FocusCards } from "../components/ui/focus-cards";

export default function Testing() {
  const cards = [
    {
      title: "Forest Adventure",
      src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
    },
    {
      title: "Valley of life",
      src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Sala behta hi jayega",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Camping is for pros",
      src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "The road not taken",
      src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "The First Rule",
      src: "https://assets.aceternity.com/the-first-rule.png",
    },
  ];
  return (
    <PageLayout>
      <div className="relative max-h-[100vh] w-full overflow-y-auto bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
        <TopNavbar />
        <FocusCards cards={cards} />
      </div>
    </PageLayout>
  );
}