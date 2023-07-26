import logo from './logo.svg';
import './App.css';
import { MyMap } from './components/MyMap';

import { GoogleLogin } from '@react-oauth/google';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <MyMap/>
        

      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log('received', credentialResponse);
        }}
        onError={() => {
          alert('Login Failed');
        }}
        useOneTap
      />;
      </header>
    </div>
  );
}



export default App;
