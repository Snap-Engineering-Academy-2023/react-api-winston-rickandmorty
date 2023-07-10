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
  const [search, setSearch] = useState("");

  async function searchCharacter() {
    const response = await fetch("https://rickandmortyapi.com/api/character/?name="+search, requestOptions)
    const data = await response.json()
    setName(data.results[0].name);
    setPic(data.results[0].image);
    setStatus(data.results[0].status);
    setSpecies(data.results[0].species);
    setGender(data.results[0].gender);
    setFirstLocation(data.results[0].origin.name);
    setLastLocation(data.results[0].location.name);
    setEpisodeList(data.results[0].episode);
  }

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

  async function getRandomCharacter() {
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
          <Typography variant="h7" sx={{ flexGrow: 1 }}>
            Powered by rickandmortyapi.com
          </Typography>
          <Typography
            variant="h3"
            fontSize="3em"
            color="text.primary"
            sx={{
              py: 2,
              flexGrow: 1
            }}
          >
            Rick and Morty Characters
          </Typography>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              searchCharacter();
            }}
          >
            Search
          </Button>
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={getRandomCharacter}
          >
            RANDOMIZE
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ my: 4 }}>
      </Container>
      <div class="characterCard">
        <div class="title">
          <h1>{name}</h1>
          <h2>Status: {status}</h2>
        </div>
        <div class="box">
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
