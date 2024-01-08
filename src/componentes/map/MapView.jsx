import L from "leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import markerIconUrl from "../../assets/Imagenes/map/marker.png";

const markerIcon = new L.Icon({
  iconUrl: markerIconUrl,
  iconSize: [30, 30],
  popupAnchor: [-6, -20],
});

const MapView = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
  
    useEffect(() => {
      const latitud = 10.91397;
      const longitud = -74.7732;
  
      if (!mapRef.current) {
        // Si el mapa no existe, crea uno nuevo y guárdalo en el ref
        const map = L.map(mapContainerRef.current).setView(
          [latitud, longitud],
          15
        );
  
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);
  
        L.marker([latitud, longitud], { icon: markerIcon })
          .addTo(map)
          .bindPopup(`Iglesia Biblica Sublime Gracia`)
          .openPopup();
  
        mapRef.current = map;
      }
  
      // Al salir del efecto, destruye el mapa
      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }, []); // Solo se ejecutará una vez en el montaje inicial
  
    return (
      <div
        className="mapContainer"
        ref={mapContainerRef}
      ></div>
    );
  };
  
  export default MapView;
