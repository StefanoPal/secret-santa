import { Grid, Stack, FormControl, Autocomplete, TextField, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface LoginFormProps {
    endpoint: string,
    redirect: string,
    isLogin: boolean,
}

function LoginForm({ endpoint, isLogin, redirect }: LoginFormProps) {

    const navigate = useNavigate();
    const [person, setPerson] = useState("");
    const [password, setPassword] = useState("");
    const [requestError, setRequestError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const people: { person: string, family: string }[] = [
        { person: "Marco", family: "Velotta" },
        { person: "Andrea", family: "Velotta" },
        { person: "Cinzia", family: "Velotta" },
        { person: "Lello", family: "Velotta" },
        { person: "Diana", family: "Esposito" },
        { person: "Antonio", family: "Esposito" },
        { person: "Rosangela", family: "Esposito" },
        { person: "Dario", family: "Esposito" },
        { person: "Rosaria", family: "Esposito" },
        { person: "Franco", family: "Palumbo" },
        { person: "Nunzia", family: "Palumbo" },
        { person: "Fabio", family: "Palumbo" },
        { person: "Stefano", family: "Palumbo" },
        { person: "Marcello", family: "Puccio" },
        { person: "Gabriella", family: "Puccio" },
        { person: "Alessio", family: "Puccio" },
        { person: "Nicola", family: "Amato" },
        { person: "Luciana", family: "Amato" },
    ]


    const handlePersonChange = (e: any, newValue: { person: string, family: string } | null) => {
        if (newValue) {
            setPerson(newValue?.person)
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const loginUser = () => {
        setIsLoading(true)
        fetch(endpoint, {
            method: "POST",
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({
                person: person,
                password: password,
            })
        }).then((res) => {
            setIsLoading(false)
            if (!res.ok) {
                res.json().then(json => {
                    console.log(json)
                    setRequestError(json.message)
                })
            } else {
                res.json().then(json => {
                    setToken(json.token)
                    navigate(redirect)
                })
            }
        })
    }

    function setToken(userToken: string) {
        localStorage.setItem('token', userToken);
    }

    return (
        <Grid display={"flex"} justifyContent={"center"} pt={10}>
            <Stack spacing={2} m={2} maxWidth={300}>
                <FormControl>
                    <Autocomplete
                        id="grouped-demo"
                        options={people}
                        groupBy={(option) => option.family}
                        getOptionLabel={(option) => option.person}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Person" />}
                        onChange={handlePersonChange}
                    />
                    <FormHelperText id="my-helper-text">Be Honest!</FormHelperText>
                </FormControl>

                <FormControl>
                    <TextField label="Password" value={password} onChange={handlePasswordChange} variant="outlined" type={"password"} />
                    <FormHelperText error id="my-helper-text">{requestError}</FormHelperText>
                </FormControl>


                <FormControl>
                    <LoadingButton loading={isLoading} variant="contained" onClick={loginUser}>{isLogin ? "Login" : "Register"}</LoadingButton>
                </FormControl>
            </Stack>
        </Grid>
    );
}

export default LoginForm;