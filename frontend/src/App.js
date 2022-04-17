import './App.css';
import Child from './Child';
import './Admin';
import Card from './Card';
import Admin from './Admin';
import Filter from './Filter';
import { useState } from 'react';
function App() {
  const [childIsVisible, setChildIsVisible] = useState(false);
  const [adminIsVisible, setAdminIsVisible] = useState(false);
  const onChildVisibility = () => {
    setChildIsVisible(true);
    setAdminIsVisible(false);
  };
  const onAdminVisibility = () => {
    setChildIsVisible(false);
    setAdminIsVisible(true);
  };
  return (
    <Card className="App">
      <Filter
        changeChildVisibility={onAdminVisibility}
        changeAdminVisibility={onChildVisibility}
      ></Filter>
      {childIsVisible ? <Admin /> : null}
      {adminIsVisible ? <Child /> : null}
    </Card>
  );
}

export default App;
