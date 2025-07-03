import Header from "./components/Header";
import SideBar from "./components/SideBar";
import AdminContent from "./components/AdminContent";
import ChangeStatus from "./components/ChangeStatus";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex w-full h-screen">
        <SideBar />
        <AdminContent />
      </div>
      <ChangeStatus />
    </div>
  );
}
