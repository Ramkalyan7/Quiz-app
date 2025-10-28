import SideBar from "../../components/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row ">
      <SideBar />
      <div className="pt-20 w-full">{children}</div>
    </div>
  );
}
