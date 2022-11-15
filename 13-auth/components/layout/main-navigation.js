import Link from "next/link";
// import {useSession} from 'next-auth/client'; // v3
import { useSession, signOut } from "next-auth/react";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  // const [ session, loading ] = useSession()  // v3
  const { data: session, status } = useSession();
  const loading = status === "loading";

  console.log(loading);
  console.log(session);

  function logoutHandler() {
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
