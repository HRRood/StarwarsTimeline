import { CharactersTable } from "@/components/characters/CharactersTable/CharactersTable";
import styles from "./Page.module.css";
import { GetCharacters } from "@/repository/characters/getCharacters";
import { CreateCharacterModal } from "@/components/characters/CreateCharacterModal/CreateCharacterModal";

export default async function Characters() {
  const characters = await GetCharacters({ pageSize: 10, pageNumber: 1 });
  return (
    <div>
      <div className={styles.title_container}>
        <h1>Characters</h1>
        <CreateCharacterModal />
      </div>
      <CharactersTable characters={characters} />
    </div>
  );
}
