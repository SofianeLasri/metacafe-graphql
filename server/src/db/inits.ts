import {CenterOfInterest, User} from "./models";
import sequelizeConnection from "./config";

const isDev: boolean = process.env.NODE_ENV === 'development'
const dbInit = async () => {
    await sequelizeConnection.sync({alter: isDev});

    // Création de l'utilisateur Métacafé
    await User.findOrCreate({
        where: {
            name: 'Métacafé',
            email: 'no-reply@metacafe.com',
        },
        defaults: {
            name: 'Métacafé',
            email: 'no-reply@metacafe.com',
            password: 'isNotIntendedToBeUsed',
        }
    });

    const centerOfInterests = ["Sport", "Musique", "Jeux vidéo", "Cinéma", "Lecture", "Art", "Voyage", "Cuisine", "Animaux", "Technologie", "Science", "Histoire", "Nature", "Photographie", "Mode"];
    for (const centerOfInterest of centerOfInterests) {
        await CenterOfInterest.findOrCreate({
            where: {
                name: centerOfInterest,
            },
            defaults: {
                name: centerOfInterest,
            }
        });
    }
}

export default dbInit;