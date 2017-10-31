import React, { Component } from 'react'
import Tone from 'Tone'
import StartAudioContext from 'startaudiocontext'

class Controls extends Component {

	componentDidMount() {
		StartAudioContext(Tone.context, '.play').then(() => {
			console.log('Context')
		})
	}

	render() {

			return (
				<div className="controls">
					<button 
						type="button" 
						className="play"
						onClick={this.props.play}>
						PLAY
					</button>
					<button 
						type="button"
						className="pause"
						onClick={this.props.pause}>
						PAUSE 
					</button>
				</div>
			)
		
	}

}

export default Controls