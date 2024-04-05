import "./MapHomePage.css";
import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapHomePageLegend from "./MapHomePageLegend";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, CardHeader } from "@mui/material";
import ReactDOM from "react-dom";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { mdiOpenInNew } from "@mdi/js";
import Icon from "@mdi/react";

interface OptionType {
  label: string;
  value: string;
}


const siteNameArray: OptionType[] = [
  { label: "Canal / Ditch / Diversion", value: "Canal / Ditch / Diversion" },
  { label: "Reservoir/Dam", value: "Reservoir/Dam" },
  { label: "Site Specific Public Supply", value: "Site Specific Public Supply" },
  { label: "Stream Gage", value: "Stream Gage" },
  { label: "Surface Water Point", value: "Surface Water Point" },
  { label: "Water Right Related Withdrawal", value: "Water Right Related Withdrawal" },
  { label: "Well / Pump / Spring / Groundwater Point", value: "Well / Pump / Spring / Groundwater Point" },
  { label: "Unspecified", value: "Unspecified" },
];

const legendItems = [
  { name: "Canal / Ditch / Diversion", color: "#e47777" },
  { name: "Reservoir / Dam", color: "#ed1dca" },
  { name: "Site Specific Public Supply", color: "#d10000" },
  { name: "Stream Gage", color: "#9a6ce5" },
  { name: "Surface Water Point", color: "#79db75" },
  { name: "Water Right Related Withdrawal", color: "#FFD700" },
  { name: "Well / Pump / Spring / Groundwater", color: "#6f44d5" },
  { name: "Unspecified", color: "#49a0da" },
];

function MapHomePage() {
  // set up map's default state
  // const [lng, setLng] = useState<number>(-110.0);
  // const [lat, setLat] = useState<number>(42.0);
  // const [zoom, setZoom] = useState<number>(5);
  const lng: number = -110.0;
  const lat: number = 42.0;
  const zoom: number = 5;
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);

  const [selectedWadeNameS, setSelectedWadeNameS] = useState<string[]>([]);
  const handleWadeNameSChange = (selectedOptions: OptionType[]) => {
    const values = selectedOptions.map((option) => option.value);
    setSelectedWadeNameS(values);
  };

  // initialize map
  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiYW1hYmRhbGxhaCIsImEiOiJjazJnbno5ZHIwazVqM21xZzMwaWpsc2hqIn0.j6BmkJdp5O_9ITGm4Gwe0w";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/amabdallah/clpa0f7dx001901op5ihpfqev",
      //style: "mapbox://styles/amabdallah/clua7068302hb01oif099hspo",
      center: [lng, lat],
      zoom: zoom,
    });
    setMapInstance(map);

    map.on("load", async () => {
      setIsMapLoaded(true);

      // create popup card for ss1 point layer
      map.on("click", "ss1", (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        // Check if e.features is not undefined and contains at least one feature
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const properties = feature.properties;

          if (properties) {
            const popupContent = (
              <Card className="popup-card">
                <CardHeader
                  subheader={
                    <div>
                      <b>Site ID:</b>
                      <a href={`/landingpage/${properties.SiteUUID}`} target="_blank" rel="noopener noreferrer">
                        {properties.SiteUUID} <Icon path={mdiOpenInNew} className="map-popup-card-time-site-link-icon" />
                      </a>
                    </div>
                  }
                  className="popup-header"
                />
                <CardContent>
                  <p>
                    <b>SiteNativeID:</b>
                    <br /> {properties.SiteNativeID}
                  </p>
                  <p>
                    <b>SiteName:</b>
                    <br /> {properties.SiteName}
                  </p>
                  <p>
                    <b>SiteTypeCV:</b>
                    <br /> {properties.SiteTypeCV}
                  </p>
                </CardContent>
              </Card>
            );
            const coordinates = { lng: properties.Longitude, lat: properties.Latitude };
            const popupNode = document.createElement("div");
            ReactDOM.render(popupContent, popupNode);
            new mapboxgl.Popup({ offset: [0, -15] }).setLngLat(coordinates).setDOMContent(popupNode).addTo(map);
          }
        }
      });

      // create popup card for ss2 polygon layer
      map.on("click", "ss2", (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
        // Check if e.features is not undefined and contains at least one feature
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const properties = feature.properties;

          if (properties) {
            const popupContent = (
              <Card className="popup-card">
                <CardHeader
                  subheader={
                    <div>
                      <b>Site ID:</b>
                      <a href={`/landingpage/${properties.SiteUUID}`} target="_blank" rel="noopener noreferrer">
                        {properties.SiteUUID}
                      </a>
                    </div>
                  }
                  className="popup-header"
                />
                <CardContent>
                  <p>
                    <b>SiteNativeID:</b>
                    <br /> {properties.SiteNativeID}
                  </p>
                  <p>
                    <b>SiteName:</b>
                    <br /> {properties.SiteName}
                  </p>
                  <p>
                    <b>SiteTypeCV:</b>
                    <br /> {properties.SiteTypeCV}
                  </p>
                </CardContent>
              </Card>
            );
            const coordinates = { lng: properties.Longitude, lat: properties.Latitude };
            const popupNode = document.createElement("div");
            ReactDOM.render(popupContent, popupNode);
            new mapboxgl.Popup({ offset: [0, -15] }).setLngLat(coordinates).setDOMContent(popupNode).addTo(map);
          }
        }
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on("mouseenter", "ss1", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseenter", "ss2", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      // Change the cursor back to a pointer when it leaves.
      map.on("mouseleave", "ss1", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("mouseleave", "ss2", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => map.remove();
  }, []);

  // track filter
  useEffect(() => {
    if (mapInstance && isMapLoaded) {
      const wadeNameSFilter = selectedWadeNameS.length > 0 ? ["in", "WaDENameS", ...selectedWadeNameS] : ["!=", "", ""];
      const combinedFilter = ["all", wadeNameSFilter];
      // console.log(combinedFilter);
      mapInstance.setFilter("ss1", combinedFilter);
      mapInstance.setFilter("ss2", combinedFilter);
    }
  }, [isMapLoaded, selectedWadeNameS]);

  return (
    <Box className="homepage-map">
      <Box className="homepage-map-filter">
        <label>Select WaDE Site Type:</label>
        <Autocomplete multiple options={siteNameArray} getOptionLabel={(option) => option.label} onChange={(_value, newvalue) => handleWadeNameSChange(newvalue)} renderInput={(params) => <TextField {...params} label="WaDE Site Type CV" placeholder="WaDE Site Type CV" />}></Autocomplete>
      </Box>
      <Box id="map" className="homepage-map-map"></Box>
      <MapHomePageLegend items={legendItems} />
    </Box>
  );
}

export default MapHomePage;
