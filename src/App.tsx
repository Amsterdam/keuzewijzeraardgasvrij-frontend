import "@amsterdam/design-system-assets/font/index.css";
import "@amsterdam/design-system-css/dist/index.css";
import "@amsterdam/design-system-tokens/dist/index.css";

import { Page } from "@amsterdam/design-system-react";
import { Footer, Header, WelcomeSection } from "@/components";
import Wizzard from "./features/Wizzard/Wizzard";

function App() {
  return (
    <Page lang="nl">
      <Header />
      <WelcomeSection />
      <Wizzard />
      <Footer />
    </Page>
  );
}

export default App;
