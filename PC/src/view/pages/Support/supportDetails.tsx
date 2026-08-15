
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { i18n } from "../../../i18n";

function HelpCenterDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Updated FAQ data with new entries
  const faqData = [
    {
      id: "1",
      question: i18n("pages.helpCenter.faq.aboutAccounts"),
      answer: i18n("pages.helpCenterDetail.answers.aboutAccounts")
    },
    {
      id: "2",
      question: i18n("pages.helpCenter.faq.transactionVolume"),
      answer: i18n("pages.helpCenterDetail.answers.transactionVolume")
    },
    {
      id: "3",
      question: i18n("pages.helpCenter.faq.transferFunds"),
      answer: i18n("pages.helpCenterDetail.answers.transferFunds")
    },
    {
      id: "4",
      question: i18n("pages.helpCenter.faq.whatAreFutures"),
      answer: i18n("pages.helpCenterDetail.answers.whatAreFutures")
    },
    {
      id: "5",
      question: i18n("pages.helpCenter.faq.convertedAmountChanges"),
      answer: i18n("pages.helpCenterDetail.answers.convertedAmountChanges")
    },
    {
      id: "6",
      question: i18n("pages.helpCenter.faq.realNameAuthentication"),
      answer: i18n("pages.helpCenterDetail.answers.realNameAuthentication")
    },
    {
      id: "7",
      question: i18n("pages.helpCenter.faq.frozenAssets"),
      answer: i18n("pages.helpCenterDetail.answers.frozenAssets")
    },
    {
      id: "8",
      question: i18n("pages.helpCenter.faq.futuresTradingRules"),
      answer: i18n("pages.helpCenterDetail.answers.futuresTradingRules")
    },
    {
      id: "9",
      question: i18n("pages.helpCenterDetail.questions.aiQuantification"),
      answer: i18n("pages.helpCenterDetail.answers.aiQuantification")
    },
    {
      id: "10",
      question: i18n("pages.helpCenterDetail.questions.exploreNFTs"),
      answer: i18n("pages.helpCenterDetail.answers.exploreNFTs")
    },
    {
      id: "11",
      question: i18n("pages.helpCenterDetail.questions.bitcoinEnergy"),
      answer: i18n("pages.helpCenterDetail.answers.bitcoinEnergy")
    },
    {
      id: "12",
      question: i18n("pages.helpCenterDetail.questions.bitcoinRecordPrice"),
      answer: i18n("pages.helpCenterDetail.answers.bitcoinRecordPrice")
    },
    {
      id: "13",
      question: i18n("pages.helpCenterDetail.questions.trumpStatueBitcoin"),
      answer: i18n("pages.helpCenterDetail.answers.trumpStatueBitcoin")
    }
  ];

  useEffect(() => {
    // Find the FAQ item by id
    const faqItem = faqData.find(item => item.id === id);
    
    if (faqItem) {
      setQuestion(faqItem.question);
      setAnswer(faqItem.answer);
    } else {
      // If no FAQ found, redirect back to help center
      // In a real app, you would use: navigate('/support');
      console.log(i18n("pages.helpCenterDetail.faqNotFound"));
    }
  }, [id]);

  return (
    <div className="helpcenterdetail-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/support" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.helpCenter.title")}</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="helpcenterdetail-content">
          {question && (
            <>
              <div className="question-title">{question}</div>
              <div className="divider-line"></div>
              <div className="answer-content">{answer}</div>
            </>
          )}
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

        .helpcenterdetail-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Profile Page */
        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          position: relative;
          padding: 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
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

        /* Content Card - Matching Profile Page */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 20px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .helpcenterdetail-content {
          width: 100%;
        }

        .question-title {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          line-height: 1.4;
          margin-bottom: 16px;
          padding-bottom: 12px;
          white-space: pre-line;
        }

        .divider-line {
          height: 1px;
          background-color: #e7eaee;
          margin-bottom: 16px;
          width: 100%;
        }

        .answer-content {
          font-size: 13px;
          color: #555;
          line-height: 1.6;
          white-space: pre-line;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .helpcenterdetail-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 16px;
            border-radius: 30px 30px 0 0;
          }

          .question-title {
            font-size: 15px;
            margin-bottom: 12px;
            padding-bottom: 10px;
          }

          .answer-content {
            font-size: 13px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .helpcenterdetail-content {
            max-width: 600px;
            margin: 0 auto;
          }

          .question-title {
            font-size: 17px;
          }

          .answer-content {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}

export default HelpCenterDetail;
