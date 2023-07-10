import { useState } from "react";
import "./app.css";

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

export default function EpisodeBox(props) {
  const [episode, setEpisode] = useState("");
  const [episodeName, setEpisodeName] = useState("");
  const [airDate, setAirDate] = useState("");
  const [url, setURL] = useState("");
  console.log(props.episodeURL);

  async function episodesFetch(episodeURL) {
    const response = await fetch(episodeURL, requestOptions);
    const data = await response.json();
    setEpisode(data.episode);
    setEpisodeName(data.name);
    setAirDate(data.air_date);
    setURL(episodeURL);
  }

  if (episode == "") {
    episodesFetch(props.episodeURL);
  }

  return (
    <div class="episodeBox">
      <h1>
        {episode} - {episodeName}
      </h1>
      <h1>{airDate}</h1>
    </div>
  );
}
