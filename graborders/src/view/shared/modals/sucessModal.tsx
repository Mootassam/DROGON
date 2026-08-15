import React, { useEffect } from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'convert' | 'staking' | 'withdraw';
  amount: string;
  coinType: string;
  primaryColor?: string; // optional theme color
}

const SuccessModalComponent: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  type,
  amount,
  coinType,
  primaryColor = '#106cf5'
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getTypeConfig = (modalType: string) => {
    const config = {
      deposit: {
        title: 'Deposit Successful!',
        message: 'Your funds have been successfully deposited to your wallet.',
        icon: 'fa-arrow-down',
        accent: primaryColor
      },
      convert: {
        title: 'Conversion Successful!',
        message: 'Your currency conversion has been completed successfully.',
        icon: 'fa-exchange-alt',
        accent: primaryColor
      },
      staking: {
        title: 'Staking Successful!',
        message: 'Your funds are now staked and earning rewards!',
        icon: 'fa-coins',
        accent: '#F3BA2F' // keep gold for staking
      },
      withdraw: {
        title: 'Withdrawal Submitted!',
        message: 'Your withdrawal request has been received and is under review.',
        icon: 'fa-arrow-up',
        accent: '#FF6838' // keep warm orange for withdraw
      }
    };
    return config[modalType as keyof typeof config] || config.deposit;
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const { title, message, icon, accent } = getTypeConfig(type);

  return (
    <>
      <style>{`
        .success-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          padding: 20px;
        }

        .success-modal-container {
          background: white;
          width: 100%;
          max-width: 420px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          animation: modalSlideIn 0.3s cubic-bezier(0.2, 0.9, 0.4, 1);
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .success-content {
          padding: 48px 24px 32px;
          text-align: center;
        }

        .success-icon {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: ${accent}15;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 24px;
          color: ${accent};
          font-size: 36px;
          border: 2px solid ${accent}30;
        }

        .success-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .success-amount {
          font-size: 32px;
          font-weight: 800;
          margin: 16px 0 8px;
          color: ${primaryColor};
          line-height: 1.2;
        }

        .coin-type {
          font-size: 16px;
          font-weight: 500;
          color: #718096;
          margin-left: 4px;
        }

        .success-message {
          color: #64748b;
          font-size: 15px;
          line-height: 1.5;
          margin-bottom: 32px;
          max-width: 280px;
          margin-left: auto;
          margin-right: auto;
        }

        .success-button {
          background: ${primaryColor};
          border: none;
          border-radius: 12px;
          padding: 14px 24px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          border: 1px solid transparent;
        }

        .success-button:hover {
          background: ${adjustBrightness(primaryColor, -10)};
          transform: translateY(-2px);
          box-shadow: 0 8px 20px ${primaryColor}40;
        }

        .success-button:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px ${primaryColor}30;
        }

        @media (max-width: 480px) {
          .success-modal-overlay {
            padding: 16px;
          }

          .success-content {
            padding: 40px 20px 28px;
          }

          .success-icon {
            width: 80px;
            height: 80px;
            font-size: 32px;
          }

          .success-title {
            font-size: 22px;
          }

          .success-amount {
            font-size: 28px;
          }
        }
      `}</style>

      <div className="success-modal-overlay" onClick={handleOverlayClick}>
        <div className="success-modal-container">
          <div className="success-content">
            <div className="success-icon">
              <i className={`fas ${icon}`}></i>
            </div>

            <div className="success-title">{title}</div>

            <div className="success-amount">
              {amount} <span className="coin-type">{coinType}</span>
            </div>

            <div className="success-message">{message}</div>

            <button className="success-button" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to darken a hex color for hover states
function adjustBrightness(hex: string, percent: number): string {
  // Remove # if present
  let cleanHex = hex.replace('#', '');
  // Convert 3-digit to 6-digit
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00FF) + percent;
  let b = (num & 0x0000FF) + percent;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export default SuccessModalComponent;