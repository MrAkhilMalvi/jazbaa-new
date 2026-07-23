import { LegalPage } from "@/pages/LegalPage";
import { privacyPolicy } from "@/constants/LegalConst";



const PrivacyPolicy = () => (
  <LegalPage
    eyebrow="Privacy"
    title="Privacy Policy"
    intro="This policy explains how information is collected, used, protected, and managed when you use the JAZBAA website."
    sections={privacyPolicy}
  />
);

export default PrivacyPolicy;
