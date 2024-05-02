import {LatLngLiteral} from 'leaflet';
import {useMapEvents} from 'react-leaflet';

const MapClickHandler = ({
  setClickedPosition,
}: {
  setClickedPosition: (position: LatLngLiteral) => void;
}) => {
  useMapEvents({
    click(event) {
      setClickedPosition(event.latlng);
    },
  });

  return null;
};

export default MapClickHandler;
