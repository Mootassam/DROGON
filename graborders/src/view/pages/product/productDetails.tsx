import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function productDetails() {

      const { id } = useParams();
      const [question, setQuestion] = useState("");
      const [answer, setAnswer] = useState("");


        const faqData = [
    {
      id: "1",
      question: "About official accounts and demo accounts",
      answer: "Formal accounts can use all online functions of the platform, while demo accounts can only use some of the functions of the platform to a limited extent, cannot use liquidity mining to make profits, and cannot deposit and withdraw coins. (Demo accounts can receive fixed virtual funds once on the 1st of each month)"
    },
    {
      id: "2",
      question: "What is transaction volume?",
      answer: "According to the relevant provisions of the Anti-Money Laundering Law, each transaction requires price control, and a certain transaction volume must be completed before the currency can be withdrawn, so as to prevent users from laundering money on the exchange! For example, if you deposit 10,000U, the transaction amount must reach the relevant specified amount!"
    },
    {
      id: "3",
      question: "Why transfer funds?",
      answer: "In order to ensure the independence of funds between your various accounts and facilitate your reasonable risk control, the accounts of major trading modules are divided Transfer refers to the process of converting assets between various trading accounts."
    },
    {
      id: "4",
      question: "What are Futures?",
      answer: "Futures, also known as futures, are a form of trading that spans time. Buyers and sellers sign a contract to agree to deliver a specified amount of spot goods at a specified time, price and other trading conditions. Futures are usually concentrated in futures exchanges and bought and sold with standardized contracts. The assets traded are usually commodities or financial instruments. The predetermined price that both parties agree to buy and sell an asset is called the forward price."
    },
    {
      id: "5",
      question: "Why does the converted amount in assets change?",
      answer: "The converted value in assets is the value of the digital currency currently held in USD. It changes due to the price fluctuations of digital assets, but the amount of your digital assets does not change."
    },
    {
      id: "6",
      question: "Why is real-name authentication required?",
      answer: "For the safety of your funds, we limit the association of your receiving account with the real-name information of your current account."
    },
    {
      id: "7",
      question: "What are frozen assets?",
      answer: "Frozen assets means that when you perform transactions or withdrawal operations, the process is not fully completed. The current assets are temporarily managed by the system and cannot be freely controlled by you. It does not mean that you have lost the asset or that something is abnormal with the asset. Please rest assured."
    },
    {
      id: "8",
      question: "What are the rules of futures trading?",
      answer: "Participate in transactions by estimating the next price trend (up or down) of the current trading pair. The range of the increase or decrease is not calculated during settlement, and only the income is calculated based on the result of the increase or decrease The profit percentages for settlement at different delivery times are different, and the profits will be accurately displayed in the trading interface."
    },
    {
      id: "9",
      question: "Introduction to AI Quantification",
      answer: "An AI quantitative trading robot is an automated trading system that combines artificial intelligence (AI) with quantitative trading techniques. Its primary function is to automatically buy and sell financial products and cryptocurrencies based on market data and specific trading strategies to achieve stable profits or control risks."
    },
    {
      id: "10",
      question: "Explore NFTs with AureX",
      answer: "Step into the world of NFTs with AureX, your all-in-one digital asset trading wallet. Designed for both beginners and professional traders, AureX lets you explore, buy, sell, and manage high-quality NFTs securely and efficiently.\n\nWith advanced security, real-time tracking, and seamless transactions, AureX keeps you in full control of your digital collectibles. From exclusive art pieces to limited-edition digital assets, discover the future of digital ownership — all in one place, with confidence and ease."
    },
    {
      id: "11",
      question: "Elon Musk Says Bitcoin Is Based on Energy, Which Is Impossible to Fake\n10/13/2025, 8:00:00 AM (UTC-8)",
      answer: "Tesla and Spacex CEO Elon Musk said on Oct. 14 on X that bitcoin is based on energy, contrasting it with fiat currencies that governments can inflate. His remark was in response to a Zerohedge post linking the rise in gold, silver, and bitcoin prices to currency debasement driven by government spending on the global artificial intelligence arms race. Zerohedge added that money can be printed but energy cannot. Musk agreed, writing: 'True. That is why bitcoin is based on energy: you can issue fake fiat currency, and every government in history has done so, but it is impossible to fake energy.'\n\nWhat did Elon Musk say about bitcoin and energy?\nElon Musk stated that Bitcoin is based on energy, emphasizing that while governments can print fiat currency, energy cannot be faked or created artificially.\n\nWhy did Elon Musk contrast bitcoin with fiat currencies?\nMusk highlighted that fiat currencies are prone to inflation because governments can issue more of them, while bitcoin's foundation in energy gives it a more tangible and limited value base.\n\nWhat was the context of Musk's comment about bitcoin?\nHis comment responded to a Zerohedge post suggesting that the rising prices of gold, silver, and bitcoin are linked to global government spending and currency debasement caused by the AI arms race.\n\nWhat is the main takeaway from Musk's statement?\nMusk's remark reinforces the idea that bitcoin's value is rooted in the real-world cost of energy, contrasting it with the easily manipulated nature of traditional fiat money."
    },
    {
      id: "12",
      question: "Bitcoin Touches Record Price Above $125,000\n10/4/2025, 8:00:00 AM (UTC-8)",
      answer: "Bitcoin nabbed a new high.\n\nThe leading cryptocurrency overnight touched a record, reaching all-time highs around $125,400 to top the old high-water mark, around $124,480, set in August. (It more recently traded closer to $123,000.)\n\nThe latest moves have bitcoin's total market value at about $2.45 trillion, according to CoinMarketCap, and the total value of crypto at around $4.21 trillion. Bitcoin has had a dramatic year, climbing off prices below $80,000 seen in April.\n\nWhile bitcoin bulls generally have seen the continued climb of the currency as inevitable, some have had more specific reasons for foreseeing more upside in late 2025. It has a history of posting new records in the 1,064-day window after bear-market lows, the last of which was on Nov. 21, 2022.\n\nMeanwhile, bitcoin trading volumes on crypto exchanges have been rising since a September-end drawdown. Rising volumes have tended to be good for prices.\n\nSome analysts see reasons to expect bitcoin to keep climbing. JPMorgan analysts in an Oct. 1 note suggested that the 'debasement trade'—in which both retail and institutional investors hedge their bets with gold and bitcoin—to pick up steam amid concerns ranging from heightened geopolitical uncertainty to enduringly high government debt across economies and waning U.S. dollar dominance.\n\nMore broadly, recent developments have suggested that the crypto industry is making continued progress as it seeks to claim more investor dollars and position in the world of finance—among them the launch of several new crypto ETFs and the rise in popularity of crypto treasury stocks."
    },
    {
      id: "13",
      question: "Giant Trump statue holding Bitcoin displayed outside US Capitol to mark Fed rate decision\n9/16/2025, 8:00:00 AM (UTC-8)",
      answer: "WASHINGTON (7News) — A 12-foot golden statue of President Donald Trump holding a Bitcoin was installed outside the U.S. Capitol, coinciding with the Federal Reserve's upcoming interest rate decision on Wednesday.\n\nAt 2 p.m., the Fed announced that it reduced its key interest rate by a quarter-point, marking the first cut since Dec. 2024. The cut will lower the short-term rate to about 4.1% down from 4.3%. Last year, the central bank lowered rates three times due to concerns that job growth was slowing and unemployment was rising.\n\nThe central bank also revealed plans for two more rate cuts this year. However, only one is anticipated in 2026, which might disappoint Wall Street, as they had expected five cuts by next year.\n\nThe temporary piece, located on 3rd Street from 9 a.m. to 4 p.m., was funded by a collective of cryptocurrency investors. Organizers said the piece is intended to provoke debate about the future of digital currency, monetary policy, and the federal government's role in financial markets."
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
        console.log("FAQ item not found, redirect needed");
      }
    }, [id]);


  return (
     <div className="helpcenterdetail-container">
       {/* Header Section - Matching Profile Page */}
       <div className="header">
         <div className="nav-bar">
           <Link to="/" className="back-arrow">
             <i className="fas fa-arrow-left" />
           </Link>
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
           max-width: 400px;
           margin: 0 auto;
           position: relative;
           min-height: 100vh;
           background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
         }
 
         /* Header Section - Matching Profile Page */
         .header {
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
  )
}

export default productDetails