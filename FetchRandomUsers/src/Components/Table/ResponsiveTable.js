import React, { Component } from 'react'
import {Table,Button} from 'react-bootstrap'
import Name from '../inlineTd/inlineEditName'
import Email from '../inlineTd/inlineEditEmail'



export default class ResponsiveTable extends Component {

  render() {
    return (
        <Table style={{marginTop:"10px"}}  bordered  responsive >
                 <thead style={{color:"white"}}>
                   <tr>
                     <th>#</th>
                     <th>Gender</th>
                     <th>Name</th>
                     <th>Age</th>
                     <th>Email</th>
                     <th>Picture</th>
                     <th>Delete</th>
                     <th>Edit</th>
                   </tr>
                 </thead>

                 <tbody>
                   {this.props.users.map((el,index)=>
                        <tr key={index} className={`fade-in dataRow`} >
                        <td>{index}</td> 
                        <td>{el.gender}</td>
                        <Name name={el.name} change={this.props.changedName} updateIndex={(ind)=>this.props.updateIndex(ind)} index={index}/>
                        <td>{el.age}</td>
                        <Email valid={this.props.valid} email={el.email} change={this.props.changedEmail} updateIndex={(ind)=>this.props.updateIndex(ind)} index={index}/>
                        <td><img src={el.picture} style={{width:"50px",borderRadius:"50%",border:"1px solid black"}} alt="person"/></td>
                        <td><Button bsStyle="danger" onClick={()=>this.props.delete(index)}>Delete</Button></td>
                        <td><Button bsStyle="primary" onClick={()=>this.props.edit(index,true)}>Edit</Button></td>
                        </tr>
                     
                      )}
               </tbody>
       </Table>
    )
  }
}

