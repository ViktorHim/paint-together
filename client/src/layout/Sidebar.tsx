import { FC, ReactNode } from "react";

export interface SidebarProps {
  children: ReactNode;
}

export const Sidebar: FC<SidebarProps> = ({ children }) => {
    return <div className="sidebar">{children}</div>;
};
