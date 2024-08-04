import { FC, ReactNode } from "react";

export interface MainProps {
  children: ReactNode;
}

export const Main: FC<MainProps> = ({ children }) => {
  return <div className="main">{children}</div>;
};
