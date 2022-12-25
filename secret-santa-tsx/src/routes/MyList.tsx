import { UserContext, UserContextVar } from "../utils/UserContext";
import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import WishlistItem from "../components/WishlistItem";
import AddIcon from '@mui/icons-material/Add';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function MyList() {
    const { userState } = useContext(UserContext) as UserContextVar;
    const navigate = useNavigate();

    useEffect(() => {
        console.log(userState)
    })

    return (
        <>
            <Grid display={"flex"} justifyContent={"center"} pt={10}>
                <Stack justifyItems={'center'} alignItems={'center'}>
                    <Typography style={{ textAlign: "center" }} paddingBottom={3} variant="h5">{userState.giftsTo ? `You have to give a gift to ${userState.giftsTo}!` : `The roll has yet to start`}</Typography>

                    <Button style={{ marginBottom: "3rem", marginTop: "1rem" }} variant="contained" color="success" onClick={() => { navigate("/newitem") }} sx={{width: "20%", minWidth: "10vw"}}><AddIcon />&nbsp;Add</Button>

                    <List>
                        {userState.wishlist !== undefined &&
                            userState.wishlist.map(i => {
                                return <WishlistItem item={i} />
                            })}
                    </List>
                </Stack>
            </Grid>
        </>
    );
}

export default MyList;