import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import "./app.css";
import EpisodeBox from "./EpisodeBox";

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

function App() {
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [firstLocation, setFirstLocation] = useState("");
  const [lastLocation, setLastLocation] = useState("");
  const [episodeList, setEpisodeList] = useState([]);

  if (name == "") {
    getRick();
  }

  async function getRick() {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character/1",
      requestOptions
    );

    const data = await response.json();
    setName(data.name);
    setPic(data.image);
    setStatus(data.status);
    setSpecies(data.species);
    setGender(data.gender);
    setFirstLocation(data.origin.name);
    setLastLocation(data.location.name);
    setEpisodeList(data.episode);
  }

  async function getCharacter() {
    const characterNumber = Math.floor(Math.random() * (826 - 1) + 1);
    const url = "https://rickandmortyapi.com/api/character/" + characterNumber;

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    setName(data.name);
    setPic(data.image);
    setStatus(data.status);
    setSpecies(data.species);
    setGender(data.gender);
    setFirstLocation(data.origin.name);
    setLastLocation(data.location.name);
    setEpisodeList(data.episode);
  }

  return (
    <div className="App">
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid lightgray" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Powered by rickandmortyapi.com
          </Typography>
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={getCharacter}
          >
            RANDOMIZE
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography
          variant="h3"
          fontSize="5em"
          align="center"
          color="text.primary"
          sx={{ py: 2 }}
        >
          Rick and Morty <br />
          Random Character Info
        </Typography>
      </Container>

      <div class="characterCard">
        <div class="title">
          <h1>{name}</h1>
          <h2>Status: {status}</h2>
        </div>
        <div class="descBox">
          <img src={pic}></img>
          <div class="desc">
            <ul>
              Species: <br />
              {species}
            </ul>
            <ul>
              Gender: <br />
              {gender}
            </ul>
            <ul>
              First location seen: <br />
              {firstLocation}
            </ul>
            <ul>
              Last known location: <br />
              {lastLocation}
            </ul>
          </div>
        </div>
      </div>
      <div class="episodeList">
        <h1>Episodes Present In:</h1>
        <div class="episodeDiv">
          {episodeList.map((episode) => (
            <EpisodeBox episodeURL={episode} key={episode} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
