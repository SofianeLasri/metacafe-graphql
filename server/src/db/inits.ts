import User from "./models/User";

const isDev: boolean = process.env.NODE_ENV === 'development'
const dbInit = async () => {
    await User.sync({alter: isDev});
}

export default dbInit;