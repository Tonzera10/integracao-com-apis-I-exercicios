import React, { useEffect, useState } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica,
  StyleHeader,
  StyleLabel,
} from "./styled";
import axios from "axios";
import Playlists from "../Playlists/Playlists";
import { Header } from "../Header/Header";

export default function Musicas(props) {
  const [musicas, setMusicas] = useState([]);
  const [artist, setArtist] = useState("");
  const [music, setMusic] = useState("");
  const [url, setUrl] = useState("");
  const [novaPlaylist, setNovaPlaylist] = useState("")

  const headers = {
    headers: {
      Authorization: "everton",
    },
  };

  const deleteTracks = async(idMusica) => {
    try{
      await axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.idPlaylist}/tracks/${idMusica}`, headers)
      alert("Música deletada com sucesso!")
      getPlaylistTracks();
    }catch(err){
        alert(err.reponse)
    }
  }

  const addTrackToPlaylist = async(artist, music, url) => {
    const body = {
      name: music,
      artist: artist,
      url: url,
    };

    try{
      await axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.idPlaylist}/tracks`,
        body,
        headers
      )
      alert("Música adicionada com sucesso!");
      setMusic("");
      setArtist("");
      setUrl("");
      getPlaylistTracks();
    }catch(err){
        alert(err.response);
      };
  };

  const getPlaylistTracks = async() => {
    try{
    const result = await axios
    .get(
      `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.idPlaylist}/tracks`,
      headers
      )
      setMusicas(result.data.result.tracks);
    }catch(erro){
        alert(erro.response);
      };
  };

  const deletePlaylist = async() => {
    try{
        await axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.idPlaylist}`, headers)
        props.getAllPlaylists()
    }catch(e){
        alert(e.response)
    }
  }

  const createPlaylist = async(nome) => {
    const body = {
      name: nome
    }
    try{
      const result = await axios
    .post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`, body, headers);
    props.setPlaylists(...props.playlists,result);
    props.setNovaPlaylist("")
    props.getAllPlaylists()
    console.log(props.playlists);
  }catch(err){
    alert(err.response)
    console.log(err.response)
  }
}


  useEffect(() => {
    getPlaylistTracks();
  }, []);

  return (
    <>
    <Header
    setNovaPlaylist={setNovaPlaylist}
    novaPlaylist={novaPlaylist}
    createPlaylist={createPlaylist}
    />
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      <button onClick={() => deletePlaylist()}>X</button>
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
    </>
  );
}
