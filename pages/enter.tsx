import Image from "next/image";
import { auth, googleAuthProvider } from "../lib/firebase";
import { UserContext } from "../lib/context";
import { useContext } from "react";
import googleSSOImage from "../assets/btn_google_signin_dark_focus_web.png";
import { toast } from "react-hot-toast";

export default function Enter() {
  const { user, username } = useContext(UserContext);

  return <main>{user ? <SignOutButton /> : <SignInButton />}</main>;
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
    toast.success("Du ble logget inn");
  };
  return (
    <button className={"btn-google"} onClick={signInWithGoogle}>
      <Image src={googleSSOImage} />
    </button>
  );
}

function UserNameForm() {
  return null;
}

function SignOutButton() {
  const signout = async () => {
    await auth.signOut();
    toast.success("Du er logget ut");
  };
  return <button onClick={signout}>Sign Out</button>;
}
