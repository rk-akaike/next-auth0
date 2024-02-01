import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";

const Home = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <div>
      <h1>Home</h1>
      {user ? (
        <div>
          <img src={`${user.picture}`} alt={`${user.name}`} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <Link href="/profile">Profile</Link>
          <a href="/api/auth/logout">Logout</a>
        </div>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </div>
  );
};

export default withPageAuthRequired(Home);
