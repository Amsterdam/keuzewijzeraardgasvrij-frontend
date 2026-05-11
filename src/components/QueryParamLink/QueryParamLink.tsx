import { LinkList } from "@amsterdam/design-system-react";

type Props = {
  paramKey: string;
  value: string;
  children: React.ReactNode;
  onClick?: (value: Record<string, string> | string) => void;
};

export function QueryParamLink({ paramKey, value, children, onClick }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // TODO: Is this needed? It updates the URL but doesn't trigger any reactivity in the app. If we want that, we might need tu fetch the BAG PDOK information.
    // const url = new URL(window.location.href);
    // url.searchParams.set(paramKey, value);

    // window.history.pushState({}, "", url);

    if (onClick) {
      onClick(value);
    }
  };

  return (
    <LinkList.Link href={`?${paramKey}=${value}`} onClick={handleClick}>
      {children}
    </LinkList.Link>
  );
}
