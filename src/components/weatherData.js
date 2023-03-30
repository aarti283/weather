
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

render() {
	return(
    <>
	<h1>Weather data</h1>
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
		{this.state.details.map((detail, id) => (

        <tr className="post-card" key={detail.id}>
          <td>{detail.date}</td>
          <td>{detail.maximum_temp}</td>
          <td>{detail.minimum_temp}</td>
          <td>{detail.precipitation}</td>
		  <td>{detail.state_code}</td>
        </tr>
			)
		)}
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
