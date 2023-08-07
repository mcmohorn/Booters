import logo from './logo.svg';
import './App.css';
import { MyMap } from './components/MyMap';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyMap/>
        <ToastContainer />
      </header>
    </div>
  );
}



export default App;
