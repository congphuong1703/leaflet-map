import React from "react";
import {TileLayer} from "react-leaflet";

const CustomLayer = () => {
    return (
        <TileLayer
            url={`${process.env.REACT_APP_URL_LAYER}/{z}/{x}/{y}.png`}
            attribution='NPC contributors'
            tms={1}
            minZoom={12}
            maxZoom={17}
        />
    )
}

export default CustomLayer;