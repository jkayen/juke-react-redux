import React from 'react';
import axios from 'axios';
import store from '../store';
import {setLyrics, fetchLyrics} from '../action-creators/lyrics';
import Lyrics from '../components/Lyrics'

export default class LyricsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState())
    this.setArtist = this.setArtist.bind(this)
    this.setSong = this.setSong.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  setArtist(artistSearchText) {
    this.setState({ artistQuery: artistSearchText })
  }
  setSong(songSearchText) {
    this.setState({ songQuery: songSearchText })
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.artistQuery && this.state.songQuery) {
    store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));
  }

  }
  render() {
    return (
      <Lyrics
        setArtist={this.setArtist}
        setSong={this.setSong}
        text={this.state.lyrics.text}
        artistQuery={this.state.artistQuery}
        songQuery={this.state.songQuery}
        handleSubmit={this.handleSubmit} />
    )
  }
}
