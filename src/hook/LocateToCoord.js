import {useMap} from "react-leaflet";
import {useEffect} from "react";

function LocateToCoord({coords}) {
    const map = useMap();
    useEffect(() => {
        map.setView(coords, map.getZoom());
    }, [coords])

    return null;
}

export default LocateToCoord