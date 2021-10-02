import Image from "next/image";
import Link from "next/link";
import { useUserData } from "../lib/hooks";

// Top navbar
export default function Navbar() {
  const { user, username } = useUserData();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn btn-logo">ACO REDDIT</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li>
              <Link href={`/${username}`}>
                {user?.image && (
                  <Image src={user?.image} width={96} height={96} />
                )}
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/login">
              <button className="btn btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
