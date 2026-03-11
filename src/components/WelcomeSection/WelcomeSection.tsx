import { Grid, Heading, Paragraph } from "@amsterdam/design-system-react";

export function WelcomeSection() {
  return (
    <Grid gapVertical="large" paddingVertical="large">
      <Grid.Cell span="all">
        <Heading level={1}>
          {`${import.meta.env.VITE_APP_TITLE} ${import.meta.env.VITE_ENVIRONMENT_SHORT}`}
        </Heading>
      </Grid.Cell>

      <Grid.Cell span="all">
        <Paragraph>
          Krijg met een paar antwoorden advies over welke mogelijkheden er zijn
          om uw Vereniging van Eigenaren (VvE) te verduurzamen. We nemen u stap
          voor stap mee om te bepalen welke maatregelen het meeste opleveren
          voor uw VvE. Denk aan isolatie van gevels, dak en vloer,
          hoogrendementsglas en HR-isolatie, maar ook aan zonnepanelen of een
          warmtepomp. Zo wordt verduurzamen duidelijk en haalbaar voor iedereen.
        </Paragraph>
      </Grid.Cell>
    </Grid>
  );
}
