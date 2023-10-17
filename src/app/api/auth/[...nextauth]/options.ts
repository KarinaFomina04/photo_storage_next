import type {NextAuthOptions, User} from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
export const options: NextAuthOptions = {
    providers: [
       CredentialsProvider({
           credentials: {
               username: {label: "Username", type: "text"},
               password: {label: "Password", type: "password"}
           },
           authorize(credentials) {
               const {username, password} = credentials as {
                   username: string;
                   password: string;
               }
               if (username === 'test' && password === 'test') return {} as User
               return null
           }
       })
    ],
}