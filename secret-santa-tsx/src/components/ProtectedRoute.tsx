import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import {UserActionKind, UserContext, UserContextVar} from "../utils/UserContext";
import { useTheme } from "@mui/material";

type Props = {
    ProtectedElement: JSX.Element;
};

function ProtectedRoute({ ProtectedElement }: Props) {
    const theme = useTheme();

    const getUserDetails = (token: string) => {
        setIsLoading(true)
        fetch("http://127.0.0.1:5001/secretsanta-a3eb2/us-central1/userDetails", {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json', 'token': token }),
        }).then(res => {
            setIsLoading(false)
            if(!res.ok) {
                navigate("/login", {state: {errorMessage: "Please Login First"}})
            } else {
                res.json()
                    .then(json => dispatchUserEvent({type: UserActionKind.addNewUser, payload: json}))
            }
        })
            .catch(err => {
                navigate("/login", { state: { errorMessage: "Please Login First" } })
            })
    }

    const [isLoading, setIsLoading] = useState(false);
    const { userState, dispatchUserEvent } = useContext(UserContext) as UserContextVar;
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userState).length === 0) {
            console.log(localStorage.getItem("token"))
            getUserDetails(localStorage.getItem("token") as string)
        }
    });

    return (
        <>
        {isLoading && <div style={{display: "flex", zIndex: 3, width: "99vw", height: "100vh", position: "absolute", justifyContent: "center", top: "40vh"}}>
            <Oval
                height={80}
                width={80}
                color={theme.palette.primary.main}
                wrapperStyle={{}}
                wrapperClass=""
                visible={isLoading}
                ariaLabel='oval-loading'
                secondaryColor={theme.palette.primary.light}
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>}
            {userState && ProtectedElement}
        </>
    );
}

export default ProtectedRoute;