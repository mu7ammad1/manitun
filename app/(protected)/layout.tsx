import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex flex-row dark:bg-neutral-900 max-sm:flex max-sm:justify-center ">
      <div className="basis-52 max-sm:hidden *:text-left">
        <Navbar />
      </div>
      <div className="basis-96 max-sm:w-full max-sm:p-0 max-sm:m-0">
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
