import * as functions from "firebase-functions";
import { UserType, WishlistType } from "./utils/types";
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
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

    if (!(['GET', 'PUT', 'POST', 'DELETE'].includes(req.method))) {
        res.status(403).json({ message: 'Forbidden' })
        return
    }

    if (!req.body['wishlistItem'] && ['POST'].includes(req.method)) {
        res.status(422).json({ message: 'a wishList item must be provided' })
        return
    }

    if (!req.headers["token"]) {
        res.status(422).json({ message: 'Malformed Request' })
        return
    }

    if (!req.body['wishlistItem']['id'] && ['GET', 'PUT', 'DELETE'].includes(req.method)) {
        res.status(422).json({ message: 'An ID must be provided' })
        return
    }

    const UserList = await admin.firestore().collection('users').where("sessionToken", "==", req.headers["token"]).get()
    const User: [UserType?] = UserList.docs.map((x: any) => x.data() as any)
    const UserString = User[0]?.person as string

    functions.logger.info("wishlistItem", req.body['wishlistItem']["id"]);

    cors(req, res, async () => {

        switch(req.method) {
            case 'GET': res.json(await getElement(req.body.id)); break;
            case 'POST': res.json(await addElement(req.body['wishlistItem'], UserString)); break;
            case 'PUT': res.json(await modifyElement(req.body['wishlistItem'], UserString)); break;
            case 'DELETE': res.json(await deleteElement(req.body.id, UserString)); break;
        }
    })
});

async function deleteElement(id: string, user: string) {

    const wishlistItemDoc = await getElement(id)
    if(wishlistItemDoc.person !== user) { return {message: "Deletion not allowed"} }
    await admin.firestore().collection('wishlists').doc(id).delete()
    return {}
}


async function modifyElement(newData: WishlistType, user: string) {
    const wishlistItemDoc = await getElement(newData.id as string)
    if (wishlistItemDoc.person !== user) { return { message: "Modification not allowed" } }
    await admin.firestore().collection('wishlists').doc(newData.id as string).update({ ...newData, id: "", person: user })
    return { id: newData.id as string }
}


async function getElement(id: string) {
    functions.logger.info("ID", id);
    const WishlistQuery = await admin.firestore().collection('wishlists').doc(id).get()
    return { id: WishlistQuery.id, ...WishlistQuery.data() }
}


async function addElement(newData: {}, user: string) {
    const doc = await admin.firestore().collection('wishlists').add({person: user, ...newData})
    return { id: doc.id }
}