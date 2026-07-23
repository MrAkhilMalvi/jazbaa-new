import { LegalPage } from "@/pages/LegalPage";
import { terms } from "@/constants/LegalConst";



const TermsConditions = () => (
  <LegalPage
    eyebrow="Legal"
    title="Terms & Conditions"
    intro="Please read these terms carefully before using the JAZBAA website."
    sections={terms}
  />
);

export default TermsConditions;
