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
					<div className="beat-division">
						<span>Beat Division</span>
						<select onChange={this.props.beatChange}>
							<option
								value="16n">
								1/16
							</option>
							<option
								selected
								value="8n">
								1/8
							</option>
							<option
								value="4n">
								1/4
							</option>
						</select>
					</div>
					<div className="tempo">
						<button 
							type="button"
							onClick={this.props.upTempo}
							>+</button>
						<span>{this.props.tempo}</span><span>BPM</span>
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