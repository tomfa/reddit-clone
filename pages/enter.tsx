import Image from "next/image";
import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { UserContext } from "../lib/context";
import { useCallback, useContext, useEffect, useState } from "react";
import googleSSOImage from "../assets/btn_google_signin_dark_focus_web.png";
import { toast } from "react-hot-toast";
import { debounce } from "../utils/debounce";

export default function Enter() {
  const { user, username } = useContext(UserContext);

  if (user && !username) {
    return (
      <main>
        <UsernameForm />
      </main>
    );
  }

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

function SignOutButton() {
  const signout = async () => {
    await auth.signOut();
    toast.success("Du er logget ut");
  };
  return <button onClick={signout}>Sign Out</button>;
}

function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const createUser = async (username: string) => {
    if (!user) {
      return;
    }

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${username}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: username,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  useEffect(() => {
    if (!formValue && !username && user?.email) {
      createUser(user?.email);
    }
  }, [username, formValue, user]);

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUser(formValue);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  if (username || user?.email) {
    return null;
  }

  return (
    <section>
      <h3>Velg brukernavn</h3>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="myname"
          value={formValue}
          onChange={onChange}
        />
        <UsernameMessage
          username={formValue}
          isValid={isValid}
          loading={loading}
        />
        <button type="submit" className="btn-green" disabled={!isValid}>
          Velg
        </button>
      </form>
    </section>
  );
}

function UsernameMessage({
  username,
  isValid,
  loading,
}: {
  username: string;
  isValid: boolean;
  loading: boolean;
}) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} er ledig!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">Brukernavnet er taken!</p>;
  } else {
    return <p></p>;
  }
}
