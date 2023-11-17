import Link from "next/link";
export default function SideBar() {
  const menus = [
    {
      name: "Dashboard",
      src: "/admin/dashboard",
    },
    {
      name: "Product",
      src: "/admin/editProducts",
    },
    {
      name: "Member",
      src: "/admin/editMember",
    },
    {
      name: "Contact Us",
      src: "/admin/contactUs",
    },
    {
      name: "HomePage",
      src: "/",
    },
  ];
  return (
    <>
      <div className=" bg-emerald-200 h-full">
        <div className="flex bg-slate-800 text-slate-50 h-full w-full items-center justify-between">
          <div className="h-full w-3/12 flex justify-center">
            <Link href="/admin" className="w-3/12 h-full mx-10 flex items-center">
              {" "}
              <img
                className="h-1/2 w-full"
                src="https://assets.eflorist.com/site/EF-12198/Logo/Plant-Palace_Primary-Logo.png"
                alt=""
              />
            </Link>
          </div>
          <div className="w-5/12 h-full mr-40 flex items-center">
            {menus.map((menu, index) => (
              <Link
                key={index}
                className="h-1/2 w-4/12 hover:text-emerald-400 bg-slate-800 text-center flex items-center"
                href={menu.src}
              >
                {menu.name}{" "}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
