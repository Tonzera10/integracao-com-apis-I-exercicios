import React, { useEffect, useState } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica,
} from "./styled";
import axios from "axios";

export default function Musicas(props) {
  const [musicas, setMusicas] = useState([]);
  const [artist, setArtist] = useState("");
  const [music, setMusic] = useState("");
  const [url, setUrl] = useState("");

  const headers = {
    headers: {
      Authorization: "everton",
    },
  };

  const deleteTracks = (idMusica) => {
    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.idPlaylist}/tracks/${idMusica}`, headers)
    .then((res)=>{
        alert("Música deletada com sucesso!")
        getPlaylistTracks();
    })
    .catch((err)=>{
        alert(err.reponse)
    })
  }

  const addTrackToPlaylist = (artist, music, url) => {
    const body = {
      name: music,
      artist: artist,
      url: url,
    };

    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.idPlaylist}/tracks`,
        body,
        headers
      )
      .then((res) => {
        alert("Música adicionada com sucesso!");
        setMusic("");
        setArtist("");
        setUrl("");
        getPlaylistTracks();
      })
      .catch((err) => {
        alert(err.response);
      });
  };

  const getPlaylistTracks = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.idPlaylist}/tracks`,
        headers
      )
      .then((res) => {
        setMusicas(res.data.result.tracks);
      })
      .catch((erro) => {
        alert(erro.response);
      });
  };

  useEffect(() => {
    getPlaylistTracks();
  }, []);

  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={()=>deleteTracks(musica.id)}>X</button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <InputMusica
          onChange={(e) => setArtist(e.target.value)}
          value={artist}
          placeholder="artista"
        />
        <InputMusica
          onChange={(e) => setMusic(e.target.value)}
          value={music}
          placeholder="musica"
        />
        <InputMusica
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          placeholder="url"
        />
        <Botao onClick={() => addTrackToPlaylist(artist, music, url)}>
          Adicionar musica
        </Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
