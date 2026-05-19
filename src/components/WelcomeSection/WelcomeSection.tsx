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
          De Keuzewijzer Aardgasvrij helpt Verenigingen van Eigenaars (VvE’s) om
          een eerste inzicht te krijgen in geschikte warmtetechnieken voor hun
          gebouw. In drie stappen worden verschillende individuele en
          collectieve technieken vergeleken op basis van het huidige
          gasverbruik, de eigenschappen van het gebouw en de locatie.
          Voorbeelden van technieken zijn warmtepompen, stadsverwarming en
          andere duurzame oplossingen. Dit resulteert in een rangschikking die
          rekening houdt met totale kosten, ruimtelijke impact, benodigde
          aanpassingen aan het gebouw en het extra elektrische vermogen. De
          resultaten gaan uit van de aanname dat het gebouw voldoende geïsoleerd
          is, zodat de technieken effectief en realistisch kunnen worden
          toegepast.
        </Paragraph>
      </Grid.Cell>
    </Grid>
  );
}
