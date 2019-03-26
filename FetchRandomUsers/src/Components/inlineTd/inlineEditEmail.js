import React, { Component } from 'react'
import EmailInp from '../Inputs/EmailInput';

export default class inlineEditEmail extends Component {
  
    state={
        emailClicked:false
      }
  
  
    clicked(update,index){
        this.setState({emailClicked:!this.state.emailClicked})
        update(index)
    }

    enterHit=(e)=>{
        if(e.key === "Enter")
            this.clicked(this.props.updateIndex,this.props.index)
    }
    

    render() {
        return ( 
            <td onKeyPress={this.enterHit} onClick={()=>this.clicked(this.props.updateIndex,this.props.index)}>{this.state.emailClicked?<EmailInp valid={this.props.valid} index={this.props.index}  placeH={this.props.email} changed={this.props.change}/>:this.props.email}</td> 
    )
  }
}
