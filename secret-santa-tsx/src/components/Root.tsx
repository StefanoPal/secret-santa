import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useReducer } from "react";
import { UserContext, userReducer } from "../utils/UserContext";


function Root() {

    const [userState, dispatchUserEvent] = useReducer(userReducer, {});

    return (
        <>
            <Navbar/>
            <div id="body">
                <UserContext.Provider value={{
                    userState,
                    dispatchUserEvent
                }}>
                    <Outlet/>
                </UserContext.Provider>
            </div>
        </>
    );
}

export default Root;