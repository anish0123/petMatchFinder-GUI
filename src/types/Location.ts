type coordinates = {
    lat: number;
    lng: number;
  };
  
  type LocationInput = {
    topRight: coordinates;
    bottomLeft: coordinates;
  };

  export type { LocationInput };