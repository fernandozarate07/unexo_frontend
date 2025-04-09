// import Image from "next/image";
import styles from "./page.module.css";
import Hero from "./sections/hero";
import HowWorks from "./sections/howWorks";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <HowWorks />
      </main>
    </div>
  );
}
