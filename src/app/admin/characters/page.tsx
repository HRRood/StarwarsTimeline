import { CharactersTable } from "@/components/characters/CharactersTable/CharactersTable";
import styles from "./Page.module.css";
import { CreateCharacterModal } from "@/components/characters/CreateCharacterModal/CreateCharacterModal";

export default async function Characters() {
  return (
    <div>
      <div className={styles.title_container}>
        <h1>Characters</h1>
        <CreateCharacterModal />
      </div>
      <CharactersTable />
    </div>
  );
}
