import { Button } from "@mui/material";
import { EventsDataGrid } from "../components/EventsDataGrid";

import styles from "./Page.module.css";
import { GetEvents } from "@/stores/events/getEvents";

export default async function Events() {
  const events = await GetEvents({ pageNumber: 1, pageSize: 2 });
  return (
    <div>
      <div className={styles.title_container}>
        <h1>Events</h1>
        <Button variant="contained" color="success" type="button">
          +
        </Button>
      </div>
      <EventsDataGrid events={events} />
    </div>
  );
}
