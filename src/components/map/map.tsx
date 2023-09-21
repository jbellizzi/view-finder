import mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN } from "../../constants";

import styles from "./map.module.css";
import { useEffect } from "react";

mapboxgl.accessToken = MAPBOX_TOKEN;

export const Map = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40],
      zoom: 9,
    });

    return () => map.remove();
  }, []);

  return <div id="map" className={styles.mapContainer} />;
};
