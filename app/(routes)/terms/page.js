import HeroSection from "@/app/components/HeroSection";

// app/terms/page.js
const TermsOfService = () => {
  return (
    <div>
      <header>
      <HeroSection 
        title="Terms of Service"
        // description="Discover amazing products and deals!"
        // link={{ href: "/products", text: "Shop Now" }}
        className="py-10"
      />      </header>
      <div className="p-6 h-[69vh]">
        <h2 className="text-xl font-semibold">Welcome to MySite</h2>
        <p>By using our site, you agree to our terms and conditions. Please read them carefully...</p>
        <h2 className="text-xl font-semibold mt-4">User Responsibilities</h2>
        <p>As a user, you agree to comply with all applicable laws and regulations...</p>
        <h2 className="text-xl font-semibold mt-4">Limitation of Liability</h2>
        <p>We are not liable for any damages or losses that may occur from using our site...</p>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default TermsOfService;
