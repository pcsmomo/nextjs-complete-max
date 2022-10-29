import { getFeaturedEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";

function AllEventsPage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <h1>All Events</h1>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default AllEventsPage;
