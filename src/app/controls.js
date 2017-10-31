import React, { Component } from 'react'

class Controls extends Component {

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