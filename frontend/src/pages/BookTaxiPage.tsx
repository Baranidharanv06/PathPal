import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const BookTaxiPage: React.FC = () => {
  const [passengers, setPassengers] = useState(1);
  const [distance, setDistance] = useState(10); // Mock distance in km
  const [estimatedFare, setEstimatedFare] = useState(0);

  // Calculate fare whenever passengers or distance change
  useEffect(() => {
    const baseFare = 50;
    const perKmRate = 15;
    const perPassengerRate = 20;
    const fare = baseFare + (distance * perKmRate) + (passengers * perPassengerRate);
    setEstimatedFare(fare);
  }, [passengers, distance]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Booking confirmed! Your estimated fare is ₹${estimatedFare.toFixed(2)}.`);
    // In a real app, you would send this data to the backend
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Book a Private Taxi</h1>
      <p className="details-subtitle">
        In partnership with our trusted local partner, <span className="partner-name">Maya Car Taxi</span>.
      </p>

      <div className="taxi-page-layout">
        <div className="taxi-booking-card">
          <form onSubmit={handleBooking}>
            <div className="input-group">
              <label htmlFor="origin">Pickup Location</label>
              <input type="text" id="origin" defaultValue="VIT Vellore, Main Gate" required />
            </div>
            <div className="input-group">
              <label htmlFor="destination">Drop-off Location</label>
              <input type="text" id="destination" placeholder="e.g., Katpadi Junction" required />
            </div>
            <div className="input-group">
              <label htmlFor="passengers">Passengers (1-4)</label>
              <input 
                type="number" 
                id="passengers" 
                value={passengers} 
                onChange={(e) => setPassengers(Number(e.target.value))} 
                min="1" 
                max="4" 
                required 
              />
            </div>
             <div className="input-group">
              <label htmlFor="distance">Estimated Distance (km)</label>
              <input 
                type="range" 
                id="distance" 
                value={distance} 
                onChange={(e) => setDistance(Number(e.target.value))} 
                min="1" 
                max="50"
              />
              <div className="range-value">{distance} km</div>
            </div>
            <div className="fare-estimate">
              <span>Estimated Fare:</span>
              <span className="fare-amount">₹{estimatedFare.toFixed(2)}</span>
            </div>
            <p className="commission-note">
              This includes a 20% commission for PathPal to help us maintain and improve the service.
            </p>
            <button type="submit" className="home-button button-primary form-button">Book Now</button>
          </form>
        </div>
        <div className="taxi-info-card">
          <h3>Why Book with PathPal?</h3>
          <ul>
            <li>✓ **Vetted Drivers:** All Maya Car Taxi drivers are verified for your safety.</li>
            <li>✓ **Upfront Pricing:** No hidden costs. See your estimated fare before you book.</li>
            <li>✓ **Convenience:** Book directly through the app you already use.</li>
            <li>✓ **Support Local:** Your booking helps support a local Vellore business.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookTaxiPage;
