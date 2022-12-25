import * as functions from "firebase-functions";
import { UserType, WishlistType } from "./utils/types";
const admin = require('firebase-admin');
const cors = require('cors')({
    origin: ['http://localhost:3000']
});

export default functions.https.onRequest(async (req, res) => {

    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('content-type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Headers', "token,content-type");
        res.status(204).send('');
        return
    }

    if (req.method !== 'GET') {
        res.status(403).json({ message: 'Forbidden' })
        return
    }
    functions.logger.log('Cookies', req.headers["token"]);
    if (!req.headers["token"]) {
        res.status(422).json({ message: 'Malformed Request' })
        return
    }

    cors(req, res, async () => {


        const UserQuery = await admin.firestore().collection('users').where("sessionToken", "==", req.headers["token"])
        const UserList = await UserQuery.get()
        let User: [UserType?] = UserList.docs.map((x: any) => x.data() as any)
        functions.logger.log('User', User);

        if (User.length === 0 || User[0] === undefined) {
            res.status(422).json({ message: `User ${req.body.person} is not yet registered` });
            return
        }

        const WishlistQuery = await admin.firestore().collection('wishlists').where("person", "==", User[0]["person"])
        const WishList = await WishlistQuery.get()
        let Wishes: [WishlistType?] = WishList.docs.map((x: any) => { return {...x.data(), id: x.id} as any})
        functions.logger.log('Wishes', Wishes);
        res.status(200).json({ person: User[0]["person"], wishlist: Wishes });
        return
    })

});