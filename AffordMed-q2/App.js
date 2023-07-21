import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 
        </a>
          <center>
        <a href="http://20.244.56.144/numbers/primes" target="_blank">Prime</a>
        <a href="http://20.244.56.144/numbers/fibo" target="_blank">Fibo</a>
        <a href="http://20.244.56.144/numbers/odd" target="_blank">Odd</a>
        <a href="http://20.244.56.144/numbers/rand" target="_blank">Rand</a>
    </center>
      </header>
    </div>
  );
}

export default App;
