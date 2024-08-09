import { FC, ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { createRoomId } from "../helpers/createRoomId";

export interface AppRouterProps {
    children: ReactNode
}

export const AppRouter: FC<AppRouterProps> = ({children}) => {

    return (
        <Routes>
            <Route
                path={"/paint/:id"}
                element={children}
            />
            <Route
                path={"/"}
                element={<Navigate to={`/paint/room${createRoomId()}`} />}
            />
        </Routes>
    )
}