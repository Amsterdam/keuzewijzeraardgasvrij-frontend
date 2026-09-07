import { Grid, Heading, Paragraph } from "@amsterdam/design-system-react";
import { env } from "@/config/env";
import { DEFAULT_CONTENT_SPAN } from "@/constants";

export function WelcomeSection() {
  return (
    <Grid gapVertical="large" paddingVertical="large">
      <Grid.Cell span="all">
        <Heading level={1}>
          {`${env.VITE_APP_TITLE} ${env.VITE_ENVIRONMENT_SHORT}`}
        </Heading>
      </Grid.Cell>

      <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
        <Paragraph>
          Deze keuzewijzer geeft u een eerste richting voor een aardgasvrije
          warmteoplossing voor uw VvE-gebouw. In twee stappen krijgt u een
          indicatie van de best passende technieken voor uw VvE.
        </Paragraph>
      </Grid.Cell>
      <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
        <Paragraph>
          U vult in stap één de adresgegevens van uw gebouw in. In stap twee
          krijgt u een aantal vragen over de VvE, over het energiegebruik en
          over de wensen van de VvE. Op basis daarvan vergelijkt de tool
          verschillende technieken met elkaar, zoals warmtepompen, een warmtenet
          en andere duurzame systemen. Daarna ziet u meteen welke warmtesystemen
          het beste bij uw gebouw passen en welke minder geschikt lijken.
        </Paragraph>
      </Grid.Cell>
      <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
        <Paragraph>
          De uitkomst is een richting, geen advies. Gebruik de uitkomst als
          startpunt voor het gesprek binnen uw VvE, of nodig een installateur of
          adviseur uit om verder onderzoek te doen. U kunt de resultaten als PDF
          exporteren.
        </Paragraph>
      </Grid.Cell>
      <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
        <Paragraph>
          <strong>Let op:</strong> de keuzewijzer gaat er vanuit dat uw gebouw
          goed geïsoleerd is. Dit zijn vaak gebouwen die na 2000 gebouwd of
          recent geïsoleerd zijn.
        </Paragraph>
      </Grid.Cell>
    </Grid>
  );
}
