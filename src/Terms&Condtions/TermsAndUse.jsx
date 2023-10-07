import React from "react";
import "./Privacy.css";
import MetaData from "../component/layouts/MataData/MataData";
const TermsAndConditions = () => {
  return (
    <div className="privacy-policy-container">
      <MetaData title="Terms And Conditions" />
      <div className="container___">
        <h1>Terms and Conditions</h1>
        <p>
          Thank you for shopping with us! We really appreciate your business and
          your interest in our products. We want to make sure you have a good
          experience purchasing from our webstore, CricketWeapon.com.
        </p>
        <h2>Acceptance of These Terms</h2>
        <p>
          All product descriptions on our website are subject to change at any
          time without notice, at our sole discretion. We reserve the right to
          change or discontinue a product at any time. We have made every effort
          to display the colors and images of the products as accurately as
          possible. However, we cannot guarantee that your device’s display of
          any color will be accurate and a true reflection of the physical item
          upon receipt.
        </p>
        <h2>Dispute Resolution and Applicable Law</h2>
        <p>
          This Agreement is to be governed by and construed in accordance with
          all applicable laws in force in Singapore from time to time. The
          Parties agree that any and all disputes, controversies, or conflicts
          arising from or in relation to this Agreement, including disputes on
          its existence, validity, conclusion, binding effect, breach,
          amendment, expiration, and termination, shall be referred to and
          finally resolved by arbitration in Africa administered by the
          Singapore International Arbitration Centre (“SIAC”) in accordance with
          the Arbitration Rules of the SIAC for the time being in force. The
          seat of the arbitration shall be Singapore. The tribunal shall consist
          of one (1) arbitrator, to be appointed by the President of the Court
          of Arbitration of the SIAC. The language of the arbitration shall be
          English.
        </p>
        <h2>Indemnification</h2>
        <p>
          To the fullest extent permitted by applicable law, you agree to
          indemnify and hold CricketWeapon harmless from and against any and all
          claims, costs, proceedings, demands, losses, defense costs (including,
          without limitation, reasonable attorney’s fees and costs) of any kind
          or nature arising from or in connection with your use of our website
          or your breach of these Terms.
        </p>
        <h2>Entire Agreement</h2>
        <p>
          These Terms and Conditions of Sale constitute the entire agreement
          between the parties and supersede all prior and contemporaneous
          agreements, proposals, or representations, written or oral, concerning
          their subject matter.
        </p>
        <h2>Contact Information</h2>
        <p>
          If you have any questions about these Terms and Conditions, please
          contact us at:
        </p>
        <p style={{ fontWeight: "500" }}>CricketWeapon</p>
        <p style={{ fontWeight: "500" }}>123 Main Street, City, Country</p>
        <p style={{ fontWeight: "500" }}>
          Email:{" "}
          <span style={{ fontWeight: "400" }}>info@cricketweapon.com</span>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
