export const userLocation = {
  latitude: 37.7749,
  longitude: -122.4194,
  address: "123 Main St, San Francisco",
};

export const destinationLocation = {
  latitude: 37.8044,
  longitude: -122.2712,
  address: "Oakland City Center, Oakland",
};

export const recentPlaces = [
  { id: "1", name: "Work", address: "456 Market St, San Francisco", icon: "briefcase" },
  { id: "2", name: "Home", address: "123 Main St, San Francisco", icon: "home" },
  { id: "3", name: "SFO Airport", address: "San Francisco International Airport", icon: "plane" },
  { id: "4", name: "Golden Gate Park", address: "San Francisco, CA", icon: "map-pin" },
];

export const rideOptions = [
  { id: "uberx", title: "UberX", multiplier: 1, image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png", eta: "3 min" },
  { id: "comfort", title: "Comfort", multiplier: 1.2, image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png", eta: "4 min" },
  { id: "uberxl", title: "UberXL", multiplier: 1.5, image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646944/assets/c6/275e63-49d7-463e-ac39-f9c31fa6b677/original/4.png", eta: "5 min" },
  { id: "black", title: "Black", multiplier: 2.0, image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646964/assets/4f/f43270-e4b7-4b77-a8b2-b43a9d90ec82/original/5.png", eta: "7 min" },
];

export const driverData = {
  name: "Michael",
  rating: 4.9,
  car: "Toyota Camry",
  plate: "7XYZ123",
  image: "https://randomuser.me/api/portraits/men/32.jpg"
};
