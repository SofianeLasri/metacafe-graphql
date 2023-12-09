import {Attachment, CenterOfInterest, Friend, Message, MessageAttachment, Story, User} from "./models";

const isDev: boolean = process.env.NODE_ENV === 'development'
const dbInit = async () => {
    await User.sync({alter: isDev});

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

    await Attachment.sync({alter: isDev});
    await Message.sync({alter: isDev});
    await MessageAttachment.sync({alter: isDev});
    await Friend.sync({alter: isDev});
    await CenterOfInterest.sync({alter: isDev});
    await Story.sync({alter: isDev});
}

export default dbInit;