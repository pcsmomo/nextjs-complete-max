import EventItem from "./event-item";

function EventList(props) {
  const { items } = props;

  return (
    <ul>
      {items.map((event) => (
        // <EventItem key={event.id} {...event} />
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          date={event.date}
          location={event.location}
          image={event.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
