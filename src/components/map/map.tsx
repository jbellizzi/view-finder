import mapboxgl from "mapbox-gl";

import { MAPBOX_TOKEN } from "../../constants";
import { useDistanceMarker, useInitializeMap, useRenderCurrentLocation } from "./hooks";
import styles from "./map.module.css";

mapboxgl.accessToken = MAPBOX_TOKEN;

const MAP_CONTAINER_ID: string = "map";

export const Map = () => {
  const { map, position } = useInitializeMap(MAP_CONTAINER_ID);

  useRenderCurrentLocation({ map, position });

  const distance = useDistanceMarker({ map, position });

  console.log({ distance });

  return <div id={MAP_CONTAINER_ID} className={styles.mapContainer} />;
};
