import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'

export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [nomeMusica, setNomeMusica] = useState("")
    const [artista, setArtista] = useState("")
    const [url, setUrl] = useState("")

    const getPlaylistTracks = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, {
            headers: {
                Authorization: "mariana-trancoso-ammal"
            }
        })
        .then((resposta) => {
            console.log(resposta.data.result.tracks)
            setMusicas(resposta.data.result.tracks)
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    useEffect(() => {getPlaylistTracks()}, 
    [])

    const addTrackToPlaylist = () => {
        const body = {
            name: nomeMusica, 
            artist: artista,
            url: url
        }
        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, {
            headers: {
                Authorization: "mariana-trancoso-ammal"
            }
        })
        .then((resposta) => {
            console.log(resposta)
            getPlaylistTracks()
            setArtista("")
            setNomeMusica("")
            setUrl("")
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    const removeTrackFromPlaylist = (id) => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`, {
            headers: {
                Authorization: "mariana-trancoso-ammal"
            }
        })
        .then((resposta) => {
            console.log(resposta)
            getPlaylistTracks()
        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>removeTrackFromPlaylist(musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica 
                    placeholder="artista" 
                    value={artista}
                    onChange={(e) =>setArtista(e.target.value) }/>
                <InputMusica 
                    placeholder="musica" 
                    value={nomeMusica}
                    onChange={(e) => setNomeMusica(e.target.value)}/>
                <InputMusica 
                    placeholder="url" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}/>
                <Botao onClick={addTrackToPlaylist} >Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

