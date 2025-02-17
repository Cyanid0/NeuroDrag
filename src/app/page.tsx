// pages/index.tsx
import NeuroDragClient from "@/components/neuroDragClient/neuroDragClient";

const MainPage: React.FC = () => {
  return (
    <main className="flex flex-col w-screen h-screen transition duration-300 overflow-hidden">
      <NeuroDragClient />
    </main>
  );
};

export default MainPage;
