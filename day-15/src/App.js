import React from 'react';
import './App.css';
import * as d3 from 'd3';
//get chart component
import {BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar} from 'recharts';

import 'bootstrap/dist/css/bootstrap.css';
//import dropdown buttons
import {button, ButtonGroup, ButtonToggle} from 'reactstrap';


class MyButtons extends React.Component {
  render() {
    let dataItems = this.props.keys.map((item) => {
      return (
        <ButtonToggle 
          key={item}
          text={item}
          onClick={() => this.props.clickHandler(item)}>
            {item}
          </ButtonToggle>
      )
    })

  
    return(
      <ButtonGroup>
        {dataItems}
      </ButtonGroup>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateSelection = this.updateSelection.bind(this);
    this.state = {
      data: [],
      keys: [],
      xVariable:'Year'
    }
  }

  updateSelection = (s) => {
    this.setState({xVariable: s});
  }

  componentDidMount() {
    d3.csv('data/medalists.csv').then( (d) => {
      this.setState({data: d, keys: d3.keys(d[0])});
    })
  }
  render() {
    console.log(this.state.data.keys);
    let chartData = d3.nest()
      .key((d) => d[this.state.xVariable])
      .rollup((d) => d.length)
      .entries(this.state.data);
    
    console.log(chartData);


    return (
      <div className="container">
        <div>
          <MyButtons keys={this.state.keys} clickHandler={this.updateSelection} />
        </div>
        <div>
          <BarChart width={800} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis dataKey="value" />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    );
  }
  }
  

export default App;
