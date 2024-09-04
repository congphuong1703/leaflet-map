import {useEffect} from "react";
import {useMap} from "react-leaflet";

const OnChangeLayer = () => {
    const map = useMap()

    useEffect(() => {
        map.on('baselayerchange', function (eventLayer) {
            if (eventLayer.name === 'Google Roadmap') {
                // Thiết lập maxZoom và minZoom cho bản đồ tổng thể
                map.options.maxZoom = 4;
                map.options.minZoom = 0;
                // Thiết lập maxBounds cho bản đồ tổng thể
                // var southWest = L.latLng(21.015693255672662, 105.80456587236911);
                // var northEast = L.latLng(20.943086, 105.950709);
                // map.setMaxBounds(L.latLngBounds(southWest, northEast));
            } else {
                // Nếu không phải là Google Roadmap, sử dụng maxZoom, minZoom và maxBounds mặc định hoặc đã được thiết lập trước đó
                map.options.maxZoom = 19; // Ví dụ
                map.options.minZoom = 5; // Ví dụ
                map.setMaxBounds(null); // Xóa maxBounds nếu đã được thiết lập trước đó
            }
        });
    }, [map]);
}

export default OnChangeLayer;