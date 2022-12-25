import { Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
function Register() {

    return (
        <>
            <div>
                <Stack>
                    <Typography variant="h3" textAlign={"center"}>Register</Typography>
                    <LoginForm endpoint="http://127.0.0.1:5001/secretsanta-a3eb2/us-central1/registerUser" redirect="/" isLogin={false} />
                    <Typography variant="subtitle1" textAlign={"center"} color={"text.secondary"}>
                        Otherwise, login <Link to={"/login"} style={{ textDecoration: "none" }}>Here</Link>
                    </Typography>
                </Stack>
            </div>
        </>
    );
}

export default Register;