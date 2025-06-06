import CommentsSlider from "./components/CommentsSlider";
import { ContractSolutionsSection } from "./components/ContractSolutionsSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
      <HeroSection />
      <ContractSolutionsSection />
      <CommentsSlider />
      <FAQSection />
      <Footer />
      {/* Aquí podrías agregar otras secciones si quieres debajo */}
    </div>
  );
}
