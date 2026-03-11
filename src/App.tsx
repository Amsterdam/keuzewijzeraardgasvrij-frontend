import "@amsterdam/design-system-assets/font/index.css";
import "@amsterdam/design-system-css/dist/index.css";
import "@amsterdam/design-system-tokens/dist/index.css";
import { Page, SkipLink } from "@amsterdam/design-system-react";
import { Footer, Header, WelcomeSection } from "@/components";
import AddressSearch from "./components/AddressSearch/AddressSearch";

function App() {
  return (
    <Page lang="nl">
      <SkipLink href="#inhoud">Direct naar inhoud</SkipLink>
      <Header />
      <main id="inhoud">
        <WelcomeSection />
        <AddressSearch />
      </main>
      <Footer />
    </Page>
  );
}

export default App;
