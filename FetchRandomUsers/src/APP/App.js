import React, {Component} from 'react';
import './App.css';
import fetch from 'node-fetch'
import {Grid,Row,Button} from 'react-bootstrap'
import ResponsiveTable from '../Components/Table/ResponsiveTable'
import EmailInp from '../Components/Inputs/EmailInput'
import NameInp from '../Components/Inputs/FirstNameInput'

export default class App extends Component {
  
  state = {
        placeholder:[],
        fetchedIndex:null,
        replaceOneStatus:false,
        index:0,//Edit user in this index
        ageValue:0,//editted age value
        emailValue:"",//editted email value
        nameValue:"",//editted name value
        genderValue:"",//editted gender value
        users:[],//Client users array show on GUI
        edit:false,//Display editted form or not 
        valid:[],
        validF:false
  }

  //Email input changes save
  emailChangeHandler=(e)=>{
    const regex=/[\w\.-]+@[\w\.-]+\.\w{2,4}/
    if(regex.test(e.target.value)){
      const validTemp=this.state.valid
      validTemp[this.state.index]=true
      const tempArr=[...this.state.users]
      tempArr[this.state.index].email=e.target.value
      this.setState({users:[...tempArr],valid:[...validTemp],validF:true})
      
    }
    else{
      const validTemp=this.state.valid
      validTemp[this.state.index]=false
      this.setState({valid:[...validTemp],validF:false})
     
   }
  }
  //Name input changes save
  nameChangeHandler=(e)=>{
    const tempArr=[...this.state.users]
    tempArr[this.state.index].name=e.target.value
    this.setState({users:[...tempArr]})
  }
  //Save index of edited user in users array and according that show form
  edit=(index,edited)=>this.setState({index:index,edit:edited,placeholder:[this.state.users[index].name,this.state.users[index].email]})
  
  updateIndex=(index)=>this.setState({index})
  //Confirms changes to specific index in state

  confirm=()=>{
    this.setState({edit:false})
  }
  //Delete user from users array with filter method 
  delete=(id)=>{
   const temp=this.state.users
   const filtered=temp.filter((el,index)=>id !== index)
   this.setState({users:[...filtered]})
}
//Get Random User from API and update users array in state
  get=()=>{
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data =>{
        const gender=data.results[0].gender
        const name=data.results[0].name.first
        const email=data.results[0].email
        const age=data.results[0].dob.age
        const picture=data.results[0].picture.medium
        const tempArr=this.state.users
        tempArr.push({
        gender,
        name,
        email,
        age,
        picture
        })
         this.setState({users:[...tempArr]})
       })
  }

 stop=()=>{
   clearInterval(this.state.fetchedIndex)
   this.setState({fetchedIndex:null,replaceOneStatus:null})
 }


  //Generate user in index 0 after 5 seconds
  generate=()=>{
    const fetchedIndex=setInterval(()=>{
      fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data =>{
        const gender=data.results[0].gender
        const name=data.results[0].name.first
        const email=data.results[0].email
        const age=data.results[0].dob.age
        const picture=data.results[0].picture.medium
        const tempArr=this.state.users
        tempArr[0].gender=gender
        tempArr[0].name=name
        tempArr[0].email=email
        tempArr[0].age=age
        tempArr[0].picture=picture
        this.setState({users:[...tempArr]})
       })
    },5000)

    this.setState({
      replaceOneStatus:true,
      fetchedIndex:fetchedIndex
    })
  }

//Call when component rendered
  componentDidMount(){
    //If users in local take from local else make request 
    const myUsers = localStorage.getItem("users");
          
          if (myUsers) {
            this.setState({ users: JSON.parse(myUsers) });
          }

          else{
            fetch('https://randomuser.me/api/?results=10')
            .then(response => response.json())
            .then(data =>{
            const tempArr=this.state.users
            data.results.map(user=>{
            const gender=user.gender
            const name=user.name.first
            const email=user.email
            const age=user.dob.age
            const picture=user.picture.medium
           
            tempArr.push(
            {
              gender:gender,
              name:name,
              email:email,
              age:age,
              picture:picture
            }
          )
          return null})
          localStorage.setItem("users", JSON.stringify(tempArr));
          this.setState({users:[...tempArr]})
        })
          }

         
      }

    //render function 
    render() {   

      let editted=this.state.edit?
        <div> 
          <NameInp  changed={this.nameChangeHandler} placeH={this.state.placeholder[0]}/>
          <EmailInp message={this.state.message} validF={this.state.validF} changed={this.emailChangeHandler} placeH={this.state.placeholder[1]}/>
          <Button   bsStyle="success" onClick={this.confirm}>OK</Button>
        </div>     
      :
        <ResponsiveTable 
          users={this.state.users} 
          delete={this.delete}
          edit={this.edit}
          changedEmail={this.emailChangeHandler}
          changedName={this.nameChangeHandler}
          updateIndex={(ind)=>this.updateIndex(ind)}
          valid={this.state.valid}
          />
        
      return (
            <Grid>
                <Row id='header'>
                  <h1 id="myHeader" style={{width:"100%",color:"white",textShadow:"7px 8px 9px white",margin:"auto"}}>Random Users Client</h1>
                  <Button bsStyle="info" style={{margin:"10px"}} onClick={this.get}>Get Data</Button>
                  <Button bsStyle={this.state.replaceOneStatus?"danger":"success"} onClick={this.state.replaceOneStatus?this.stop:this.generate}> {this.state.replaceOneStatus?`STOP`:`GENERATE`} </Button>
                </Row>
                <Row>
                 {editted}
                </Row>
            </Grid>
        );
    }
}

