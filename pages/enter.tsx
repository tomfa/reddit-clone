import Image from "next/image";
import { auth, googleAuthProvider } from "../lib/firebase";
import { UserContext } from "../lib/context";
import { useContext } from "react";
import googleSSOImage from '../assets/btn_google_signin_dark_focus_web.png'

export default function Enter () {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {user ? (
        !username ? (
          <UserNameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <button className={'btn-google'} onClick={signInWithGoogle}>
      <Image src={googleSSOImage} />
    </button>
  );
}

function UserNameForm() {
  return null;
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}
