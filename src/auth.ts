
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';


 export const authOptions:NextAuthOptions={
   pages:{
    signIn:"/login"
   },
    providers:[
        Credentials({
            name:"Credentials",
            credentials:{
                email:{},
                password:{}
            },
            authorize:async (credentials)=>{

               const response=await fetch(`${process.env.API}/auth/signin`,{
                method:"post",
                body:JSON.stringify( {
                    email:credentials?.email,
                password:credentials?.password
            }),
               headers:{"Content-Type":"application/json"}


               });
               const payload=await response.json();
        
               if(payload.message==="success"){
                const decodedToken:{id:string}=jwtDecode(payload.token);
                return {
                    id: decodedToken.id,
                    user: payload.user,
                    token: payload.token,
                }
               }
            else{
                throw new Error(payload.message||"wrong credentials")
            }
              
            },

        })
    ],
    callbacks:{

      async jwt({ token, user }) {
        if(user){
        token.user = user?.user;
        token.token = user?.token;
        }
      return token;
    },
    async session({ session,  token }) {
        session.user = token.user;

        
      return session;
    },

    },

}