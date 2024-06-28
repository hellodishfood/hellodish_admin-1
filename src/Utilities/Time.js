import React, { useState, useEffect } from "react";
// import { GoogleApiWrapper } from "google-maps-react";

const Time = (props) => {
  const [duration, setDuration] = useState(null);

  // useEffect(() => {
  //   const { google, lat1, lng1, lat2, lng2 } = props;
  //   const directionsService = new google.maps.DirectionsService();

  //   directionsService.route(
  //     {
  //       origin: new google.maps.LatLng(lat1, lng1),
  //       destination: new google.maps.LatLng(lat2, lng2),
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         const route = result?.routes[0]?.legs[0];
  //         setDuration(route?.duration?.text);
  //       } else {
  //         console.error("Error fetching directions:", status);
  //       }
  //     }
  //   );
  // }, []);

  return duration;
};

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyA0mRlUvgR2LbYdrkqaGmJjaSO5LSgz7d8",
// })(Time);

export default Time;
