
import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

class WeatherData extends React.Component {
	state = {
		details : [],
	}

	componentDidMount() {

		let data ;

		axios.get('http://localhost:8000/weather')
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
	<div>
			{this.state.details.map((detail, id) => (
			<div key={id}>
			<div >
				<div >
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>minimum temperature</th>
          <th>maximum temperature</th>
          <th>amount of precipitatione</th>
        </tr>
      </thead>
        <tbody>
        <tr className="post-card" key={detail.date}>
          <td>{detail.date}</td>
          <td>{detail.max}</td>
          <td>{detail.min}</td>
          <td>{detail.amount}</td>
        </tr>
        </tbody>
        </Table>
				</div>
			</div>
			</div>
			)
		)}
	</div>

  </>
	);
}
}

export default WeatherData;
