import { LegalPage } from "@/components/legal/LegalPage";
import { cookiePolicy } from "@/constants/LegalConst";



const CookiePolicy = () => (
  <LegalPage
    eyebrow="Cookies"
    title="Cookie Policy"
    intro="This policy explains how cookies help us maintain, improve, and personalize the JAZBAA experience."
    sections={cookiePolicy}
  />
);

export default CookiePolicy;
