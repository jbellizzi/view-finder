import { GeolocateControl, Map } from "mapbox-gl";
import { useEffect, useState } from "react";

import { useCurrentPosition } from "../../../hooks";

export const useInitializeMap = (containerId: string) => {
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    const map = new Map({
      container: containerId,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-78.933, 36.0237],
      zoom: 17,
      bearing: 90,
    });

    const geolocate = new GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
      showAccuracyCircle: false,
    });

    map.addControl(geolocate);

    setMap(map);

    return () => {
      map.remove();
    };
  }, [containerId]);

  const position = useCurrentPosition();

  return { map, position };
};

export type InitializeMap = ReturnType<typeof useInitializeMap>;
