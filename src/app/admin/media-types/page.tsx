import styles from "./Page.module.css";
import { MediaTypeTable } from "@/components/mediaTypes/MediaTypeTable/MediaTypeTable";
import { GetMediaTypes } from "@/repository/mediaTypes/getMediaTypes";
import { CreateMediaTypeModal } from "@/components/mediaTypes/CreateMediaTypeModal/CreateMediaTypeModal";

export default async function MediaTypes() {
  const mediaTypes = await GetMediaTypes({ pageNumber: 1, pageSize: 10 });
  return (
    <div>
      <div className={styles.title_container}>
        <h1>Media types</h1>
        <CreateMediaTypeModal />
      </div>
      <MediaTypeTable mediaTypes={mediaTypes} />
    </div>
  );
}
