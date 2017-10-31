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

			drumSequence: [
				"C2", "E2", "C#2", "E2",
				"C2", "E2", "C#2", "E2",
				"C2", "E2", "C#2", "E2",
				"C2", "E2", "C#2", "E2",
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

			// store drum loop object
			drumLoop: null,

			// current note selected
			selectedNote: "",

			// beat division of the loop
			beatDivision: "8n",

			// toggle drums 
			drums: false
		}

		this.playWasPressed = this.playWasPressed.bind(this)
		this.pauseWasPressed = this.pauseWasPressed.bind(this) 
		this.selectNote = this.selectNote.bind(this)
		this.alterStep = this.alterStep.bind(this)
		this.upTempo = this.upTempo.bind(this)
		this.downTempo = this.downTempo.bind(this)
		this.beatChange = this.beatChange.bind(this)
		this.addDrums = this.addDrums.bind(this)

	}

	// play button handler
	playWasPressed() {
		currentStep = 0
		this.state.loop.start()
	}

	// pause button handler
	pauseWasPressed() {
		if (this.state.drums) {
			this.state.drumLoop.stop()
		}
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

	upTempo() {
		let newTempo = this.state.tempo + 1
		this.setState({
			tempo: newTempo
		})
		Tone.Transport.bpm.value = this.state.tempo
	}

	downTempo() {
		let newTempo = this.state.tempo - 1
		this.setState({
			tempo: newTempo
		})
		Tone.Transport.bpm.value = this.state.tempo
	}

	beatChange(e){
		this.state.loop.stop()
		this.setState({
			beatDivision: e.target.value
		})
		let loop = makeLoop(this.state.sound, 
												this.state.sequence, 
												this.state.numSteps,
												e.target.value,
												this, 
												this.state.drums)
		this.setState({
			loop: loop
		})
		loop.start()
	} 

	addDrums() {
		if (this.state.drums) {
			this.state.drumLoop.stop()
			this.setState({
				drums: false
			})
		} else {

			this.state.loop.stop()

			this.setState({
				drums: true
			})

			let sampler = new Tone.Sampler({
				"C2" : "./assets/sounds/kick1.mp3",
				"C#2" : "./assets/sounds/snare1.mp3",
				"D2" : "./assets/sounds/block1.mp3",
				"D#2" : "./assets/sounds/clap1.mp3",
				"E2" : "./assets/sounds/hat1.mp3"
			}, () => {
				console.log("sampler")
			})

			sampler = sampler.toMaster()

			sampler.volume.value = 3
			sampler.attack = 0.03

			let loop = makeLoop(this.state.sound, 
													this.state.sequence, 
													this.state.numSteps,
													this.state.beatDivision,
													this)

			let drumLoop = makeDrumLoop(sampler,
																	this.state.drumSequence,
																	this.state.numSteps,
																	this.state.beatDivision,
																	this)

			this.setState({
				loop: loop,
				drumLoop: drumLoop
			})
			// Tone.Transport.start()
			drumLoop.start()
			loop.start()

		}
		
	}

	componentWillMount() {
		Tone.Transport.bpm.value = this.state.tempo
		Tone.Transport.start()
		let sound = makeSynth(8).toMaster()
		sound.volume.value = -1
		let loop = makeLoop(sound, 
												this.state.sequence, 
												this.state.numSteps,
												this.state.beatDivision,
												this)
		this.setState({
			sound: sound, 
			loop: loop,
		})
	}

	render() {

		return (
			<div className="main">
				<div className="notes-stepper">
					<Notes 
							selector={this.selectNote}
							toggleBeat={this.addDrums}
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
					pause={this.pauseWasPressed} 
					beatChange={this.beatChange}
					upTempo={this.upTempo}
					downTempo={this.downTempo}
					tempo={this.state.tempo}/>
			</div>
		)
	}

}

function makeLoop(sound, sequence, numSteps, div, 
									_this) {
	return new Tone.Loop(time => {

    if (currentStep >= numSteps) {
      currentStep = 0
    } 

    let current = currentStep
    let previous = ((currentStep - 1) + numSteps) % numSteps

    if (sequence[currentStep]) {
      sound.triggerAttackRelease(sequence[currentStep], "8n", time)
    }
    _this.setState({
    	currentStep: currentStep
    })
    currentStep++
  }, div)

}

function makeDrumLoop(sampler, sequence, numSteps, div, _this) {
	return new Tone.Loop(time => {

    if (currentStep >= numSteps) {
      currentStep = 0
    } 

    let current = currentStep
    let previous = ((currentStep - 1) + numSteps) % numSteps

    if (sequence[currentStep]) {
      sampler.triggerAttack(sequence[currentStep], time)
    }
  }, div)

}

function makeSynth(numVoices) {
	return new Tone.PolySynth(numVoices, Tone.Synth)
}

export default Sequencer