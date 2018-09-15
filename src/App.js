import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
// own
import BasicCenterContainer from "./components/containers/BasicCenterContainer";
import AxieDataFetcher from "./components/AxieDataFetcher";

//CSS
const StyledApp = styled.div`
`; 

class App extends Component {
  render() {
    return (
      <StyledApp>
        <BasicCenterContainer>
          <AxieDataFetcher />
        </BasicCenterContainer>
      </StyledApp>
    );
  }
}

export default App;
