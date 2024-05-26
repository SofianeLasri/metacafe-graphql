import {PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';

const prisma = new PrismaClient();

const interestsList = [
    'Lecture',
    'Voyage',
    'Cuisine',
    'Photographie',
    'Musique',
    'Jeux vidéo',
    'Dessin',
    'Jardinage',
    'Bricolage',
    'Sport',
    'Cinéma',
    'Séries',
    'Informatique',
    'Science',
    'Histoire',
    'Art',
    'Écriture',
    'Mode',
];

async function main() {
    // Créer des centres d'intérêts
    const interests = [];
    for (let interestName of interestsList) {
        const interest = await prisma.centerOfInterest.create({
            data: {
                name: interestName,
            },
        });
        interests.push(interest);
    }

    // Créer des utilisateurs avec des posts et des commentaires
    for (let i = 0; i < 5; i++) {
        const user = await prisma.user.create({
            data: {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                UserInterest: {
                    create: interests
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 3)
                        .map(interest => ({
                            centerOfInterest: {
                                connect: {id: interest.id},
                            },
                        })),
                },
            },
        });

        for (let j = 0; j < 3; j++) {
            const post = await prisma.post.create({
                data: {
                    title: faker.lorem.sentence(),
                    content: faker.lorem.paragraph(),
                    author: {
                        connect: {id: user.id},
                    },
                },
            });

            for (let k = 0; k < 2; k++) {
                await prisma.comment.create({
                    data: {
                        body: faker.lorem.sentence(),
                        post: {
                            connect: {id: post.id},
                        },
                        user: {
                            connect: {id: user.id},
                        },
                    },
                });
            }
        }
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });