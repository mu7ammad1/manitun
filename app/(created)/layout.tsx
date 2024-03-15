import { Toaster } from "@/components/ui/toaster";
interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const CreateLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="dark:bg-neutral-900">
      {children}
      <Toaster /> 
    </div>
  );
};

export default CreateLayout;
