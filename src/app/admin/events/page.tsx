import styles from "./Page.module.css";
import { GetEvents } from "@/repository/events/getEvents";
import { EventsTable } from "@/components/events/EventsTable/EventsTable";
import { CreateEventForm } from "@/components/events/CreateEventForm/CreateEventForm";

export default async function Events() {
  const events = await GetEvents({ pageNumber: 1, pageSize: 10 });
  return (
    <div>
      <div className={styles.title_container}>
        <h1>Events</h1>
        <CreateEventForm />
      </div>
      <EventsTable events={events} />
    </div>
  );
}
