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

let db: { person: string, family: string, giftesTo?: string }[] = [
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

people.sort(function () { return 0.5 - Math.random() });
var alreadyPulled: [string?] = []
db.forEach(doc => {
    const filtered = people.filter((person) => person.family !== doc.family && !alreadyPulled.includes(person.person))[0]
    doc["giftesTo"] = `${filtered.person} ${filtered.family}`;
    alreadyPulled.push(filtered.person)
})

console.log(db, people);