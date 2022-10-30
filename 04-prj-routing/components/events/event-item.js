import Link from "next/link";

function EventItem(props) {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-AU", {
    // weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li>
      <img src={image} arl={title} />
      <div>
        <h2>TITLE</h2>
        <div>
          <time>{humanReadableDate}</time>
        </div>
        <div>
          <address>{formattedAddress}</address>
        </div>
      </div>
      <div>
        <Link href={exploreLink}>Explore Event</Link>
      </div>
    </li>
  );
}

export default EventItem;
