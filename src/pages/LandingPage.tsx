import "../components/LandingPage/LandingPageProperties.scss";
import LandingPageProperties from "../components/LandingPage/LandingPageProperties";
import APISearch from "../components/API/APISearch";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function LandingPage() {
  const { siteUUID } = useParams<{ siteUUID: string }>();

  const [apiData, setApiData] = useState<any>(null);
  const handleApiDataFetched = (data: any) => {
    setApiData(data);
  };

  return (
    <div className="time-series-page">
      <h3>SiteUUID: {siteUUID}</h3>
      <APISearch onApiDataFetched={handleApiDataFetched} siteUUID={siteUUID} />
      {/* <LandingPageProperties apiData={apiData} /> */}
    </div>
  );
}
