import Link from "next/link";
import styles from "./AdminNavBar.module.css";
import Image from "next/image";

export const AdminNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/admin">
          <Image src="/star_wars_logo.png" fill alt="Star Wars Logo" className={styles.logoImage} />
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/admin/events">Events Management</Link>
        </li>
        <li>
          <Link href="/admin/characters">Characters Management</Link>
        </li>
      </ul>
    </nav>
  );
};
