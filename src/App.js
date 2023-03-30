import WeatherData from './components/weatherData';
import WeatherStats from './components/weatherStats';
import {useState} from 'react';

import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';


export default function WebApp(){

	return(
		<Router>
           <div >
            <ul >
              <li>
                <Link to="/weather">Raw data</Link>
              </li>
              <li>
                <Link to="/statistics">Weather Statistics</Link>
              </li>
            </ul>
           <Routes>
                 <Route exact path='/weather' element={< WeatherData />}></Route>
                 <Route exact path='/statistics' element={<WeatherStats />}></Route>
          </Routes>
          </div>
       </Router>
	);
}
