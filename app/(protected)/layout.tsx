import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex flex-row dark:bg-stone-900 max-sm:flex max-sm:justify-center ">
      <div className="basis-52 w-full max-sm:hidden *:text-left">
        <Navbar />
      </div>
      <div className="w-full max-sm:w-full max-sm:p-0 max-sm:m-1">
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
