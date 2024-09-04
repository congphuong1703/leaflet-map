import {useMap} from "react-leaflet";
import {useEffect} from "react";

const useCurrentLocationHook = (props) => {
    const {setCurrentLocation} = props
    const map = useMap();
    useEffect(() => {
        map.on('locationfound', function (e) {
            setCurrentLocation(e.latlng);
            map.stopLocate();
        });
    }, [map])
}

export default useCurrentLocationHook