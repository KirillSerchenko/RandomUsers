import React, { Component } from 'react'
import {FormGroup,ControlLabel,FormControl} from 'react-bootstrap'

export default class FirstNameInput extends Component {
    
    render () {
        return (
            <FormGroup >
                <ControlLabel>{this.props.inline?"Enter new name":"First Name"}</ControlLabel>
                <FormControl onChange={this.props.changed} autoFocus  type="text" placeholder={this.props.placeH} />{' '}
            </FormGroup>   
        )
    }
}

