import React, { Component } from 'react'
import Controls from './controls.js'
import Stepper from './stepper.js'
import Notes from './notes.js'
import Tone from 'Tone'

let currentStep = 0;

class Sequencer extends Component {

	constructor() {
		super()
		this.state = {

			// sequence starts as a pleasant
			// IM7 - IVM7 arpeggio
			sequence: [
				"C3","E3", "G3","B3",
				"C3","E3","G3","B3",
				"F3","A3","C4","E4",
				"F3","A3","C4","E4"
			],

			// sequence is playing
			playing: false,

			// master tempo
			tempo: 120,

			// number of steps in the sequence
			numSteps: 16,

			// current step in the sequence
			currentStep: -1,

			//store the sound object
			sound: null,

			// store the loop object
			loop: null,

			// current note selected
			selectedNote: ""
		}

		this.playWasPressed = this.playWasPressed.bind(this)
		this.pauseWasPressed = this.pauseWasPressed.bind(this) 
		this.selectNote = this.selectNote.bind(this)
		this.alterStep = this.alterStep.bind(this)

	}

	// play button handler
	playWasPressed() {
		currentStep = 0
		this.state.loop.start()
	}

	// pause button handler
	pauseWasPressed() {
		this.state.loop.stop()
		this.setState({
			currentStep: -1
		})
		this.refs.stepper.off()
	}

	selectNote(e) {
		this.setState({
			selectedNote: e.target.value
		})
	}

	alterStep(step) {
		let sequence = this.state.sequence
		sequence[step] = this.state.selectedNote
		this.setState({
			sequence: sequence
		})
	}

	componentWillMount() {
		let sound = makeSynth(8).toMaster()
		let loop = makeLoop(sound, this.state.sequence, this.state.numSteps, this)
		this.setState({
			sound: sound, 
			loop: loop
		})
	}

	render() {

		// master tempo
		Tone.Transport.bpm.value = this.state.tempo
		Tone.Transport.start()

		return (
			<div className="main">
				<div className="notes-stepper">
					<Notes 
							selector={this.selectNote}
					/>
					<Stepper 
						ref="stepper"
						selected={this.state.selectedNote}
						sequence={this.state.sequence}
						playing={this.state.playing}
						paused={this.state.paused} 
						step={this.state.currentStep}
						alterStep={this.alterStep}/>
				</div>
				<Controls 
					play={this.playWasPressed}
					pause={this.pauseWasPressed} />
			</div>
		)

	}

}

function makeLoop(sound, sequence, numSteps, _this) {
	return new Tone.Loop(time => {

    if (currentStep >= numSteps) {
      currentStep = 0
    } 

    let current = currentStep
    let previous = ((currentStep - 1) + numSteps) % numSteps

    if (sequence[currentStep]) {
      sound.triggerAttackRelease(sequence[currentStep], "8n", time)
      _this.setState({
      	currentStep: currentStep
      })
    }
    currentStep++
  }, "8n")

}

function makeSynth(numVoices) {
	return new Tone.PolySynth(numVoices, Tone.Synth)
}

export default Sequencer