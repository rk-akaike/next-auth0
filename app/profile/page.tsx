import { getSession } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default withPageAuthRequired(
  async function ProfileClient() {
    const session = await getSession();
    const user = session?.user;

    return user ? (
      <div>
        <h1>Profile</h1>
        <img src={`${user.picture}`} alt={`${user.name}`} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Link href="/">Home</Link>
        <a href="/api/auth/logout">Logout</a>
      </div>
    ) : (
      <a href="/api/auth/login">Login</a>
    );
  },
  { returnTo: "/profile" }
);
