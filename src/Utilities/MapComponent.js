import React, { useEffect, useState } from "react";
// import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";

const MapComponent = (props) => {
  // const [directions, setDirections] = useState(null);

  // useEffect(() => {
  //   const { google, lat, long, lat2, long2 } = props;
  //   const directionsService = new google.maps.DirectionsService();

  //   directionsService.route(
  //     {
  //       origin: { lat: lat, lng: long },
  //       destination: { lat: lat2, lng: long2 },
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         setDirections(result);
  //         const route = result.routes[0].legs[0];
  //         console.log(route.duration.text);
  //       } else {
  //         console.error("Error fetching directions:", status);
  //       }
  //     }
  //   );
  // }, []);
  // return (
  //   <Map
  //     style={{
  //       border: "0",
  //       borderRadius: "50px",
  //       width: 600,
  //       height: 350,
  //     }}
  //     google={props.google}
  //     zoom={14}
  //     initialCenter={{
  //       lat: props.lat,
  //       lng: props.long,
  //     }}
  //   >
  //     <Marker
  //       title={"Marker Title"}
  //       name={"Marker Name"}
  //       position={{
  //         lat: directions?.routes[0]?.legs[0]?.start_location?.lat(),
  //         lng: directions?.routes[0]?.legs[0]?.start_location?.lng(),
  //       }}
  //       // position={{ lat: props.lat, lng: props.long }}
  //     />
  //     <Marker
  //       title={"Marker Title 2"}
  //       name={"Marker Name 2"}
  //       position={{
  //         lat: directions?.routes[0]?.legs[0]?.end_location?.lat(),
  //         lng: directions?.routes[0]?.legs[0]?.end_location?.lng(),
  //       }}
  //       // position={{ lat: props.lat2, lng: props.long2 }}
  //     />
  //     <Polyline
  //       path={directions?.routes[0]?.overview_path}
  //       // path={[
  //       //   { lat: props.lat, lng: props.long },
  //       //   { lat: props.lat2, lng: props.long2 },
  //       // ]}
  //       strokeColor="red"
  //       strokeOpacity={1}
  //       strokeWeight={3}
  //     />
  //   </Map>
  // );
};

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyA0mRlUvgR2LbYdrkqaGmJjaSO5LSgz7d8",
// })(MapComponent);

export default MapComponent;
