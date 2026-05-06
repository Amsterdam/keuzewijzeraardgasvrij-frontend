import "@amsterdam/design-system-assets/font/index.css";
import "@amsterdam/design-system-css/dist/index.css";
import "@amsterdam/design-system-tokens/dist/index.css";

// Compact mode Amsterdam Design System
import "@amsterdam/design-system-tokens/dist/index.css";
import "@amsterdam/design-system-tokens/dist/compact.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Page } from "@amsterdam/design-system-react";
import {
  Footer,
  Header,
  WelcomeSection,
  TestEnvironmentAlert,
} from "@/components";
import Wizard from "./features/Wizard/Wizard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page
        lang="nl"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div style={{ flex: "1 0 auto" }}>
          <TestEnvironmentAlert />
          <Header />
          <WelcomeSection />
          <Wizard />
        </div>
        <Footer />
      </Page>
    </QueryClientProvider>
  );
}

export default App;
