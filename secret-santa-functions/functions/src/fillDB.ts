import * as functions from "firebase-functions";
const admin = require('firebase-admin');
const cors = require('cors')({
    origin: ['http://localhost:3000']
});

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

export default functions.https.onRequest(async (req, res) => {

    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('content-type', 'application/json');

    cors(req, res, async () => {
        people.forEach(async (person) => {
            await admin.firestore().collection('users').add({ person: person.person, family: person.family });
        })

        res.sendStatus(200);
        return
    })

});