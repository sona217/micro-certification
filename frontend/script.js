const { useState, useEffect } = React;

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const nfts = [
    { id: 1, title: "Python Certification", issuer: "Tech Academy", date: "2025-07-26", color: "#4CAF50" },
    { id: 2, title: "UX Design Badge", issuer: "Design School", date: "2025-06-15", color: "#2196F3" },
    { id: 3, title: "Blockchain Basics", issuer: "Crypto Institute", date: "2025-05-10", color: "#9C27B0" },
  ];

  const handleWalletConnect = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  // Function to draw on canvas
  const drawCanvas = (nft) => {
    const canvas = document.getElementById(`nft-preview-${nft.id}`);
    if (!canvas) {
      console.warn(`Canvas with id nft-preview-${nft.id} not found`);
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn(`Failed to get 2D context for canvas nft-preview-${nft.id}`);
      return;
    }
    ctx.fillStyle = nft.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(nft.title, canvas.width / 2, canvas.height / 2);
  };

  // Effect to handle font loading and canvas rendering
  useEffect(() => {
    // Ensure Orbitron font is loaded before drawing
    document.fonts.load('20px Orbitron').then(() => {
      nfts.forEach(nft => {
        drawCanvas(nft);
      });
    }).catch(err => {
      console.warn('Failed to load Orbitron font:', err);
      // Fallback: Draw canvas without waiting for font
      nfts.forEach(nft => {
        drawCanvas(nft);
      });
    });
  }, [nfts]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white font-roboto">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-br from-teal-500 to-purple-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-orbitron">Micro-Cert NFT Platform</h1>
          <p className="text-lg md:text-2xl mb-6">Earn, showcase, and trade your micro-certifications as NFTs on the blockchain!</p>
          <button className="bg-white text-teal-600 px-6 py-3 rounded-full text-lg font-medium animate-pulse hover:animate-none hover:bg-teal-100">
            Get Started
          </button>
        </div>
      </section>

      {/* Header */}
      <header className="fixed top-0 w-full bg-gradient-to-r from-teal-500 to-purple-600 text-white p-4 shadow-lg z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold font-orbitron">Micro-Cert NFT</h1>
          <nav className="space-x-4">
            <a href="#" className="text-lg md:text-xl hover:underline">Create NFT</a>
            <a href="#" className="text-lg md:text-xl hover:underline">Collection</a>
            <a href="#" className="text-lg md:text-xl hover:underline">Trade</a>
            <a href="#" className="text-lg md:text-xl hover:underline">Profile</a>
            <button
              onClick={handleWalletConnect}
              className="bg-white text-teal-600 px-4 py-2 rounded-md text-base md:text-lg font-medium hover:bg-teal-100"
            >
              {isWalletConnected ? 'Connected' : 'Connect Wallet'}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-32 p-4 flex-grow">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center font-roboto">Your Micro-Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map(nft => (
            <div
              key={nft.id}
              className="nft-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in text-gray-900 dark:text-white"
            >
              <div className="relative w-full h-64 rounded-md mb-4 overflow-hidden">
                <canvas id={`nft-preview-${nft.id}`} width="400" height="256" className="w-full h-full"></canvas>
              </div>
              <h3 className="text-lg md:text-xl font-semibold">{nft.title}</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Issuer: {nft.issuer}</p>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Date: {nft.date}</p>
              <button className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-md text-base md:text-lg font-medium hover:bg-teal-700">
                View on Blockchain
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm md:text-base">© 2025 Micro-Cert NFT Platform. All rights reserved.</p>
          <div className="space-x-4 mt-2">
            <a href="#" className="text-xs md:text-sm hover:underline">About</a>
            <a href="#" className="text-xs md:text-sm hover:underline">Contact</a>
            <a href="#" className="text-xs md:text-sm hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Mount the App to #root
ReactDOM.createRoot(document.getElementById("root")).render(<App />);