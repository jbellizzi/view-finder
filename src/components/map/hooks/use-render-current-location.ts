import { Marker } from "mapbox-gl";
import { useEffect } from "react";

import { InitializeMap } from ".";
import styles from "../map.module.css";

export const useRenderCurrentLocation = ({ map, position }: InitializeMap) => {
  useEffect(() => {
    if (!map || !position) return;

    let currentLocation: Marker;

    const { longitude, latitude } = position.coords;
    const markerEl = document.createElement("div");
    markerEl.className = styles.currentLocation;

    map.on("load", () => {
      currentLocation = new Marker(markerEl).setLngLat([longitude, latitude]).addTo(map);
    });

    return () => {
      if (markerEl) markerEl.remove();
      if (currentLocation) currentLocation.remove();
    };
  }, [map, position]);
};
