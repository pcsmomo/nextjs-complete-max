import { Fragment, useState } from "react";

import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadedFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <button onClick={loadedFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  // doesn't need to fetch as the APIs are in the same project
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
