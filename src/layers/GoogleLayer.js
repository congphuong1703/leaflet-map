import {TileLayer} from "react-leaflet";
import 'leaflet.gridlayer.googlemutant';
import React from "react";

const GoogleLayer = ({type}) => {
    return (<TileLayer
        url={`https://{s}.google.com/vt/lyrs=${type}&x={x}&y={y}&z={z}`}
        attribution='&copy; <a href="https://www.google.com/help/terms_maps/">Google Map</a> contributors'
        subdomains={['mt1', 'mt2', 'mt3']}
    />)
};

export default GoogleLayer;