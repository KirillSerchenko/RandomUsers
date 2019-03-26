import React, { Component } from 'react'
import FirstNameInp from '../Inputs/FirstNameInput';


export default class inlineEditName extends Component {
  
    state={ 
        nameClicked:false
    }

    clicked(update,index){
        this.setState({nameClicked:!this.state.nameClicked})
        update(index)
    }
  
    enterHit=(e)=>{
        if(e.key === "Enter")
            this.clicked(this.props.updateIndex,this.props.index)
    }

    render() {
        return (
            <td onKeyPress={this.enterHit} onClick={()=>this.clicked(this.props.updateIndex,this.props.index)}> {this.state.nameClicked?<FirstNameInp inline="OK" placeH={this.props.name} changed={this.props.change} />:this.props.name} </td> 
    )
  }
}
