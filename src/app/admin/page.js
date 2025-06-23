import Header from "./components/Header";
import SideBar from "./components/SideBar";
import AdminContent from "./components/AdminContent";
import AddAppointment from "./components/AddApponitment";
export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex w-full h-screen ">
        <SideBar />
        <AdminContent />
      </div>
      <AddAppointment />
    </div>
  );
}
