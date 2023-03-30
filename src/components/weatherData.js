
import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

class WeatherData extends React.Component {
	state = {
		details : [],
	}

	componentDidMount() {

		let data ;

		axios.get('http://localhost:8000/api/weather')
		.then(res => {
			data = res.data;
			this.setState({
				details : data	
			});
		})
		.catch(err => {})
	}

	componentDidUpdate(prevProps){
		let url = 'http://127.0.0.1:8000/api/weather';
		let params = {};
		let data ;

		if((prevProps.stateCode !== this.props.stateCode) || (prevProps.date !== this.props.date)){
		  if(this.props.date !== ""){
			params.date = this.props.date;
		  }
		  if(this.props.stateCode !== ""){
			params.state_code = this.props.stateCode;
		  }
		  url += '?' + ( new URLSearchParams( params ) ).toString();
		  
		axios.get(url)
		.then(res => {
			data = res.data;
			this.setState({
				details : data	
			});
		})
		.catch(err => {})
		}
	  }

render() {
	let result;

	const {details} = this.state

	if (!Array.isArray(details)){
		result = (
		  <tr className='post-card'>
				<td>{details.date}</td>
				<td>{details.maximum_temp}</td>
				<td>{details.minimum_temp}</td>
				<td>{details.precipitation}</td>
				<td>{details.state_code}</td>
			</tr>
		);
	  }
	else{
		result = details.map((detail, id) => (
			<tr className="post-card" key={detail.id}>
			  <td>{detail.date}</td>
			  <td>{detail.maximum_temp}</td>
			  <td>{detail.minimum_temp}</td>
			  <td>{detail.precipitation}</td>
			  <td>{detail.state_code}</td>
			</tr>
				)
			);
	}

	return(
    <>
	
	<div>
			<div >
				<div >
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>minimum temperature</th>
          <th>maximum temperature</th>
          <th>amount of precipitation</th>
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
	);
}
}

export default WeatherData;
