import {useEffect, useRef} from "react";
import L from "leaflet";
import {useMap} from "react-leaflet";
import 'leaflet.locatecontrol'
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'

const DirectCurrentLocation = () => {
    const map = useMap()
    const locate = useRef(null);

    useEffect(() => {
        if (locate.current) {
            map.removeControl(locate.current);
        }
        locate.current = L.control.locate({
            flyTo: true,
            cacheLocation: true
        }).addTo(map);
        return () => {
            if (locate.current) {
                map.removeControl(locate.current);
            }
        };
    }, [map]);

    return null;
}

export default DirectCurrentLocation