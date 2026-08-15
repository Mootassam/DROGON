import React from 'react'

function termservice() {
  return (
    <div className="container">
  {/* Header Section */}
  <div className="header">
    <div className="header-content">
      <div className="back-button">
        <i className="fas fa-arrow-left" />
      </div>
      <div className="page-title">Terms of Service</div>
      <div className="placeholder" />
    </div>
  </div>
  {/* Content Section */}
  <div className="content">
    <div className="last-updated">Last Updated: January 15, 2024</div>
    <div className="section">
      <div className="section-title">1. Acceptance of Terms</div>
      <div className="section-content">
        <p>
          By accessing or using NUXES services, you agree to be bound by
          these Terms of Service and all terms incorporated by reference.
        </p>
      </div>
    </div>
    <div className="section">
      <div className="section-title">2. Eligibility</div>
      <div className="section-content">
        <p>
          You must be at least 18 years old to use our Services. By using
          NUXES, you represent and warrant that you meet all eligibility
          requirements.
        </p>
      </div>
    </div>
    <div className="section">
      <div className="section-title">3. Account Registration</div>
      <div className="section-content">
        <p>
          To access most features, you must create an account. You agree to:
        </p>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Maintain security of your credentials</li>
          <li>Promptly update any changes to your information</li>
          <li>
            Accept responsibility for all activities that occur under your
            account
          </li>
        </ul>
      </div>
    </div>
    <div className="section">
      <div className="section-title">4. Services Description</div>
      <div className="section-content">
        <p>
          NUXES provides a digital platform for cryptocurrency storage,
          transactions, and related services. We may modify, suspend, or
          discontinue any aspect of our Services at any time.
        </p>
      </div>
    </div>
    <div className="section">
      <div className="section-title">5. Risk Disclosure</div>
      <div className="section-content">
        <p>
          Cryptocurrency investments carry substantial risk. You acknowledge and
          agree that:
        </p>
        <ul>
          <li>The cryptocurrency market is highly volatile</li>
          <li>You are solely responsible for your investment decisions</li>
          <li>Past performance does not guarantee future results</li>
          <li>We do not provide investment advice</li>
        </ul>
      </div>
    </div>
    <div className="section">
      <div className="section-title">6. User Conduct</div>
      <div className="section-content">
        <p>
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul>
          <li>Violating any applicable law or regulation</li>
          <li>Infringing upon intellectual property rights</li>
          <li>Distributing malware or harmful code</li>
          <li>Engaging in fraudulent or deceptive practices</li>
          <li>Interfering with other users' enjoyment of the Services</li>
        </ul>
      </div>
    </div>
    <div className="section">
      <div className="section-title">7. Fees</div>
      <div className="section-content">
        <p>
          Our fee structure is available on the Fees page. We reserve the right
          to adjust fees with 30 days' notice. You are responsible for paying
          all applicable taxes.
        </p>
      </div>
    </div>
    <div className="section">
      <div className="section-title">8. Intellectual Property</div>
      <div className="section-content">
        <p>
          All content, features, and functionality of NUXES are owned by
          us or our licensors and are protected by international copyright,
          trademark, and other intellectual property laws.
        </p>
      </div>
    </div>
    <div className="section">
      <div className="section-title">9. Termination</div>
      <div className="section-content">
        <p>
          We may suspend or terminate your account at our sole discretion,
          without notice, for conduct that we believe violates these Terms or is
          harmful to other users, us, or third parties.
        </p>
      </div>
    </div>
    <div className="section">
      <div className="section-title">10. Limitation of Liability</div>
      <div className="section-content">
        <p>
          To the maximum extent permitted by law, NUXES shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues.
        </p>
      </div>
    </div>
    <div className="section">
      <div className="section-title">11. Governing Law</div>
      <div className="section-content">
        <p>
          These Terms shall be governed by the laws of the State of Delaware,
          without regard to its conflict of law provisions.
        </p>
      </div>
    </div>
    <div className="section">
      <div className="section-title">12. Changes to Terms</div>
      <div className="section-content">
        <p>
          We may modify these Terms at any time. We will provide notice of
          material changes. Your continued use of our Services constitutes
          acceptance of the modified Terms.
        </p>
      </div>
    </div>
    <div className="section">
      <div className="section-title">13. Contact Information</div>
      <div className="section-content">
        <p>For questions about these Terms, please contact us at:</p>
        <p>
          Email: Icmarkets.helpdesk01@gmail.com
          <br />
          Address: 981 OAV Street, Wilmington, DE 19801
        </p>
      </div>
    </div>
  </div>
  {/* Agreement Section */}
  <div className="agreement">
    <input type="checkbox" id="agree" className="checkbox" />
    <label htmlFor="agree" className="agreement-label">
      I have read and agree to the Terms of Service
    </label>
  </div>
  {/* Buttons */}
  <button className="button accept-button" id="acceptButton">
    ACCEPT
  </button>
  <button className="button decline-button" id="declineButton">
    DECLINE
  </button>
  {/* Footer */}
  <div className="footer">
    © 2024 NUXES. All rights reserved. | <a href="#">Privacy Policy</a>
  </div>
</div>

  )
}

export default termservice