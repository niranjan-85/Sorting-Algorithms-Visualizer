import React from 'react';
import ReactDOM from 'react-dom';
import ArrayBars from './Components/ArrayBars'

const App = ()=>{
    return(
      <>
        <ArrayBars/>
      </>
    )
}

//Root element:
const root = document.getElementById('root')

ReactDOM.render(
  <App/>,
  root
)


