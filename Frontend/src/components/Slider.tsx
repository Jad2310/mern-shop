import { Carousel, Image } from "react-bootstrap";

function Slider() {
  return (
    <Carousel className="bg-dark m-auto mt-4" pause="hover">
      <Carousel.Item>
        <Image src="/images/camera.jpg" alt="camera" fluid />
        <Carousel.Caption className="carousel-caption">
          <h2>Cannon EOS SOD DSLR CAMERA ($929.99)</h2>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image src="/images/phone.jpg" alt="iphone" fluid />
        <Carousel.Caption className="carousel-caption">
          <h2>IPHONE 11 PRO 256GB MEMORY ($599.99)</h2>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image src="/images/airpods.jpg" alt="airpods" fluid />
        <Carousel.Caption className="carousel-caption">
          <h2>AIRPODS WIRELESS BLUETOOTH HEADPHONES ($89.99)</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
