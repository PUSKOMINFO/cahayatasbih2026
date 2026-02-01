import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Programs from "@/components/Programs";
import Facilities from "@/components/Facilities";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Profile />
        <Programs />
        <Facilities />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
