import PageNavbar from "../components/PageNavbar.jsx";
import Seo from "../components/Seo.jsx";
import LegalPageLayout, { LegalSection } from "../components/legal/LegalPageLayout.jsx";

const EFFECTIVE_DATE = "1 January 2026";

export default function PrivacyPolicy() {
  return (
    <>
      <PageNavbar />
      <main>
        <Seo
          title="Privacy Policy"
          description="How Aura Infra collects, uses, and protects your personal information across our website and consulting, sales and brokerage services."
          path="/privacy-policy"
        />
        <LegalPageLayout title="Privacy Policy" effectiveDate={EFFECTIVE_DATE}>
          <LegalSection heading="1. Introduction">
            <p>
              Aura Infra ("Aura Infra", "we", "us", "our") is a real estate consulting, marketing and
              sales (brokerage) firm. This Privacy Policy explains what personal information we collect
              through this website (aurainfra.co.in), how we use it, who we may share it with, and the
              choices you have. By using our website or submitting your details to us, you agree to the
              practices described here.
            </p>
          </LegalSection>

          <LegalSection heading="2. Information We Collect">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="font-semibold text-[#151c27]">Contact & enquiry details</span> — name,
                email address, phone number, and message content submitted through our Contact and
                property enquiry forms
              </li>
              <li>
                <span className="font-semibold text-[#151c27]">Newsletter subscription</span> — email
                address, if you subscribe to updates
              </li>
              <li>
                <span className="font-semibold text-[#151c27]">Account details</span> — for admin/staff
                users only, sign-in credentials managed via our authentication provider
              </li>
              <li>
                <span className="font-semibold text-[#151c27]">Usage data</span> — basic technical
                information such as browser type and pages visited, to help us keep the site working
                correctly
              </li>
            </ul>
          </LegalSection>

          <LegalSection heading="3. How We Use Your Information">
            <p>We use the information you provide to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Respond to your property enquiries and requests for site visits or callbacks</li>
              <li>
                Share relevant details with the concerned developer, property owner, or seller so we can
                facilitate a sale, purchase, or lease on your behalf, as part of our brokerage /
                consulting service
              </li>
              <li>Send you newsletters, project updates, or offers you've opted in to receive</li>
              <li>Improve our website and the services we offer</li>
              <li>Meet legal, regulatory, or accounting obligations</li>
            </ul>
            <p>
              We do not sell your personal information to third parties. We only share it with
              developers, property owners, or service partners where necessary to act on your enquiry
              or transaction, or where required by law.
            </p>
          </LegalSection>

          <LegalSection heading="4. Data Storage & Security">
            <p>
              Information submitted through our website is stored using reputable third-party
              infrastructure providers with industry-standard security practices. Access to admin data
              is restricted to authorised Aura Infra personnel only. While we take reasonable steps to
              protect your data, no method of transmission or storage over the internet is completely
              secure, and we cannot guarantee absolute security.
            </p>
          </LegalSection>

          <LegalSection heading="5. Cookies">
            <p>
              Our website may use basic cookies or similar technologies to remember your preferences and
              understand how visitors use the site. You can control or disable cookies through your
              browser settings; doing so may affect some site functionality.
            </p>
          </LegalSection>

          <LegalSection heading="6. Your Rights">
            <p>
              You may ask us to access, correct, update, or delete the personal information we hold
              about you, or to unsubscribe from our newsletter or marketing communications at any time.
              To exercise any of these rights, contact us using the details below.
            </p>
          </LegalSection>

          <LegalSection heading="7. Data Retention">
            <p>
              We retain enquiry and contact information for as long as needed to respond to your
              request, facilitate an ongoing transaction, or comply with legal and accounting
              requirements, after which it is deleted or anonymised.
            </p>
          </LegalSection>

          <LegalSection heading="8. Third-Party Links">
            <p>
              Our website may link to third-party developer websites, maps, or payment pages. This
              Privacy Policy does not cover, and we are not responsible for, the privacy practices of
              those third-party sites.
            </p>
          </LegalSection>

          <LegalSection heading="9. Children's Privacy">
            <p>
              Our website and services are intended for adults seeking property consulting and are not
              directed at individuals under the age of 18. We do not knowingly collect personal
              information from minors.
            </p>
          </LegalSection>

          <LegalSection heading="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or
              for legal reasons. Any changes will be posted on this page with a revised "Last updated"
              date.
            </p>
          </LegalSection>

          <LegalSection heading="11. Contact Us">
            <p>
              For any questions about this Privacy Policy or how your data is handled, please contact us
              at{" "}
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