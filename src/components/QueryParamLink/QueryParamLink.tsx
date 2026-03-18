import { LinkList } from "@amsterdam/design-system-react";

type Props = {
  paramKey: string;
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function QueryParamLink({ paramKey, value, children, onClick }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const url = new URL(window.location.href);
    url.searchParams.set(paramKey, value);

    window.history.pushState({}, "", url);

    if (onClick) {
      onClick();
    }
  };

  return (
    <LinkList.Link href={`?${paramKey}=${value}`} onClick={handleClick}>
      {children}
    </LinkList.Link>
  );
}
