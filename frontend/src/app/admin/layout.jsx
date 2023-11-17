import SideBar from "./components/sidebar";
export default function AdminLayout({ children }) {
  return (
    <>
      <main>
        <div className="w-full h-28 fixed top-0 opacity[0.90]">
          <SideBar />
        </div>
        <div>
          <div className="w-full mt-36">{children}</div>
        </div>
      </main>
    </>
  );
}
