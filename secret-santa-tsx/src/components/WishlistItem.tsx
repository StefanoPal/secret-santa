import { FunctionComponent, useContext, useState } from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WishlistTypography from "../components/WishlistTypography";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { UserActionKind, UserContext, UserContextVar, WishlistType } from '../utils/UserContext';

interface WishlistItemProps {
    item: WishlistType,
}
 
const WishlistItem: FunctionComponent<WishlistItemProps> = ({item}) => {

    const navigate = useNavigate();
    const theme = useTheme();
    const [deleteIsLoading, setDeleteIsLoading] = useState(false);
    const { dispatchUserEvent } = useContext(UserContext) as UserContextVar;

    const deleteItem = (id: string) => {
        setDeleteIsLoading(true)
        fetch('http://127.0.0.1:5001/secretsanta-a3eb2/us-central1/editWishlist', {
            method: "DELETE",
            headers: new Headers({ 'content-type': 'application/json', 'token': localStorage.getItem("token") as string }),
            body: JSON.stringify({ id: id })
        }).then((res) => {
            setDeleteIsLoading(false)
            if (!res.ok) {
                res.json().then(json => {
                    console.log(json)
                })
            } else {
                res.json().then(_ => {
                    dispatchUserEvent({ type: UserActionKind.removeFromList, payload: id })
                })
            }
        })
    }

    const sendToEdit = (item: WishlistType) => {
        navigate("/newitem", {state: {wishlistItem: item}})
    }


    return (
        <>
            <ListItem id={item.id} alignItems="flex-start" sx={{ padding: 1, width: "50vw", marginBottom: 5, borderRadius: 2 ,border: `2px solid ${theme.palette.secondary.main}`}}>
                <ListItemText
                    sx={{
                        whiteSpace: 'nowrap', overflow: "hidden", textOverflow: 'ellipsis'
                    }}
                    primary={
                        <WishlistTypography text={item.url as string} title={item.title} isPrimary />
                    }
                    secondary={
                        <WishlistTypography text={item.description as string} price={item.price} />
                    }
                />
                <ListItemIcon>
                    <LoadingButton variant="outlined" sx={{ marginInline: 1 }} onClick={() => { sendToEdit(item) }}><EditIcon /></LoadingButton>
                    <LoadingButton loading={deleteIsLoading} onClick={() => {deleteItem(item.id)}} variant="contained" sx={{ marginInline: 1 }}><DeleteIcon /></LoadingButton>
                </ListItemIcon>
            </ListItem>
        </>
    );
}
 
export default WishlistItem;