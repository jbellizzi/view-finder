import { distance } from "@turf/turf";
import { Feature, LineString, Point } from "geojson";
import { EventData, GeoJSONSource, GeoJSONSourceRaw, MapMouseEvent } from "mapbox-gl";
import { useCallback, useEffect, useState } from "react";

import { InitializeMap } from ".";

export const TARGET_POINT_SOURCE = "TARGET_POINT_SOURCE";
export const TARGET_LINE_SOURCE = "TARGET_LINE_SOURCE";
export const TARGET_POINT_LAYER = "TARGET_POINT_LAYER";
export const TARGET_LINE_LAYER = "TARGET_LINE_LAYER";

const initialGeoJSONSource: GeoJSONSourceRaw = { type: "geojson", data: { type: "FeatureCollection", features: [] } };

export const useDistanceMarker = ({ map, position }: InitializeMap) => {
  const [yards, setYards] = useState<number>(0);

  const onClick = useCallback(
    (e: MapMouseEvent & EventData) => {
      if (!map || !position) return;

      const { lngLat } = e;
      const { lng, lat } = lngLat;

      const { coords } = position;
      const { longitude: positionLng, latitude: positionLat } = coords;

      const currentLocationPoint: Feature<Point> = {
        type: "Feature",
        geometry: { type: "Point", coordinates: [positionLng, positionLat] },
        properties: { id: String(new Date().getTime()) },
      };

      const targetPoint: Feature<Point> = {
        type: "Feature",
        geometry: { type: "Point", coordinates: [lng, lat] },
        properties: { id: String(new Date().getTime()) },
      };

      const targetLine: Feature<LineString> = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [positionLng, positionLat],
            [lng, lat],
          ],
        },
        properties: { id: String(new Date().getTime()) },
      };

      (map.getSource(TARGET_POINT_SOURCE) as GeoJSONSource).setData({
        type: "FeatureCollection",
        features: [targetPoint],
      });
      (map.getSource(TARGET_LINE_SOURCE) as GeoJSONSource).setData({
        type: "FeatureCollection",
        features: [targetLine],
      });

      setYards(distance(currentLocationPoint, targetPoint, { units: "yards" }));
    },
    [position, map]
  );

  useEffect(() => {
    if (!map) return;

    map.on("load", () => {
      map.addSource(TARGET_POINT_SOURCE, initialGeoJSONSource);
      map.addSource(TARGET_LINE_SOURCE, initialGeoJSONSource);

      map.addLayer({
        id: TARGET_POINT_LAYER,
        type: "circle",
        source: TARGET_POINT_SOURCE,
        paint: { "circle-radius": 5, "circle-color": "#000" },
      });

      map.addLayer({
        id: TARGET_LINE_LAYER,
        type: "line",
        source: TARGET_LINE_SOURCE,
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#000", "line-width": 2.5 },
      });

      map.on("click", onClick);
    });

    return () => {
      map.on("load", () => {
        map.off("click", onClick);
        map.removeLayer(TARGET_POINT_LAYER);
        map.removeLayer(TARGET_LINE_LAYER);
        map.removeSource(TARGET_POINT_SOURCE);
        map.removeSource(TARGET_LINE_SOURCE);
      });
    };
  }, [map, onClick]);

  return yards;
};
