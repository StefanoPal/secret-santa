import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useLocation } from "react-router-dom";

function Login() {

    const location = useLocation();
    const errorMessage = location.state?.errorMessage
    return (
        <>
            <div>
                <Stack>
                    <Typography variant="h3" textAlign={"center"}>Login</Typography>
                    {errorMessage && <Typography variant="h5" textAlign={"center"} p={1} color={"error"}>{errorMessage}</Typography>}
                    <LoginForm endpoint="http://127.0.0.1:5001/secretsanta-a3eb2/us-central1/loginUser" redirect="/mylist" isLogin={true}  />
                    <Typography variant="subtitle1" textAlign={"center"} color={"text.secondary"}>
                        Otherwise, register <Link to={"/register"} style={{textDecoration: "none"}}>Here</Link>
                    </Typography>
                </Stack>
            </div>
        </>
    );
}

export default Login;