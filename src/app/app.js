import React, { Component } from 'react'
import { render } from 'react-dom'
import Title from './title.js'
import Sequencer from './sequencer.js'
import Tone from 'Tone'
import StartAudioContext from 'startaudiocontext'

class App extends Component {

	render() {

		return (
			<div className="container"> 
				<Title />
				<Sequencer />
			</div>
		)
	}

}

render(<App />, 
	document.getElementById('app'))

