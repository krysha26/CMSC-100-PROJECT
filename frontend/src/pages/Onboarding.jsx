import React from 'react';
import { Link } from 'react-router-dom';
import AnicoLogoWhite from '../assets/img/ANICO_icon-admin.png'; // Assuming this path is correct

const Onboarding = () => {
  return (
    <div className="onboarding-page min-h-screen bg-gray-100 font-sans antialiased">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 flex justify-between items-center px-6 py-4 bg-green-800 text-white shadow-lg">
        <div className="flex items-center">
          {/* Using the white logo for the dark header */}
          <img src={AnicoLogoWhite} alt="Anico Logo" className="h-9 mr-3" />
          {/* <span className="text-2xl font-bold tracking-wider">Anico</span> */}
        </div>
        <nav>
          <Link to="/signUp" className="px-5 py-2 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-green-800 transition-all duration-300 ease-in-out shadow-md">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-center text-white overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1568212607431-0c143c291872?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}>
          <div className="absolute inset-0 bg-black opacity-60"></div> {/* Darker overlay for better text contrast */}
          <div className="relative z-10 px-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">Grow Sustainably, Thrive Digitally with Anico</h1>
            <p className="text-xl md:text-2xl mb-10 opacity-95">Empowering farmers with modern tools and knowledge for a greener, more productive future. Join a community dedicated to sustainable agriculture.</p>
            <Link to="/signUp" className="bg-green-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-green-700 transition-colors duration-300 ease-in-out shadow-lg transform hover:scale-105">
              Get Started Today
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
               {/* Placeholder Image - Replace with a relevant image */}
              <img src="https://images.unsplash.com/photo-1563430398526-8f5211b6b277?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="About Us" className="rounded-lg shadow-xl" />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Anico is passionately committed to revolutionizing sustainable agriculture through accessible technology. We aim to provide farmers with the innovative tools, data-driven insights, and essential resources needed to significantly boost efficiency, minimize environmental impact, and achieve superior yields. Our ultimate goal is to foster a healthier planet and cultivate thriving, prosperous farming communities worldwide.
              </p>
            </div>
          </div>
        </section>

         {/* How it Works Section */}
        <section className="py-20 px-6 bg-gray-50">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-12">How Anico Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                            <span className="text-green-700 text-2xl font-bold">1</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Sign Up & Set Up</h3>
                        <p className="text-gray-600">Create your account and easily set up your farm profile on our platform.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
                         <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                            <span className="text-green-700 text-2xl font-bold">2</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Access Tools & Insights</h3>
                        <p className="text-gray-600">Utilize our smart farming tools and gain valuable data-driven insights to optimize your practices.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
                         <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                            <span className="text-green-700 text-2xl font-bold">3</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Grow & Connect</h3>
                        <p className="text-gray-600">Implement sustainable methods, increase yields, and connect with markets and other farmers.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Section - Refined */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Anico?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-md text-center">
                <div className="text-green-600 mb-4">
                  {/* Icon Placeholder - Suggestion: Use a relevant Lucide icon like 'Zap' or 'Lightbulb' */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Smart Farming</h3>
                <p className="text-gray-600">Utilize data-driven insights to optimize your farming practices for maximum efficiency and minimal waste.</p>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-md text-center">
                <div className="text-green-600 mb-4">
                   {/* Icon Placeholder - Suggestion: Use a relevant Lucide icon like 'Leaf' or 'Recycle' */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Sustainable Practices</h3>
                <p className="text-gray-600">Access resources and tools to implement environmentally friendly farming methods that protect your land and the planet.</p>
              </div>
              {/* Feature 3 */}
              <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-md text-center">
                 <div className="text-green-600 mb-4">
                   {/* Icon Placeholder - Suggestion: Use a relevant Lucide icon like 'ShoppingBag' or 'DollarSign' */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Market Access</h3>
                <p className="text-gray-600">Connect with buyers and access markets efficiently, ensuring fair prices for your sustainably grown produce.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-6 bg-green-700 text-white text-center">
          <div className="container mx-auto max-w-2xl">
             <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Farm?</h2>
             <p className="text-xl mb-10 opacity-95">Join Anico today and unlock the potential of sustainable, data-driven agriculture for a more prosperous future.</p>
             <Link to="/signUp" className="bg-white text-green-700 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-200 transition-colors duration-300 ease-in-out shadow-lg transform hover:scale-105">
               Sign Up Now
             </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 text-sm bg-white border-t border-gray-200">
        <div className="container mx-auto">
           © {new Date().getFullYear()} Anico. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
