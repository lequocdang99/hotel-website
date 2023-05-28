import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Header from './Header';
import City from './City';
import PropertyType from './PropertyType';
import Hotel from './Hotel';
import Form from './Form';
import Footer from './Footer';

const Home = () => {
  //Hotels state
  const [hotels, setHotels] = useState([]);
  //Fetch hotels information
  const hotelInfoHandler = async () => {
    try {
      const response = await fetch('http://localhost:5000/hotel');
      const data = await response.json();
      if (data.result) {
        setHotels(data.result);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    hotelInfoHandler();
  }, []);

  //Number of properties of each city
  const hanoiProperties = hotels.filter(
    (hotel) => hotel.city === 'Ha Noi'
  ).length;
  const hcmProperties = hotels.filter(
    (hotel) => hotel.city === 'Ho Chi Minh'
  ).length;
  const danangProperties = hotels.filter(
    (hotel) => hotel.city === 'Da Nang'
  ).length;
  //Number of properties by type
  const hotel = hotels.filter((hotel) => hotel.type === 'hotel').length;
  const apartment = hotels.filter((hotel) => hotel.type === 'apartment').length;
  const resort = hotels.filter((hotel) => hotel.type === 'resort').length;
  const villa = hotels.filter((hotel) => hotel.type === 'villa').length;
  const cabin = hotels.filter((hotel) => hotel.type === 'cabin').length;
  //Best rating hotel
  const bestRatingHotels = hotels.filter((hotel) => hotel.featured === 'true');

  return (
    <div>
      <NavBar />
      <Header />
      <City
        hanoi={hanoiProperties}
        hcm={hcmProperties}
        danang={danangProperties}
      />
      <PropertyType
        hotel={hotel}
        apartment={apartment}
        resort={resort}
        villa={villa}
        cabin={cabin}
      />
      <Hotel hotels={bestRatingHotels} />
      <Form />
      <Footer />
    </div>
  );
};

export default Home;
