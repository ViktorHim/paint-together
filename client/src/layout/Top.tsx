import { FC, ReactNode } from "react";

export interface TopProps {
  children: ReactNode;
}

export const Top: FC<TopProps> = ({ children }: TopProps) => {
    return <div className="top">{children}</div>;
};
