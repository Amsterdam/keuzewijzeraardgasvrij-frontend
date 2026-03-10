import HomePage from "./pages/HomePage/HomePage";
import "@amsterdam/design-system-assets/font/index.css";
import "@amsterdam/design-system-css/dist/index.css";
import "@amsterdam/design-system-tokens/dist/index.css";
import { Page } from "@amsterdam/design-system-react";
import { Footer, Header } from "./components";

function App() {
  return (
    <Page lang="nl">
      <Header />
      <main id="inhoud">
        <HomePage />
      </main>
      <Footer />
    </Page>
  );
}

export default App;
