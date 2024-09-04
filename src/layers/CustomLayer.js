import React from "react";
import {TileLayer} from "react-leaflet";

const CustomLayer = () => {
    return (
        <TileLayer
            url={`${process.env.REACT_APP_URL_LAYER}/{z}/{x}/{y}.png`}
            attribution='NPC contributors'
            tms={1}
            minZoom={15}
            maxZoom={18}
        />
    )
}

export default CustomLayer;