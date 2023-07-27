import styles from "./Page.module.css";
import { GetEvents } from "@/stores/events/getEvents";
import { CreateEventModal } from "../../../components/CreateEventModal/CreateEventModal";
import { EventsTable } from "@/components/EventsTable/EventsTable";

export default async function Events() {
  const events = await GetEvents({ pageNumber: 1, pageSize: 10 });
  return (
    <div>
      <div className={styles.title_container}>
        <h1>Events</h1>
        <CreateEventModal />
      </div>
      <EventsTable events={events} />
    </div>
  );
}
