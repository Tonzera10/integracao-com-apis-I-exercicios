import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios"
import { Header } from "../Header/Header";

function Playlists() {
    const [playlists, setPlaylists] = useState([])
    const [novaPlaylist, setNovaPlaylist] = useState("")
    const [buscaPlaylist, setBuscaPlaylist] = useState("")

    const headers = {
        headers: {
            Authorization: "everton"
        }
    }

    const getAllPlaylists = async() => {
        try{
            const result = await axios
            .get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
            headers)
            setPlaylists(result.data.result.list);
        }catch(erro){
            alert(erro.response);
        }
    }

    const searchPlaylist = async() => {
        if(buscaPlaylist.length === 0){
            getAllPlaylists()
        }else{
            try{
                const response = await axios
                .get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${buscaPlaylist}`, headers)
                const result = response?.data?.result?.playlist
                setPlaylists(result)
            }catch(err){
                alert(err.data);
            }
        }
    }

    const createPlaylist = async(nome) => {
        const body = {
          name: nome
        }
        try{
        await axios
        .post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`, body, headers)
        setNovaPlaylist("")
        getAllPlaylists()
      }catch(err){
        alert(err.response)
      }
    }

    useEffect(()=>{
        getAllPlaylists()
    },[])
  
    return (
        <div>
            <Header
            setNovaPlaylist={setNovaPlaylist}
            novaPlaylist={novaPlaylist}
            createPlaylist={createPlaylist}
            searchPlaylist={searchPlaylist}
            buscaPlaylist={buscaPlaylist}
            setBuscaPlaylist={setBuscaPlaylist}
            />
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} idPlaylist={playlist.id} setPlaylists={setPlaylists} getAllPlaylists={getAllPlaylists}/>
            })}

        </div>
    );
}

export default Playlists;
