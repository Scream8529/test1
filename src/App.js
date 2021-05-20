import './App.css';
import { BrowserRouter, NavLink, Redirect, Route } from 'react-router-dom'
import FormPage from './Components/FormPage';
import PalettePageContainer from './Components/PalettePage';
import { Provider} from 'react-redux'
import store from './redux';


function App() {
  return (
    <>
    <BrowserRouter>
    <Provider store={store}>
    <div className="App">
      <div className='content'>
        <nav>
          <div className='navBar'>
            <span ><NavLink to="/form" className="navLink" activeClassName="activeNavLink">Форма</NavLink></span>
            <span ><NavLink to="/palette" className="navLink" activeClassName="activeNavLink">Палитра</NavLink></span>
          </div>
        </nav>
        <Route path="/form" exact render={()=><FormPage />}/>
        <Route path="/palette" exact render={()=><PalettePageContainer />}/>
        <Route path="/" exact render={()=><Redirect to="/form"/>}/>
        
      </div>
    </div>
    </Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
