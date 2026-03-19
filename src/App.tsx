import "@amsterdam/design-system-assets/font/index.css";
import "@amsterdam/design-system-css/dist/index.css";
import "@amsterdam/design-system-tokens/dist/index.css";

// Compact mode Amsterdam Design System
import "@amsterdam/design-system-tokens/dist/index.css";
import "@amsterdam/design-system-tokens/dist/compact.css";

import { Page } from "@amsterdam/design-system-react";
import { Footer, Header, WelcomeSection } from "@/components";
import Wizard from "./features/Wizard/Wizard";

function App() {
  return (
    <Page lang="nl">
      <Header />
      <WelcomeSection />
      <Wizard />
      <Footer />
    </Page>
  );
}

export default App;
