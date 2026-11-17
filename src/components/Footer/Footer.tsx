import {
  Grid,
  Heading,
  LinkList,
  PageFooter,
} from "@amsterdam/design-system-react";
import {
  ClockIcon,
  MailIcon,
  PhoneIcon,
} from "@amsterdam/design-system-react-icons";

export function Footer() {
  return (
    <PageFooter>
      <PageFooter.Spotlight>
        <Grid paddingVertical="x-large">
          <Grid.Cell span="all">
            <Heading
              className="ams-mb-s"
              color="inverse"
              level={2}
              size="level-3"
            >
              Contact
            </Heading>
            <LinkList>
              <LinkList.Link
                color="inverse"
                href="mailto:vve.wonen@amsterdam.nl"
                icon={<MailIcon />}
              >
                vve.wonen@amsterdam.nl
              </LinkList.Link>
              <LinkList.Link
                color="inverse"
                href="tel:14020"
                icon={<PhoneIcon />}
              >
                14 020
              </LinkList.Link>
              <LinkList.Link
                color="inverse"
                href="https://www.amsterdam.nl/contact/adressen-openingstijden/"
                icon={<ClockIcon />}
              >
                Adressen en openingstijden
              </LinkList.Link>
            </LinkList>
          </Grid.Cell>
        </Grid>
      </PageFooter.Spotlight>
      <PageFooter.Menu>
        <PageFooter.MenuLink href="https://www.amsterdam.nl/privacy/">
          Privacy
        </PageFooter.MenuLink>
        <PageFooter.MenuLink href="https://www.amsterdam.nl/toegankelijkheid/">
          Toegankelijkheid
        </PageFooter.MenuLink>
        <PageFooter.MenuLink href="https://www.amsterdam.nl/privacy/cookies-site/">
          Cookies
        </PageFooter.MenuLink>
      </PageFooter.Menu>
    </PageFooter>
  );
}
