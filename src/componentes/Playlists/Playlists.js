import axios from "axios";
import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";

function Playlists() {
    const [playlists, setPlaylists] = useState([])

    const getAllPlaylists = () => {
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", {
            headers: {
                Authorization: "mariana-trancoso-ammal"
            }
        })
        .then((resposta) => {
            console.log(resposta.data.result)
            setPlaylists(resposta.data.result.list)
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    useEffect(() => {getAllPlaylists()}, 
    [])

    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas  getAllPlaylists={getAllPlaylists} key={playlist.id} playlist={playlist} id={playlist.id}/>
            })}

        </div>
    );
}

export default Playlists;
