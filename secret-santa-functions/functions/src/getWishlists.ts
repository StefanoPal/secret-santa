import * as functions from "firebase-functions";
import { UserType } from "./utils/types";
const admin = require('firebase-admin');
const cors = require('cors')({
    origin: ['http://localhost:3000']
});

export default functions.https.onRequest(async (req, res) => {

    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('content-type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Headers', "token,content-type");
        res.set('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
        res.status(204).send('');
        return
    }

    if (!(['GET'].includes(req.method))) {
        res.status(403).json({ message: 'Forbidden' })
        return
    }


    const UserList = await admin.firestore().collection('wishlists').get()
    const User: [UserType?] = UserList.docs.map((x: any) => x.data() as any)
    const UserString = User[0]?.person as string

    functions.logger.info("wishlistItem", req.body['wishlistItem']["id"]);

    cors(req, res, async () => {

 
    })
});