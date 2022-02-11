import './App.css';
import Dashboard from './components/index'
import {Store} from './contexts';

function App() {
  return (
    <Store>
      <Dashboard />
    </Store>
  );
}

export default App;
