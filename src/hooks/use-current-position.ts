import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useCurrentPosition = () => {
  const [position, setPosition] = useState<GeolocationPosition>();

  useEffect(() => {
    let id: number;
    if ("geolocation" in navigator) {
      id = navigator.geolocation.watchPosition(
        (position) => setPosition(position),
        (error) => console.error(error)
      );
    } else {
      toast("Geolocation is not available", { type: "error" });
    }

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return position;
};
