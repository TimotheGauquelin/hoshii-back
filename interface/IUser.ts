export default interface IUser {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isActive: boolean;
    picture?: string;
    friends: [];
    lists: [];
}