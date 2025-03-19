// Carosole.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import Tawa from "../videos/Tawa.mp4";
import Mixi from "../videos/Mixi.mp4";
import Blender from "../videos/Blender.mp4"

const Carosole = () => {
  return (
    <Carousel className="w-100 carousel-video-container">
      <Carousel.Item>
        <video 
          className="d-block w-100" 
          autoPlay 
          loop 
          muted
          playsInline 
        >
          <source src={Tawa} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <Carousel.Caption>
          <h3>Tawa</h3>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <video 
          className="d-block w-100" 
          autoPlay 
          loop 
          muted
          playsInline
        >
          <source src={Mixi} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <Carousel.Caption>
          <h3>Mixer</h3>
          <p>Sample Text for Video Slide</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <video 
          className="d-block w-100" 
          autoPlay 
          loop 
          muted
          playsInline
        >
          <source src={Blender} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
      </Carousel.Item>
    </Carousel>
  );
};

export default Carosole;