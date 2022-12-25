import * as functions from "firebase-functions";
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const cors = require('cors')({
    origin: ['http://localhost:3000']
});

export default functions.https.onRequest(async (req, res) => {

    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('content-type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Headers', "authorization,content-type");
        res.status(204).send('');
        return
    }

    if (req.method !== 'POST') {
        res.status(403).json({ message: 'Forbidden' })
        return
    }

    if (!req.body['person']) {
        res.status(422).json({ message: 'Username cannot be blank' })
        return
    }

    if (!req.body['password']) {
        res.status(422).json({ message: 'Password cannot be blank' })
        return
    }
    

    cors(req, res, async () => {
        
        const UserQuery = await admin.firestore().collection('users').where("person", "==", req.body.person)
        const UserList = await UserQuery.get()
        let User: [{ person: string, password: string }?] = UserList.docs.map((x: any) => x.data() as any)
        functions.logger.log('User', User);

        if (User.length === 0 || User[0] === undefined) {
            res.status(422).json({ message: `User ${req.body.person} is not yet registered` });
            return
        }

        if(User[0].password !== req.body.password) {
            res.status(401).json({ message: 'Incorrect Password' });
            return
        }

        const token = jwt.sign({ person: req.body.person }, process.env.PRIVATE_KEY);
        await UserList.forEach((doc: any) => { doc.ref.update({ sessionToken: token })})
        res.cookie("token", token)
        res.status(200).json({token: token });
        return
    })

});