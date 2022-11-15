// import { useState, useEffect } from "react";
// import { useSession, getSession } from "next-auth/react";

import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Alternate way2: using getSession on client side
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedSession, setLoadedSession] = useState();

  // useEffect(() => {
  //   getSession().then((session) => {
  //     setLoadedSession(session);
  //     setIsLoading(false);
  //     if (!session) {
  //       window.location.href = "/auth";
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  // Alternate way1: using getSession on client side
  // const [session, loading] = useSession(); // v3
  // const { data: session, status } = useSession();
  // const loading = status === "loading";

  // if (!session) {
  //   window.location.href = "/auth";
  //   return <p className={classes.profile}>Checking...</p>;
  // }

  // useEffect(() => {
  //   if (!session) {
  //     window.location.href = "/auth";
  //   }
  // }, [session]);

  // if (loading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
