import React, { Component } from "react";
import ReactPaginate from 'react-paginate'
import axios from 'axios';
import Table from 'react-bootstrap/Table';




class WeatherData extends Component {
	render() {
	  const { currentItems } = this.props;
	  return (
		<>
		  <Table striped bordered hover>
			<thead>
			  <tr>
				<th>Date</th>
				<th>maximum temperature</th>
				<th>minimum temperature</th>
				<th>amount of precipitatione</th>
			  </tr>
			</thead>
			{currentItems.map((detail, id) => (
			  <tbody key={id}>
				<tr className="post-card" key={detail.date}>
				  <td>{detail.date}</td>
				  <td>{detail.maximum_temp}</td>
				  <td>{detail.minimum_temp}</td>
				  <td>{detail.precipitation}</td>
				  <td>{detail.status_code}</td>
				</tr>
			  </tbody>
			))}
		  </Table>
		</>
	  );
	}
  }

class Paginate_weatherData extends React.Component {
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


  handlePageClick(event) {
    const newOffset = (event.selected * this.props.itemsPerPage) % this.state.details.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    this.setState({ itemOffset: newOffset });
  }



  render() {
    const { itemsPerPage } = this.props;
    const { itemOffset, details } = this.state;
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = details.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(details.length / itemsPerPage);

    return (
      <>
        <WeatherData currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={this.handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }
}

export default Paginate_weatherData;
