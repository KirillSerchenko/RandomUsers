import React, { Component } from 'react'
import {FormGroup,ControlLabel,FormControl} from 'react-bootstrap'

export default class EmailInput extends Component {

    render () {
        return (
            <FormGroup validationState={this.props.index==undefined?this.props.validF?"success":"error":this.props.valid[this.props.index]?"success":"error"}>
                <ControlLabel>Email</ControlLabel>
                <FormControl onKeyPress={this.enterHit} onChange={this.props.changed}  type="email" autoFocus placeholder={this.props.placeH}/>
            </FormGroup>
        )
    }
}

