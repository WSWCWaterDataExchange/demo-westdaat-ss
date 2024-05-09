import "../LandingPage/LandingPageProperties.scss";
import { useEffect } from "react";
import { APIData } from "./APIData";


interface APISearchProps {
  onApiDataFetched: (data: APIData[] | null) => void;
  siteUUID: string | undefined;
}

export default function APISearch({ onApiDataFetched, siteUUID }: APISearchProps) {
  useEffect(() => {
    fetchData();
  }, [siteUUID]);

  const fetchData = async () => {
    if (siteUUID) {
      try {
        console.log("siteUUID is: ", siteUUID);
        const response = await fetch(`https://wade-api-uat.azure-api.net/v1/SiteVariableAmounts?SiteUUID=${siteUUID}&key=${process.env.REACT_APP_WADE_API_KEY}`);
        console.log("string is: ", response);
        if (!response.ok) {
          console.log("response not okay...");
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("the data:", data);
        onApiDataFetched(data);
      } catch (error) {
        onApiDataFetched(null);
        console.log("response not okay #2...");
      }
    } else {
      onApiDataFetched(null);
      console.log("response not okay #3...");
    }
  };

  return <></>;
}
