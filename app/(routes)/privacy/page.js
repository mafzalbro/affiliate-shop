import HeroSection from "@/app/components/HeroSection";

// app/privacy/page.js
const PrivacyPolicy = () => {
  return (
    <>
      <header>
      <HeroSection 
        title="Privacy Policy"
        // description="Discover amazing products and deals!"
        // link={{ href: "/products", text: "Shop Now" }}
        className="py-10"
      />
      </header>
      <div className="p-6 h-[69vh]">
        <h2 className="text-xl font-semibold">Introduction</h2>
        <p>Welcome to MySite. We value your privacy and are committed to protecting your personal information...</p>
        <h2 className="text-xl font-semibold mt-4">Information We Collect</h2>
        <p>We collect information from you when you visit our site, register an account, or make a purchase...</p>
        <h2 className="text-xl font-semibold mt-4">How We Use Your Information</h2>
        <p>We use your information to improve our services, process transactions, and communicate with you...</p>
        {/* Add more sections as needed */}
      </div>
    </>
  );
};

export default PrivacyPolicy;
