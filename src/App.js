import React, {useState} from "react";
import {GeoJSON, LayersControl, MapContainer, Marker} from "react-leaflet";
import "./App.css";
import parkData from './data/data.json'
import RoutingMachine from "./machineRoute";
import LocateToCoord from "./hook/LocateToCoord";
import UseCurrentLocation from "./hook/UseCurrentLocation";
import L from 'leaflet'
import OnChangeLayer from "./hook/OnChangeLayer";
import LocateCurrentLocation from "./hook/LocateCurrentLocation";
import DirectCurrentLocation from "./hook/DirectCurrentLocation";
import OSMLayer from "./layers/OSMLayer";
import GoogleLayer from "./layers/GoogleLayer";
import CustomLayer from "./layers/CustomLayer";
import dataMap from './data/map.json'
import 'leaflet-switch-basemap'
import 'leaflet-switch-basemap/src/L.switchBasemap.css'
import DrawerSidebar from "./component/DrawerSidebar";
import SearchingLocation from "./component/SearchingLocation";
import ListLocations from "./component/ListLocations";
import 'leaflet-extra-markers'
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'
import Icon from "./component/Icon";
import {ICON_TYPE} from "./Constants";
import AddMarker from "./component/AddMarker";

const {BaseLayer, Overlay} = LayersControl;


const App = () => {
    const [activeMarker, setActiveMarker] = React.useState(null);
    const [coordinateRoute, setCoordinateRoute] = useState(null)
    const [coordinateCenter, setCoordinateCenter] = useState([21.015693255672662, 105.80456587236911])
    const [isSearch, setIsSearch] = useState(false)
    const [isLocate, setIsLocate] = useState(false)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [markers, setMarkers] = useState([])
    const onSearch = (id) => {
        const ele = parkData.features.find((element) => element.properties.id === id)
        setActiveMarker(ele);
        setCoordinateCenter([
            ele.geometry.coordinates[0],
            ele.geometry.coordinates[1]]
        )

    }

    const onDirection = (item) => {
        setCoordinateRoute(L.latLng(item[0], item[1]))
        setIsLocate(true)
        setActiveMarker(null)
    }
    return (
        <MapContainer center={coordinateCenter} zoom={15} maxZoom={18} minZoom={13}
            // maxBounds={bounds}
            // maxBoundsViscosity={1}
        >
            <LayersControl position="topright" collapsed={true}>
                <BaseLayer checked name="Open Street Map">
                    <OSMLayer />
                </BaseLayer>
                <BaseLayer name="Google Satellite">
                    <GoogleLayer type="s" />
                </BaseLayer>
                <BaseLayer name="Google Roadmap">
                    <GoogleLayer type="r" />
                </BaseLayer>
                <Overlay name="Overlay GeoJSON">
                    <GeoJSON data={dataMap} />
                </Overlay>
                <Overlay name="Custom Map">
                    <CustomLayer />
                </Overlay>
            </LayersControl>
            <DirectCurrentLocation />
            <OnChangeLayer />
            <LocateToCoord coords={coordinateCenter} />
            <LocateCurrentLocation isLocate={isLocate} />
            {markers.map((marker, index) => (
                <Marker key={index} position={marker.geometry.coordinates}
                        bubblingMouseEvents
                        eventHandlers={{
                            click: () => {
                                setActiveMarker(marker);
                                setCoordinateCenter([
                                    marker.geometry.coordinates[0],
                                    marker.geometry.coordinates[1]]
                                )
                            },
                        }}
                        icon={Icon({icon: marker.type, prefix: ICON_TYPE.FONTAWESOME})} />
            ))}
            <DrawerSidebar properties={activeMarker?.properties}
                           onDirection={() => onDirection(activeMarker?.geometry?.coordinates)}
                           activeMarker={activeMarker}
                           setActiveMarker={setActiveMarker} />
            <RoutingMachine from={coordinateRoute} to={currentLocation} isLocate={isLocate} />
            <UseCurrentLocation setCurrentLocation={setCurrentLocation} />
            <SearchingLocation onSearch={onSearch} isSearch={isSearch} setIsSearch={setIsSearch} />
            <ListLocations setActiveMarker={setActiveMarker} setCoordinateCenter={setCoordinateCenter} />
            <AddMarker setMarkers={setMarkers} />
        </MapContainer>
    );
}
export default App;