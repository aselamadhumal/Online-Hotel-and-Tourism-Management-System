import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import room1 from '../../images/room1.jpg';
import room2 from '../../images/room2.jpeg';
import room3 from '../../images/room3.jpg';
import room4 from '../../images/room4.jpeg';
import room5 from '../../images/room5.webp';
import room6 from '../../images/room6.jpg';

const styles = {
  ourRoom: {
    padding: '60px 0 30px 0',
    marginTop: '90px',
  },
};

const Rooms = () => {
  const roomData = [
    {
      image: room1,
      title: 'Luxurious Suite',
      description: 'Indulge in our luxurious suites and experience the epitome of comfort and elegance.',
    },
    {
      image: room2,
      title: 'Deluxe Room',
      description: 'Our deluxe rooms offer a perfect blend of style, comfort, and modern amenities.',
    },
    {
      image: room3,
      title: 'Ocean View Room',
      description: 'Enjoy breathtaking ocean views from our specially designed ocean view rooms.',
    },
    {
      image: room4,
      title: 'Family Suite',
      description: 'Spacious family suites, ideal for families looking for a memorable staycation.',
    },
    {
      image: room5,
      title: 'Cozy Retreat',
      description: 'Find solace in our cozy retreat rooms, designed for a peaceful and relaxing stay.',
    },
    {
      image: room6,
      title: 'Executive Suite',
      description: 'Experience sheer luxury in our executive suites, tailored for a lavish experience.',
    },
  ];

  return (
    <div>
      <div className="bg-dark py-2">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title">
                <h2 className='text-light'>Our Rooms</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-end mt-2'>
        <Link to="/addreservation">
        <button className='btn btn-primary'>
            Book a Room
        </button>
        </Link>
      </div>
      <div style={styles.ourRoom}>
        <div className="container">
          <div className="row d-flex justify-content-center">
            {roomData.map((room, index) => (
              <div className="card my-2 mx-3" style={{ width: '18rem' }} key={index}>
                <img className="card-img-top" src={room.image} alt={`Room ${index + 1}`} />
                <div className="card-body">
                  <h5 className="card-title">{room.title}</h5>
                  <p className="card-text">{room.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
