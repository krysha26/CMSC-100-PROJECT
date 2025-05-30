import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Users, Shield, TrendingUp, Leaf, Heart, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnicoMainIcon from '../assets/img/anico-main-icon.png';

const TypingText = ({ phrases, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting && currentIndex < currentPhrase.length) {
      // Typing
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + currentPhrase[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 250);

      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentIndex === currentPhrase.length) {
      // Pause at the end of typing
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1500); // Pause for 1.5 seconds before starting to delete

      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex > 0) {
      // Deleting
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      }, 75); // Faster deletion speed

      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex === 0) {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex(prev => (prev + 1) % phrases.length);
    }
  }, [currentIndex, isDeleting, phraseIndex, phrases]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const AnicoOnboarding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const missionSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMission = () => {
    missionSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 p-1 rounded-sm flex items-center justify-center bg-white-200 shadow-lg overflow-hidden">
                <img src={AnicoMainIcon} alt="ANICO" className="w-full h-full object-contain" />
              </div>
              <span className={`text-2xl font-bold transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>ANICO</span>
            </div>
            <Link to="/signUp" className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
              isScrolled 
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                : 'border-2 border-white text-white hover:bg-white hover:text-green-800'
            }`}>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center opacity-20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-green-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mt-60 text-white flex items-center justify-center gap-4">
            <span>Ani ko.</span>
            <TypingText 
              phrases={["Buhay mo.", "Kinabukasan mo.", "Para sa'yo."]}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
            />
          </h1>
          
          <p className="text-lg md:text-lg text-green-100 mb-40 max-w-5xl mx-auto leading-relaxed">
            "Isang hakbang tungo sa mas masustansya, mas makatarungan, at mas makabagong agrikultura."
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/signUp" className="group bg-white text-green-800 px-10 py-4 rounded-full text-lg font-bold hover:bg-yellow-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
              Simulan Ngayon
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={scrollToMission}
              className="border-2 border-white/70 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Alamin Pa
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-green-100/80">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">DA Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">10,000+ Miyembro</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-sm">5/5 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionSectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                 Ang Aming Misyon
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Pagkakaisa ng Agrikultura at Teknolohiya
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Isulong ang direktang koneksyon ng mga Pilipinong magsasaka at mamimili sa pamamagitan ng teknolohiya—upang mapababa ang presyo, madagdagan ang kita ng mga magsasaka, at mapalapit muli ang loob ng bawat Pilipino sa sariling ani.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-orange-500 rounded-3xl opacity-20 blur-xl"></div>
              <div className="flex flex-row gap-4 relative rounded-3xl">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1664527305901-a3c8bec62850?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlfGVufDB8fDB8fHww" 
                  alt="Filipino farmers" 
                  className="relative rounded-3xl shadow-2xl w-1/3 h-96 object-cover transform hover:scale-102 transition-transform duration-300"
                />
                <img 
                  src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMHJhd3xlbnwwfHwwfHx8MA%3D%3D" 
                  alt="Filipino farmers" 
                  className="relative rounded-3xl shadow-2xl w-1/3 h-96 object-cover transform hover:scale-103 transition-transform duration-300"
                />
                <img 
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJ1aXRzfGVufDB8fDB8fHww" 
                  alt="Filipino farmers" 
                  className="relative rounded-3xl shadow-2xl w-1/3 h-96 object-cover transform hover:scale-103 transition-transform duration-300"
                />
                <img 
                  src="https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdnc3xlbnwwfHwwfHx8MA%3D%3D" 
                  alt="Filipino farmers" 
                  className="relative rounded-3xl shadow-2xl w-1/3 h-96 object-cover transform hover:scale-103 transition-transform duration-300"
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Direksyon
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simpleng Proseso, Malaking Epekto
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sa tatlong hakbang lang, makakaugnayan mo na ang mga magsasaka at makakakuha ng pinakamasustansyang ani.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShoppingCart className="w-8 h-8" />,
                title: "Mamili",
                description: "Tuklasin ang sariwang ani mula sa mga rehistradong magsasaka. Piliin, idagdag sa cart, at ihanda para sa pag-checkout."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Direktang Transaksyon",
                description: "Walang middleman. Ang bayad mo ay direkta sa produktong ani ng magsasaka. COD? Walang problema."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "DA Assurance",
                description: "Sa tulong ng Department of Agriculture, may tiyak na pamamahala sa bawat produkto, order, at benta."
              }
            ].map((step, index) => (
              <div key={index} className="group relative">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Bakit Anico?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Makabagong Paraan, Makalumang Diwa
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Direkta sa Pinagmulan",
                description: "Walang patong, walang daya—mas murang presyo para sa'yo, mas mataas na kita para sa kanila.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Lokal ang Lakas",
                description: "Suportahan ang sariling atin. Mula sa palayan, bukirin, at kabukiran, diretso sa tahanan mo.",
                color: "from-red-500 to-red-600"
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Sistemang May Puso",
                description: "Pinag-isipang mabuti para sa kapakanan ng magsasaka at mamimili. May seguridad, transparency, at malasakit.",
                color: "from-green-500 to-green-600"
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Pinamamahalaan ng DA",
                description: "Mapagkakatiwalaang pamahalaan para sa maayos at sistematikong pamamalakad.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: <Leaf className="w-6 h-6" />,
                title: "Sustainable Agriculture",
                description: "Gamit ang modernong teknolohiya para maipagpatuloy ang sinaunang ugnayan ng tao at lupa.",
                color: "from-emerald-500 to-emerald-600"
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Community Driven",
                description: "Hindi lang ito app. Isa itong kilusan para sa mas maayos na kinabukasan ng agrikultura.",
                color: "from-orange-500 to-orange-600"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-white p-8 rounded-3xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-24 bg-gradient-to-r from-green-800 via-green-700 to-green-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block px-6 py-3 bg-yellow-400/20 backdrop-blur-sm rounded-full text-yellow-100 text-sm font-semibold mb-8">
            Ang Aming Bisyon
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Isang Mas Masaganang Pilipinas
          </h2>
          <p className="text-md md:text-xl text-green-100 mb-12 leading-relaxed">
            Isang makabagong Pilipinas kung saan bawat mesa ay may masustansyang pagkaing galing direkta sa ating mga magsasaka—makatarungan, makabayan, at makakalikasan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signUp" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-10 py-4 rounded-full text-lg font-bold hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 shadow-2xl transform hover:scale-105">
              Makisali sa Kilusan
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Magsimula. Makisali. Magkaisa.
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Sa bawat pindot, binibigyan mo ng pag-asa ang isang magsasaka. 
            Sa bawat order, binibigyan mo ng direksyon ang kinabukasan ng agrikultura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/signUp" className="bg-gradient-to-r from-green-600 to-green-700 text-white px-12 py-4 rounded-full text-lg font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-xl transform hover:scale-105">
              Magsimula Bilang Mamimili
            </Link>
            <Link to="/signIn" className="border-2 border-green-600 text-green-600 px-12 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-300">
              DA Admin
            </Link>
          </div>
          
          {/* Security Notice */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-900">Seguridad Mo, Prioridad Namin</h3>
            </div>
            <p className="text-green-600 leading-relaxed">
              Protektado ang account mo gamit ang email-based login. Limitado ang access base sa role mo bilang customer o admin. 
              Transparent ang bawat transaksyon. Lahat ay dokumentado at maayos na mino-monitor.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-7 h-7 p-1 rounded-sm flex items-center justify-center overflow-hidden">
                  <img src={AnicoMainIcon} alt="ANICO" className="w-full h-full object-contain" />
                </div>
                <span className="text-3xl font-bold">ANICO</span>
              </div>
              <p className="text-white/50 text-md leading-relaxed mb-6">
                Ang Kinabukasan ay Inaani Ngayon. Panahon na para ibalik ang halaga sa tunay na nagbubungkal ng lupa.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Para sa Magsasaka</h4>
              <ul className="space-y-2 text-white/50">
                <li>Magpalista ng Produkto</li>
                <li>Order Management</li>
                <li>Sales Reports</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Para sa Mamimili</h4>
              <ul className="space-y-2 text-white/50">
                <li>Browse Products</li>
                <li>COD Payment</li>
                <li>Order Tracking</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/50 text-sm">
                © {new Date().getFullYear()} ANICO. Lahat ng karapatan ay nakalaan.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-white/50 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-white/50 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-white/50 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnicoOnboarding;