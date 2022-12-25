import { FunctionComponent, useEffect, useState } from "react";
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import { UserActionKind, UserContext, UserContextVar } from "../utils/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";

interface WishItemFormProps {
    
}
 
const WishItemForm: FunctionComponent<WishItemFormProps> = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatchUserEvent } = useContext(UserContext) as UserContextVar;

    const handleChange = (stateHandler: React.Dispatch<React.SetStateAction<any>>) => {
        const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
            stateHandler(e.target.value)
        }
        return handler
    }

    const location = useLocation();

    const sendItem = () => {
        setIsLoading(true)
        const WishlistItem = {
            url: url,
            title: title,
            description: description,
            price: price,
            id: isEdit ? location.state?.wishlistItem?.id : ""
        }

        fetch('http://127.0.0.1:5001/secretsanta-a3eb2/us-central1/editWishlist', {
            method: isEdit ? "PUT" : "POST",
            headers: new Headers({ 'content-type': 'application/json', 'token': localStorage.getItem("token") as string }),
            body: JSON.stringify({wishlistItem: WishlistItem})
        }).then((res) => {
            setIsLoading(false)
            if (!res.ok) {
                res.json().then(json => {
                    console.log(json)
                })
            } else {
                res.json().then(json => {

                    if(isEdit) {
                        dispatchUserEvent({ type: UserActionKind.editItemFromList, payload: { ...WishlistItem, id: json.id } })
                    } else {
                        dispatchUserEvent({ type: UserActionKind.addToList, payload: { ...WishlistItem, id: json.id} })
                    }

                    navigate("/mylist")
                })
            }
        })
    }

    useEffect(() => {
        if(location.state?.wishlistItem) {
            setTitle(location.state.wishlistItem.title)
            setUrl(location.state.wishlistItem.url)
            setDescription(location.state.wishlistItem.description)
            setPrice(location.state.wishlistItem.price)
            setIsEdit(true)
        }
    }, []);

    return (
        <>
            <Grid display={"flex"} justifyContent={"center"} pt={10}>
                <Stack spacing={2} m={2}>
                    <Stack spacing={2} m={2} width={"80vw"}>
                        <FormControl>
                            <TextField fullWidth label="Title" value={title} onChange={handleChange(setTitle)} variant="outlined"/>
                            <FormHelperText id="my-helper-text"></FormHelperText>
                        </FormControl>

                        <FormControl>
                            <TextField label="Url" value={url} onChange={handleChange(setUrl)} variant="outlined"/>
                            <FormHelperText id="my-helper-text"></FormHelperText>
                        </FormControl>

                        <FormControl>
                            <TextField label="Description" value={description} onChange={handleChange(setDescription)} minRows={3} multiline variant="outlined"/>
                            <FormHelperText id="my-helper-text"></FormHelperText>
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="outlined-adornment-Price">Price</InputLabel>
                            <OutlinedInput label="Price" id="outlined-adornment-Price" value={price} onChange={handleChange(setPrice)} endAdornment={<InputAdornment position="start">€</InputAdornment>} sx={{width: "20%"}}/>
                            <FormHelperText id="my-helper-text"></FormHelperText>
                        </FormControl>
                    </Stack>

                    <FormControl>
                        <LoadingButton loading={isLoading} variant="contained" onClick={sendItem} size={"large"}>Confirm</LoadingButton>
                    </FormControl>
                </Stack>
            </Grid>
        </>
    );
}
 
export default WishItemForm;