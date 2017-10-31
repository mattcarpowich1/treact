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
						<i class="fa fa-play" aria-hidden="true"></i>
					</button>
					<button 
						type="button"
						className="pause"
						onClick={this.props.pause}>
						<i class="fa fa-pause" aria-hidden="true"></i>
					</button>
					<div className="tempo">
						<button 
							type="button"
							onClick={this.props.upTempo}
							>+</button>
						<span>{this.props.tempo}BPM</span>
						<button
							type="button"
							onClick={this.props.downTempo}
							>-</button>
					</div>
				</div>
			)
		
	}

}

export default Controls