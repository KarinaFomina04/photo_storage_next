import styles from './page.module.css'
import Link from "next/link";
import PhotoPage from "@/components/PhotoPage/PhotoPage";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href={'api/auth/signout'}>
          <div className={styles.logOut}>
              Logout
          </div>
      </Link>
        <PhotoPage/>
    </main>
  )
}
