import { Grid, Heading, Paragraph } from "@amsterdam/design-system-react";
import { env } from "@/config/env";
import { DEFAULT_CONTENT_SPAN } from "@/constants";
import {
  WELCOME_INTRO_PARAGRAPHS,
  WELCOME_LET_OP,
  WELCOME_UITKOMST_HEADING,
  WELCOME_UITKOMST_PARAGRAPHS,
} from "./welcomeTexts";

export function WelcomeSection() {
  return (
    <Grid gapVertical="large" paddingVertical="large" className="ams-mb-m">
      <Grid.Cell span="all">
        <Heading level={1}>
          {`${env.VITE_APP_TITLE} ${env.VITE_ENVIRONMENT_SHORT}`}
        </Heading>
      </Grid.Cell>

      {WELCOME_INTRO_PARAGRAPHS.map((text) => (
        <Grid.Cell key={text} span={DEFAULT_CONTENT_SPAN}>
          <Paragraph>{text}</Paragraph>
        </Grid.Cell>
      ))}
      <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
        <Heading level={2}>{WELCOME_UITKOMST_HEADING}</Heading>
      </Grid.Cell>
      {WELCOME_UITKOMST_PARAGRAPHS.map((text) => (
        <Grid.Cell key={text} span={DEFAULT_CONTENT_SPAN}>
          <Paragraph>{text}</Paragraph>
        </Grid.Cell>
      ))}
      <Grid.Cell span={DEFAULT_CONTENT_SPAN}>
        <Paragraph>
          <strong>{WELCOME_LET_OP.label}</strong> {WELCOME_LET_OP.text}
        </Paragraph>
      </Grid.Cell>
    </Grid>
  );
}
