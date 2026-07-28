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
          Met de Keuzewijzer Aardgasvrij kunt u als lid van een Vereniging van
          Eigenaars (VvE’s) ontdekken welke warmtetechniek het beste lijkt te
          passen bij uw gebouw. De uitkomsten kunnen worden gebruikt om het
          gesprek over verduurzaming in de VvE op te starten. In drie stappen
          vergelijkt de keuzewijzer verschillende opties zoals warmtepompen,
          stadsverwarming of andere duurzame systemen. De keuzewijzer kijkt naar
          hoeveel gas u gebruikt, hoe uw gebouw in elkaar zit en waar uw gebouw
          staat. Na het invullen ziet u welke opties het beste bij u passen op
          basis van de kosten, hoeveel ruimte de techniek nodig heeft, welke
          aanpassingen aan het gebouw nodig zijn en hoeveel stroom er nodig is.
        </Paragraph>
      </Grid.Cell>
      <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
        <Paragraph>
          Let op: de keuzewijzer gaat er vanuit dat uw gebouw goed geïsoleerd
          is. Dit zijn vaak gebouwen die na 2000 gebouwd of recent geïsoleerd
          zijn.
        </Paragraph>
      </Grid.Cell>
    </Grid>
  );
}
