import { Outlet } from "react-router-dom";

export default function BaseLayout() {
  return (
    <>
      <div className="font-montserrat min-h-screen w-full bg-black">
        <Outlet />
      </div>
    </>
  );
}
