import L from 'leaflet'

export const Icon = (props) => {
    const {color = 'blue'} = props
    return new L.ExtraMarkers.icon({
        markerColor: color,
        ...props
    })
}


export default Icon
//https://github.com/lennardv2/Leaflet.awesome-markers#screenshots
//https://github.com/coryasilva/Leaflet.ExtraMarkers