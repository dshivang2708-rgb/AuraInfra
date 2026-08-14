import PageNavbar from "../components/PageNavbar.jsx";
import Seo from "../components/Seo.jsx";
import LegalPageLayout, { LegalSection } from "../components/legal/LegalPageLayout.jsx";

const EFFECTIVE_DATE = "1 January 2026";

export default function TermsConditions() {
  return (
    <>
      <PageNavbar />
      <main>
        <Seo
          title="Terms & Conditions"
          description="Terms & Conditions for using the Aura Infra website and real estate consulting, sales and brokerage services."
          path="/terms-and-conditions"
        />
        <LegalPageLayout title="Terms & Conditions" effectiveDate={EFFECTIVE_DATE}>
          <LegalSection heading="1. About Aura Infra">
            <p>
              Aura Infra ("Aura Infra", "we", "us", "our") is a real estate consulting, marketing and
              sales firm. We are not a builder, developer, or construction company. We do not own,
              develop, or construct any of the residential, commercial, agricultural, or premium
              projects listed on this website. Our role is to advise, market, and connect prospective
              buyers, investors, and tenants with property owners, developers, and promoters, and to
              facilitate transactions on a brokerage / commission basis.
            </p>
            <p>
              By accessing or using this website (aurainfra.co.in) or any of our services, you agree to
              be bound by these Terms & Conditions. If you do not agree with any part of these terms,
              please do not use our website or services.
            </p>
          </LegalSection>

          <LegalSection heading="2. Nature of Our Services">
            <p>
              Aura Infra provides property consulting, marketing, site visits, documentation
              assistance, and deal facilitation services, in exchange for brokerage or a service fee as
              agreed with the respective client, developer, or seller. We act as an intermediary and do
              not guarantee, warrant, or take responsibility for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The construction quality, timeline, or delivery of any project by its developer</li>
              <li>Title, ownership, or legal status of any property listed or referred through us</li>
              <li>RERA registration status, approvals, or statutory compliance of a specific project</li>
              <li>Pricing, offers, or representations made directly by developers, owners, or sellers</li>
            </ul>
            <p>
              Buyers and investors are strongly advised to independently verify project details, RERA
              registration, land title, approvals, and developer credentials before making any payment
              or entering into an agreement.
            </p>
          </LegalSection>

          <LegalSection heading="3. Website Content & Listings">
            <p>
              Property listings, images, pricing, floor plans, and project details displayed on this
              website are provided for general information purposes and are sourced from developers,
              owners, or publicly available information. While we make reasonable efforts to keep this
              information accurate and up to date, prices, availability, specifications, and project
              status may change without notice. Aura Infra does not guarantee the completeness or
              accuracy of third-party project information and is not liable for any loss arising from
              reliance on it.
            </p>
          </LegalSection>

          <LegalSection heading="4. Brokerage & Fees">
            <p>
              Where Aura Infra facilitates a sale, purchase, lease, or investment transaction, a
              brokerage or service fee may be payable by one or more parties to the transaction, as
              mutually agreed in writing prior to the transaction. Any brokerage or commission
              arrangement is separate from, and does not affect, the underlying agreement between the
              buyer and the developer/seller.
            </p>
          </LegalSection>

          <LegalSection heading="5. User Responsibilities">
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate and current information when submitting enquiry, contact, or newsletter forms</li>
              <li>Use this website only for lawful purposes</li>
              <li>Not misuse, copy, or redistribute website content, images, or listings without permission</li>
              <li>Independently verify all property, legal, and financial details before making any commitment</li>
            </ul>
          </LegalSection>

          <LegalSection heading="6. Intellectual Property">
            <p>
              All content on this website — including text, graphics, logos, and design — is the
              property of Aura Infra or its respective licensors/developer partners, unless otherwise
              stated, and may not be reproduced or used without prior written consent.
            </p>
          </LegalSection>

          <LegalSection heading="7. Third-Party Links">
            <p>
              Our website or communications may contain links to third-party developer websites, maps,
              or payment portals. Aura Infra is not responsible for the content, accuracy, or privacy
              practices of any third-party site.
            </p>
          </LegalSection>

          <LegalSection heading="8. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, Aura Infra, its directors, and employees shall not
              be liable for any direct, indirect, incidental, or consequential loss or damage arising
              from your use of this website, reliance on listed information, or any transaction
              facilitated with a third-party developer or seller.
            </p>
          </LegalSection>

          <LegalSection heading="9. Governing Law & Jurisdiction">
            <p>
              These Terms & Conditions are governed by the laws of India. Any disputes arising out of or
              in connection with these terms or our services shall be subject to the exclusive
              jurisdiction of the courts at Mohali, Punjab, India.
            </p>
          </LegalSection>

          <LegalSection heading="10. Changes to These Terms">
            <p>
              We may update these Terms & Conditions from time to time. Any changes will be posted on
              this page with a revised "Last updated" date. Continued use of the website after changes
              are posted constitutes acceptance of the updated terms.
            </p>
          </LegalSection>

          <LegalSection heading="11. Contact Us">
            <p>
              For any questions about these Terms & Conditions, please contact us at{" "}
              <a href="mailto:aurainfraadmin@gmail.com" className="font-semibold hover:underline" style={{ color: "#0a5d34" }}>
                aurainfraadmin@gmail.com
              </a>{" "}
              or write to us at SCO 16, 1st Floor, Sector 82-A, JLPL, SAS Nagar, Mohali, Punjab 140306,
              India.
            </p>
          </LegalSection>
        </LegalPageLayout>
      </main>
    </>
  );
}