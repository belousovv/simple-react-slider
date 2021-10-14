import React from 'react';
import Slider from './components/Slider/Slider';
import "./App.scss";

const App: React.FC = () => {

  const slides = [
    {
        img: 'https://www.w3schools.com/howto/img_nature_wide.jpg',
        text: 'Caption Text 1'
    },
    {
        img: 'https://www.w3schools.com/howto/img_snow_wide.jpg',
        text: 'Caption Text 2'
    },
    {
        img: 'https://www.w3schools.com/howto/img_mountains_wide.jpg',
        text: 'Caption Text 3'
    },
];

  return (
    <div className="app">
      <Slider slides={slides} loop={true} auto={false} />
    </div>
  );
}

export default App;
