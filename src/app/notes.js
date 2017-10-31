import React, { Component } from 'react'

class Notes extends Component {

	render() {

		const notes = ["C", "C#", "D", "D#", 
								"E", "F", "F#", "G", 
								"G#", "A", "A#", "B"]

		let allnotes = []

		allnotes.push(
			<option 
    		// type="button"
				className="note-btn"
				value="">
				EMPTY
			</option>
		)

		for (let i = 2; i < 7; i++) {
			let x = 0;
      for (let j = 0; j < notes.length; j++) {
      	if (notes[j] + i === "C4") {
      		allnotes.push(
	        	<option 
	        		// type="button"
	  					key={x}
	  					className="note-btn"
	  					selected
	  					value={notes[j] + i}>
	  					{notes[j] + i}
						</option>
      		);
      	} else {
      		allnotes.push(
	        	<option 
	        		// type="button"
	  					key={x}
	  					className="note-btn"
	  					value={notes[j] + i}>
	  					{notes[j] + i}
						</option>
	      	);
      	}   
      	x++
      }
    }

		return (
			<div className="notes">
				<select 
					size="6" 
					onChange={this.props.selector}>
					{allnotes}
				</select>
			</div>
		)
	}

}

export default Notes