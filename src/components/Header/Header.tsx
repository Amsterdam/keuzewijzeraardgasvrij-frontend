import { LinkList, PageHeader } from "@amsterdam/design-system-react";

export function Header() {
  return (
    <PageHeader
      noMenuButtonOnWideWindow
      menuItems={
        <LinkList.Link href="https://www.amsterdam.nl/">
          Amsterdam.nl
        </LinkList.Link>
      }
    />
  );
}
