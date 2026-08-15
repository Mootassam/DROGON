import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function Playstore() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [expandedDescription, setExpandedDescription] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const history = useHistory();

  const screenshots = [
    { src: "/playsotre/3.jpg", label: "Advanced Charts" },
    { src: "/playsotre/1.jpg", label: "Fast Withdrawals" },
    { src: "/playsotre/2.png", label: "Crypto Staking" },
    { src: "/playsotre/assets.jpg", label: "Portfolio" },
    { src: "/playsotre/chat.png", label: "24/7 Support" }
  ]

  const openImage = (imageSrc) => {
    setSelectedImage(imageSrc)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }

  const handleInstallClick = () => {
    setShowDownloadModal(true)
  }

  const handleDownloadAPK = async () => {
    setIsDownloading(true)

    try {
      const apkUrl = 'https://trade-IC Markets Global.com/apk/IC Markets Global-exchange.apk'

      const link = document.createElement('a')
      link.href = apkUrl
      link.download = 'IC Markets Global-Exchange-v3.4.2.apk'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => {
        setIsDownloading(false)
        setShowDownloadModal(false)
      }, 2000)

    } catch (error) {
      console.error('Download failed:', error)
      setIsDownloading(false)
    }
  }

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="playstore-container">
      {/* Header Section - Matching HelpCenter */}
      <div className="header">
        <div className="nav-bar">
          <button onClick={goBack} className="back-arrow">
            <i className="fas fa-arrow-left" />
          </button>
          <div className="page-title">Download App</div>
        </div>
      </div>

      {/* Hero Content Section */}
      <div className="hero-content">
        <h1>Start trading anytime, anywhere</h1>
        <p className="subtitle">Keep up to date with the latest news through our app</p>
        
        <div className="phone-image-container">
          <img src="./images/phone.png" alt="lC Markets GlobalApp Preview" className="phone-image" />
        </div>
      </div>

      {/* Fixed Download Section */}
      <div className="download-section">
        <div className="download-content">
          <div className="download-title">Download the installation package</div>
          <div className="download-buttons">
            <button className="download-btn ios-btn" onClick={() => setShowDownloadModal(true)}>
              <i className="fab fa-apple"></i>
              <span>iOS</span>
            </button>
            <button className="download-btn android-btn" onClick={handleDownloadAPK}>
              <i className="fab fa-android"></i>
              <span>Android</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .playstore-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background-image: url('./images/download.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding-bottom: 120px; /* Space for fixed download section */
        }

        /* Header Section - Matching HelpCenter */
        .header {
          min-height: 60px;
          position: relative;
          padding: 10px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          font-weight: 300;
          cursor: pointer;
          padding: 5px;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Hero Content Section */
        .hero-content {
          padding: 40px 20px 30px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 140px);
        }

        .hero-content h1 {
          color: white;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 15px;
          line-height: 1.3;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          max-width: 320px;
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.95);
          font-size: 16px;
          margin-bottom: 40px;
          font-weight: 400;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
          max-width: 280px;
        }

        .phone-image-container {
          margin-top: 20px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .phone-image {
          width: 280px;
          height: auto;
          max-width: 100%;
          filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3));
        }

        /* Fixed Download Section */
        .download-section {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          padding: 20px;
          box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          max-width: 400px;
          margin: 0 auto;
          border-radius: 25px 25px 0 0;
        }

        .download-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .download-title {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin-bottom: 20px;
          text-align: center;
        }

        .download-buttons {
          display: flex;
          gap: 15px;
          width: 100%;
        }

        .download-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .ios-btn {
          background: linear-gradient(135deg, #0f0f0f 0%, #333333 100%);
          color: white;
        }

        .ios-btn:hover {
          background: linear-gradient(135deg, #333333 0%, #0f0f0f 100%);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .ios-btn:active {
          transform: translateY(-1px);
        }

        .android-btn {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          color: white;
        }

        .android-btn:hover {
          background: linear-gradient(135deg, #0a4fc4 0%, #106cf5 100%);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }

        .android-btn:active {
          transform: translateY(-1px);
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .playstore-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .hero-content {
            padding: 30px 16px;
            min-height: calc(100vh - 120px);
          }

          .hero-content h1 {
            font-size: 24px;
            max-width: 280px;
          }

          .subtitle {
            font-size: 14px;
            max-width: 240px;
          }

          .phone-image {
            width: 240px;
          }

          .download-section {
            padding: 16px;
            border-radius: 20px 20px 0 0;
          }

          .download-buttons {
            flex-direction: column;
          }

          .download-btn {
            padding: 14px;
          }
        }

        @media (min-width: 768px) {
          .playstore-container {
            max-width: 400px;
          }

          .download-section {
            max-width: 400px;
          }
        }

        @media (max-height: 700px) {
          .hero-content {
            padding: 30px 20px;
            min-height: calc(100vh - 120px);
          }
          
          .hero-content h1 {
            font-size: 24px;
            margin-bottom: 10px;
          }
          
          .subtitle {
            font-size: 14px;
            margin-bottom: 25px;
          }
          
          .phone-image {
            width: 220px;
          }
        }
      `}</style>
    </div>
  )
}

export default Playstore