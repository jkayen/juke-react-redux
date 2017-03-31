import React from 'react';
import axios from 'axios';
import store from '../store';
import setLyrics from '../action-creators/lyrics';
import Lyrics from '../components/Lyrics'

export default class LyricsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState() )
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
    this.setState({artistQuery: artistSearchText})
  }
  setSong(songSearchText) {
    this.setState({songQuery: songSearchText})
  }
  handleSubmit(event) {
    event.preventDefault()
    if (this.state.artistQuery && this.state.songQuery) {
      axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
      .then(response => response.data.lyric)
      .then(lyrics => store.dispatch(setLyrics(lyrics)))
      .catch(console.error)
    }
  }
  render() {
    return (
      <Lyrics
      setArtist={this.setArtist}
      setSong={this.setSong}
      text={this.state.text}
      artistQuery={this.state.artistQuery}
      songQuery={this.state.songQuery}
      handleSubmit={this.handleSubmit} />
    )
  }
}
