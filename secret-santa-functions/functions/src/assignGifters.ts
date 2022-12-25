import * as functions from "firebase-functions";
const admin = require('firebase-admin');

export default functions.https.onRequest((req, res) => {
    
    
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('content-type', 'application/json');
    
    
    let people: { person: string, family: string }[] = [
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

    let db: { person: string, family: string, giftsTo?: string }[] = [
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
    
    const alreadyPulled: [string?] = []
    people.sort(function () { return 0.5 - Math.random() });

    for(const [index, personDB] of db.entries()) {
        const filtered = people.filter((person) => person.family !== personDB.family && !alreadyPulled.includes(person.person))[0]
        functions.logger.info(`filtered`, filtered);
        db[index]["giftsTo"] = `${filtered.person} ${filtered.family}`
        alreadyPulled.push(filtered.person)
    }

    db.forEach(personDB => {
        const UserQuery = admin.firestore().collection('users').where('person', '==', personDB.person)
        UserQuery.get().then((querySnapshot: any) => {
            querySnapshot.forEach(async (doc: any) => {
                await doc.ref.update({giftsTo: personDB.giftsTo})
                functions.logger.info(`${doc.id} => ${JSON.stringify(doc.data())}`);
            });
        })
    })

    res.sendStatus(200);
    return
});