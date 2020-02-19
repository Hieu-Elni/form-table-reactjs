import React ,{Component} from 'react';

const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            province:  'Zhejiang',
            cities: cityData[provinceData[0]],
            citiesSelect: cityData[provinceData[0]][0],
        }
    
      
      }
    
      handleProvinceChange = value => {
          const province = value.target.value
          console.log(value.target.value);
        this.setState({
          cities: cityData[province],
          citiesSelect: cityData[province][0],
        });
      };
    
      onSecondCityChange = value => {
        const city = value.target.value
        this.setState({
            citiesSelect: city,
        });
      };

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
            <label>
              Pick your Province:
              <select value={this.state.province} onChange={this.handleProvinceChange}>

                {
                    provinceData.map((provin,i) => (
                <option value={provin} key={i}>{provin}</option>
                    ))
                }
              </select>
            </label>

            <label>
              Pick your City:
              <select value={this.state.citiesSelect} onChange={this.onSecondCityChange}>

                {
                    this.state.cities.map((city,i) => (
                        <option value={city} key={i}>{city}</option>
                    ))
                }
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
    }
}
export default App;