import react from "react"
import { StyleLabel } from "./styled"

export const Header = (props) => {
    return (
        <StyleLabel>
        <input 
        onChange={(e)=> props.setNovaPlaylist(e.target.value)}
        value={props.novaPlaylist}
        placeholder="Playlist"
        />
        <button onClick={()=>props.createPlaylist(props.novaPlaylist)}>Adicionar Playlist</button>
      </StyleLabel>
    )
}