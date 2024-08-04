import { FC, ReactNode } from "react";

export interface PageProps {
  children: ReactNode;
}

export const Page: FC<PageProps> = ({ children }: PageProps) => {
    return <div className="page">{children}</div>;
};
