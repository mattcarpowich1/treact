import React, { Component } from 'react'

class Notes extends Component {

	render() {

		const notes = ["C", "C#", "D", "D#", 
								"E", "F", "F#", "G", 
								"G#", "A", "A#", "B"]

		let allnotes = []

		for (let i = 2; i < 7; i++) {
			let x = 0;
      for (let j = 0; j < notes.length; j++) {
        allnotes.push(
        	<button 
        		type="button"
  					key={x}
  					className="note-btn"
  					onClick={ () => {
  						this.props.selector(notes[j] + i)
  					}}>
  					{notes[j] + i}
					</button>
      	);
      	x++
      }
    }

		return (
			<div className="container notes">
				{allnotes}
			</div>
		)
	}

}

export default Notes