import './App.css'
import Header from './components/Header'
import ChangeUserName from './components/ChangeUserName';
import { UserContext } from './components/UserContext';
import { useState } from 'react';
import WeatherApp from './components/Weatherapp';

function App() {

  return (
    <WeatherApp />
  )
}

export default App
