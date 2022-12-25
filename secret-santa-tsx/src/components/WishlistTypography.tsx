import {FunctionComponent} from 'react'
import Typography from '@mui/material/Typography'

interface WishlistTypographyProps {
    price?: string,
    title?: string,
    text: string,
    isPrimary?: boolean
}

const WishlistTypography: FunctionComponent<WishlistTypographyProps> = ({price, title, text, isPrimary = false}) => {
    return (
        <Typography
            sx={{
                'white-space': 'nowrap', overflow: "hidden", textOverflow: 'ellipsis'
            }}
            component={isPrimary ? "span" : "p"}
            fontSize={"inherit"}
        >
            <Typography
                sx={{
                    'white-space': 'nowrap', overflow: "hidden", textOverflow: 'ellipsis'
                }}
                fontSize={"inherit"}
            >
                {isPrimary ? <a href={text}>{title}</a> : secondaryTypography(text, price as string) }
            </Typography>
        </Typography>
    );
}


function secondaryTypography(text: string, price: string) {
    return (
        <>
            <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
            >{price}€ - </Typography> 
            {text}
        </>
    )
}
 
export default WishlistTypography;