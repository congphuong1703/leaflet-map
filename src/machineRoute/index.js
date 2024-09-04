import L from "leaflet";
import "leaflet-routing-machine";
import {useEffect, useRef} from "react";
import {useMap} from "react-leaflet";

const RoutingMachine = (props) => {
    const {from, to, isLocate} = props
    const map = useMap();
    const routingControl = useRef(null);
    useEffect(() => {
        if (from && to && isLocate) {
            if (routingControl.current && map) {
                map.removeControl(routingControl.current);
            }
            const waypoints = [from, to]
            routingControl.current = L.Routing.control({
                waypoints,
                lineOptions: {
                    styles: [{color: "#6FA1EC", weight: 5}]
                },
                routeWhileDragging: true,
                showAlternatives: true,
                addWaypoints: false,
                autoRoute: true,
                show: false,
                draggableWaypoints: true,
                fitSelectedRoutes: false,
            });
            routingControl.current.addTo(map);
            const routeContainer = document.querySelector('.leaflet-routing-container')
            if (routeContainer) {
                routeContainer.style.display = 'none'
            }
            return () => {
                if (routingControl.current && map) {
                    map.removeControl(routingControl.current);
                }
            };
        } else {
            if (routingControl.current && map) {
                map.removeControl(routingControl.current);
            }
        }
    }, [map, from, to]);

    return null;
};

export default RoutingMachine;
