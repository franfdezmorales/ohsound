import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";



export const authOptions = {
  
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
    }),
  ]
}

export default NextAuth(authOptions);
