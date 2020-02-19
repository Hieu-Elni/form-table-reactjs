import React, { Component } from "react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

import Form from "./Form";
// import { light } from "@material-ui/core/styles/createPalette";
import Table from "./Table";

// injectTapEventPlugin();
const theme = createMuiTheme({
  button: {
    margin: 1,
  },
 });

 const PROVINCE_DATA = [{value:'Zhejiang', displayValue:'Zhejiang'},
 {value:'Jiangsu', displayValue:'Jiangsu'}];
const CITY_DATA ={
  Zhejiang: [{value:'Hangzhou', displayValue:'Hangzhou'}, 
        {value:'Ningbo', displayValue:'Ningbo'},
        {value: 'Z', displayValue:'Z'} ],
  Jiangsu: [
    {value:'Nanjing', displayValue:'Nanjing'}, 
        {value:'J', displayValue:'J'},
        {value: 'Suzhou', displayValue:'Suzhou'} ],
};
class BasicFormCom extends Component {
  state = {
    data: [],
    editIdx: -1,
    orderForm:{
      firstName: {
          call:'Your Name',
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Your Name'
          },
          value: '',
          validation:{
              required: true
          },
          valid: false,
          touched: false
      },
      zipCode: {
          call:'ZipCode',
          elementType: 'input',
          elementConfig: {
              type: 'number',
              placeholder: 'ZipCode'
          },
          value: '',
          validation:{
              required: true,
              minLength: 5,
              maxLength: 5
          },
          valid: false,
          touched: false,
          validationMessage:''
      },
      email: {
          call: 'Email',
          elementType: 'input',
          elementConfig: {
              type: 'email',
              placeholder: 'Email'
          },
          value: '',
          validation:{
              required: true,
              email: true,
          },
          valid: false,
          touched: false,
          validationMessage:''
      },
      province: {
          call:'Province',
          elementType: 'select',
          elementConfig: {
             options:[
              
              ]
          },
          value: '',
          valid: false,
          validation:{},
          validationMessage:''
      },
      cityName: {
        call:'city',
        elementType: 'select',
        elementConfig: {
           options:[
          
            ]
        },
        value: '',
        valid: false,
        validation:{}, 
        validationMessage:''
    }
  },
  // loading: false,
  formIsValid: false,
  };


  handleRemove = i => {
    this.setState({
      data: this.state.data.filter((d,j) => j !== i )
    })
  }
  startEditing = i => {
    if(this.state.editIdx) this.stopEditing();
    this.setState({ editIdx: i });

    const dataEdit = {...this.state.data[i]};
    const cityNameDataFind = CITY_DATA[dataEdit.province];
    const newFormdata = {
      ...this.state.orderForm
    };
    for(let key in newFormdata){
          newFormdata[key].value = dataEdit[key];
          newFormdata[key].valid = true;

      if(key === 'province'){
          newFormdata[key].elementConfig.options = PROVINCE_DATA
      }
      if(key === 'cityName'){
        newFormdata[key].elementConfig.options = cityNameDataFind
    }
  }
    this.setState({
      orderForm: newFormdata
    })
  };

  stopEditing = () => {

    this.setState({ editIdx: -1 });
  };

//   handleChange = (e, name, i) => {
//     const { value } = e.target;
//     this.setState(state => ({
//       data: state.data.map(
//         (row, j) => (j === i ? { ...row, [name]: value } : row)
//       )
//     }));
//   };
  changeProvince = (e, name, i) => {
    const {data} =  this.state;
    const provinceGet = e.target.value;
    const dataEdit = {...data[i]};
    const dataUpdate = {...dataEdit, cityNameData: CITY_DATA[provinceGet], province:provinceGet}
    const dataList =[...data];


    const cityNameDataFind = CITY_DATA[provinceGet];
   
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { 
      ...updatedOrderForm['province']
    };
      updatedFormElement.value = provinceGet;
      for(let key in updatedOrderForm){
        
        if(key === 'province'){
          updatedOrderForm[key].elementConfig.options = PROVINCE_DATA
      }
        if(key === 'cityName'){
          updatedOrderForm[key].elementConfig.options = cityNameDataFind
        }
      }
     updatedOrderForm['province']=updatedFormElement;

    //   console.log(updatedOrderForm)
    this.setState({
      data:dataList,
      orderForm: updatedOrderForm
    });
  }

  checkValidity(value, rules){
    let error = [true,''];
  
  if(rules.required){
      const valid = value.trim() !== ''; // true is # null
      const message = `${!valid ? 'This field is required':''}`;
      error = !valid ? [valid,message]: error;
  }
    if(!rules){
        return error;
    }
    if(rules.minLength){
        const valid = value.length <= rules.minLength;
        
        const message = !valid ? `Min Length is: ${rules.minLength}`:'';
        error = !valid ? [valid,message]: error;
    }
    //console.log(value.length); 0 
    if(rules.maxLength){
      const valid = value.length >= rules.minLength;
      
      const message = !valid ? `Max Length is: ${rules.maxLength}`:'';
      error = !valid ? [valid,message]: error;
  }
    if(rules.email){
      const valid = /\S+@\S+\.\S+/.test(value);
      const message = `${!valid ? 'Must be a valid email':''}`;
      error = !valid ? [valid,message]: error;
  }

    return error;
}


inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
        ...this.state.orderForm
    };
    
    const updatedFormElement = { 
        ...updatedOrderForm[inputIdentifier]
    };
    
    updatedFormElement.value = event.target.value;
    const validData = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    console.log(validData)
    // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = validData[0];
    updatedFormElement.validationMessage = validData[1];
  
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formCheckValid = true;

    for(let inputIdentifier in updatedOrderForm){
        formCheckValid = updatedOrderForm[inputIdentifier].valid && formCheckValid
    }
   // console.log(updatedFormElement);
    
    this.setState({orderForm: updatedOrderForm ,
       formIsValid: formCheckValid
    });
}
  handleChange = (e, name, i) =>{

    const {value} = e.target;
    this.inputChangedHandler(e,name);
    this.setState({
      data: this.state.data.map( (row,j) => (j===i ? { ...row, [name]:value} : row)
      )
    })
    console.log(this.state.orderForm)
  }


  render() {
   
    const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

         console.log('aa',formElementsArray)
        // console.log('bb',this.state.data)
        //console.log(this.state.formIsValid);
       // [{id:"name", config:{elementConfig, type,valid}]
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
           <Form
            onSubmit={submission =>
              this.setState({
                data: [...this.state.data, submission]
              })}
          />
          
          <Table
            data={this.state.data}
            editIdx={this.state.editIdx}
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            changeProvince = {this.changeProvince}
            stopEditing={this.stopEditing}
            handleChange={this.handleChange}
            formElementsArray = {formElementsArray}
            formValidCheck={this.state.formIsValid}
          />
         
        </div>
      </MuiThemeProvider>
    );
  }
}
// follow https://www.youtube.com/watch?v=wi_vD0Yvc0g
// BasicFormCom cha : Form & Table,

export default BasicFormCom;