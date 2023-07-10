

import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';

class WeatherStats extends Component {
  // constructor(props){
  //   super(props);
  //integrated to gitlab
  // }

  state = {
    data: [],
  };

  // Code is invoked after the component is mounted/inserted into the DOM tree.
  componentDidMount() {
    let url = 'http://127.0.0.1:8000/api/weather/stats';
    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          data: result,
        })
      })
    console.log(this.state);
  }
  
  componentDidUpdate(prevProps){
    let url = 'http://127.0.0.1:8000/api/weather/stats';
    let params = {};
    if((prevProps.stateCode !== this.props.stateCode) || (prevProps.date !== this.props.date)){
      if(this.props.date !== ""){
        params.year = this.props.date;
      }
      if(this.props.stateCode !== ""){
        params.state_code = this.props.stateCode;
      }
      url += '?' + ( new URLSearchParams( params ) ).toString();

      fetch(url)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          data: result,
        })
      })
    }
  }

  render() {
    const {data} = this.state
    console.log(data)
    let result;

    if (!Array.isArray(data)){
      result = (
        <tr className='post-card'>
            <td>{data.year}</td>
            <td>{data.average_minimum}</td>
            <td>{data.average_maximum}</td>
            <td>{data.total_precipitation}</td>
            <td>{data.state_code}</td>
          </tr>
      );
    }
    else{
      result = data.map((data, index) => {
        return(
          <tr className="post-card" key={data.id}>
            <td>{data.year}</td>
            <td>{data.average_minimum}</td>
            <td>{data.average_maximum}</td>
            <td>{data.total_precipitation}</td>
            <td>{data.state_code}</td>
          </tr>
        ) 
      })
    }

    return(
      <>
      <div>
		<div >
		<div >
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Year</th>
          <th>Average minimum</th>
          <th>Average maximum</th>
          <th>Total precipitation</th>
		  <th>state code</th>
        </tr>
      </thead>
      <tbody>
        {result}
      </tbody>
      </Table>
      </div>
      </div>
      </div>
      </>
    ) 
  }
}

export default WeatherStats;