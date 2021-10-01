declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    username: string;
    picture?: string | null;
    sub?: string;
  }
}
