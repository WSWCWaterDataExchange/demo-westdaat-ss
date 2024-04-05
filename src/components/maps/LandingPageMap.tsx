import "../LandingPage/LandingPageProperties.scss";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Box } from "@mui/material";

export default function LandingPageMap() {
  // set up map's default state
  // const [lng, setLng] = useState<number>(-110.0);
  // const [lat, setLat] = useState<number>(42.0);
  // const [zoom, setZoom] = useState<number>(5);
  const lng: number = -110.0;
  const lat: number = 42.0;
  const zoom: number = 5;

  // initialize map
  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiYW1hYmRhbGxhaCIsImEiOiJjazJnbno5ZHIwazVqM21xZzMwaWpsc2hqIn0.j6BmkJdp5O_9ITGm4Gwe0w";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/amabdallah/clua7068302hb01oif099hspo",
      center: [lng, lat],
      zoom: zoom,
    });

    return () => map.remove();
  }, []);

  return (
    <div className="position-relative h-100">
      <Box id="map" className=""></Box>
    </div>
  );
}
