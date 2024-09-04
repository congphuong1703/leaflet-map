import {TileLayer} from "react-leaflet";
import React from "react";

const OSMLayer = () => {
    return (
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
    )
}
export default OSMLayer;