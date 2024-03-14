import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div className="h-full w-full flex flex-col gap-y-10 items-center dark:bg-neutral-900">
      <Navbar />
      {children}
    </div>
   );
}
 
export default ProtectedLayout;