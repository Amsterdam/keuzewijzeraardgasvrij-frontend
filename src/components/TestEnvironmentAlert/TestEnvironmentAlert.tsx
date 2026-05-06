import { Alert, Paragraph } from "@amsterdam/design-system-react";
import { env } from "@/config/env";

export function TestEnvironmentAlert() {
  if (env.VITE_ENVIRONMENT_SHORT !== "ACC") return null;
  return (
    <Alert heading="Let op: testomgeving" headingLevel={2} severity="warning">
      <Paragraph>
        Deze omgeving is bedoeld voor testdoeleinden. Gegevens kunnen onjuist of
        onvolledig zijn en zijn uitsluitend geschikt voor het uitvoeren van
        berekeningen. Gebruik deze informatie niet voor besluitvorming.
      </Paragraph>
    </Alert>
  );
}

export default TestEnvironmentAlert;
