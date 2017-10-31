import React, { Component } from 'react'

class Stepper extends Component {

	constructor() {
		super()
		this.state = {
			selected: -1
		}
		this.off = this.off.bind(this)
	}

	off() {
		return this.render()
	}

	render() {

		let steps = []
		for (let i = 0; i < 16; i++) {
			let active = ""
			let note = this.props.sequence[i]
			if (this.props.step === i) {
				active = "playing"
			}
			steps.push(
				<button
					key={i}
					type="button"
					className={ "step " + active }
					onClick={() => {
						this.props.alterStep(i)
					}}>
					{note}
				</button>
			)
		}

		return (
			<div className="steps">
				{ steps }
			</div>
		)
	}

}

export default Stepper