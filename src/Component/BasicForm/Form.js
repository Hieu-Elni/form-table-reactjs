import React , {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

const provinceData =['Zhejiang', 'Jiangsu'] ;
const cityData =  {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Z'],
  Jiangsu: ['Nanjing', 'Suzhou', 'J'],
};

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstNameError: "",
      zipCode: "",
      zipCodeError: "",
      // username: "",
      // usernameError: "",
      email: "",
      emailError: "",
      // password: "",
      // passwordError: "",
      provinceData: provinceData,
      // cityNameData: cityData,
      cityName:"",
      cityNameError:"",
      province:"",
      provinceError: "",
      cityNameData: []
    };
  
  }
  

  change = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  changeProvince = e => {
    const province = e.target.value;
    this.setState({
      province: province,
      cityNameData: cityData[province]
    });
  }
  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: "",
      zipCodeError: "",
    //  usernameError: "",
      emailError: "",
    //  passwordError: ""
    };

    if (this.state.firstName.length < 5) {
      isError = true;
      errors.firstNameError = "Username needs to be atleast 5 characters long";
    }

    if (this.state.email.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "Requires valid email";
    }
    if(isNaN(this.state.zipCode)){
      isError = true;
      errors.zipCodeError = "ZipCode is number";
    }
    this.setState({
      ...this.state,
      ...errors
    });
    
    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        firstName: "",
        firstNameError: "",
        zipCode: "",
        zipCodeError: "",
        // username: "",
        // usernameError: "",
        email: "",
        emailError: "",
        // password: "",
        // passwordError: "",
        cityName:"",
        cityNameError:"",
        province:"",
        provinceError: "",
        cities: []
      });
    }
  };

  render() {
    return (
      <form>
        <TextField
          name="firstName"
         // floatingLabelText="First name"
         label="First name"
          value={this.state.firstName}
          onChange={e => this.change(e)}
          helperText={this.state.firstNameError }
          className ={ this.state.firstNameError ? 'error': ''}
        />
        <br />
        <TextField
          name="zipCode"
         
       //   floatingLabelText="Last Name"
            label="ZipCode"
          value={this.state.zipCode}
          onChange={e => this.change(e)}
          helperText={this.state.zipCodeError}
        className ={ this.state.zipCodeError ? 'error': ''}
        />
        <br />
        {/* <TextField
          name="username"
          label="Username"
        //  floatingLabelText="Username"
          value={this.state.username}
          onChange={e => this.change(e)}
          helperText={this.state.usernameError}
        
        /> */}
        <br />
        <TextField
          name="email"
       //   hintText="Email"
        //  floatingLabelText="Email"
        label="Email"
          value={this.state.email}
          onChange={e => this.change(e)}
          helperText={this.state.emailError}
          className ={ this.state.emailError ? 'error': ''}
        //  floatingLabelFixed
        />
        <br />
        {/* <TextField
          name="password"
          label="Password"
        //  floatingLabelText="Password"
          value={this.state.password}
          onChange={e => this.change(e)}
          helperText={this.state.passwordError}
          type="password"
         
        />
        <br /> */}
        <div style={{display:"flex", justifyContent:"center",marginRight:20}}>
        <FormControl style={{minWidth:120}}>
            <InputLabel htmlFor="province-native-simple">Province</InputLabel>
            <Select
                // defaultValue={this.state.province}
              value={this.state.province}
              onChange={e => this.changeProvince(e)}
              inputProps={{
                name: 'province',
                id: 'province-native-simple',
              }}
            >
            <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          { this.state.provinceData ?(
                this.state.provinceData.map((provin,i) => (
                  <MenuItem value={provin} key={i}>{provin}</MenuItem>
                ))) : <MenuItem value={this.state.province} />
            }
           
              
            </Select>
        </FormControl>

        <FormControl style={{minWidth:120}}>
            <InputLabel htmlFor="city-native-simple">City</InputLabel>
            <Select
              
              value={this.state.cityName}
              onChange={e => this.change(e)}
              inputProps={{
                name: 'cityName',
                id: 'city-native-simple',
              }}
            >
               <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
               {this.state.cityNameData ?(
                    this.state.cityNameData.map((city,i) => (
                        <MenuItem value={city} key={i}>{city}</MenuItem>
                    ))) :   <MenuItem value={this.state.cityName} />
                }
              
            </Select>
        </FormControl>
        </div>
        <br/>
        <Button label="Submit" onClick={e => this.onSubmit(e)} color="primary"variant="contained" >Submit</Button>
      </form>
    );
  }
}