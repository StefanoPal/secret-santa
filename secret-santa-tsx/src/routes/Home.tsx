import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate()

    function redirectToLogin() {
        navigate("register")
    }

    return (
        <>
            <p>Home</p>
            <Button variant="contained" onClick={redirectToLogin}>Get Started!</Button>
        </>
    );
}

export default Home;