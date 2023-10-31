import './App.css';
import MOCK_DATA from './components/MOCK_DATA.json';
import ReactDataTable from './components/ReactDataTable';
import { COLUMNS } from './components/columns';

const App = () => {

  return (
    <div className="App">
        <ReactDataTable columns={COLUMNS} data={MOCK_DATA} globalFilterEnabled={true}/> 
    </div>
  );
  
}

export default App;


