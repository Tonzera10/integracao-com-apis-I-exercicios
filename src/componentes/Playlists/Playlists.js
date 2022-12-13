import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios"

function Playlists() {
    const [playlists, setPlaylists] = useState([])

    const headers = {
        headers: {
            Authorization: "everton"
        }
    }

    const getAllPlaylists = () => {
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",headers)
        .then((res) => {
            setPlaylists(res.data.result.list);
        })
        .catch((erro) => {
            alert(erro.response);
        })
    }

    useEffect(()=>{
        getAllPlaylists()
    },[])
  
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} idPlaylist={playlist.id}/>
            })}

        </div>
    );
}

export default Playlists;
