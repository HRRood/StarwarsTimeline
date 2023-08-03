import styles from "./Page.module.css";
import { MediaTable } from "@/components/media/MediaTable/MediaTable";
import { GetMedia } from "@/repository/media/getMedia";
import { CreateMediaForm } from "@/components/media/CreateMediaForm/CreateMediaForm";

export default async function MediaTypes() {
  const mediaTypes = await GetMedia({ pageNumber: 1, pageSize: 10 });

  return (
    <div>
      <div className={styles.title_container}>
        <h1>Media types</h1>
        <CreateMediaForm />
      </div>
      <MediaTable media={mediaTypes} />
    </div>
  );
}
