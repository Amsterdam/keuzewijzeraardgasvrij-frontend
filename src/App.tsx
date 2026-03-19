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
    <Page
      lang="nl"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div style={{ flex: "1 0 auto" }}>
        <Header />
        <WelcomeSection />
        <Wizard />
      </div>
      <Footer />
    </Page>
  );
}

export default App;
