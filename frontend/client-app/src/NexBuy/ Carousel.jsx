import Carousel from 'react-bootstrap/Carousel';
import blackvideo from "./nexPhoto/blackcomputer.mp4";
import bluevideo from "./nexPhoto/bluecomputer.mp4";
import girshopvideo from "./nexPhoto/girshop.mp4";

function UncontrolledExample() {
  const videoStyle = {
    width: '100%',
    height: '600px',
    objectFit: 'cover',
  };

  return (
    <Carousel controls={true} indicators={true}>
      <Carousel.Item>
        <video style={videoStyle} autoPlay muted loop playsInline>
          <source src={blackvideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Carousel.Item>

      <Carousel.Item>
        <video style={videoStyle} autoPlay muted loop playsInline>
          <source src={bluevideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Carousel.Item>

      <Carousel.Item>
        <video style={videoStyle} autoPlay muted loop playsInline>
          <source src={girshopvideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
