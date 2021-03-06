import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

interface MapProps {
    zoom?: number;
    center: Coordinate;
    marker: Coordinate;
    mapWidth?: number | string;
    mapHeight?: number | string;
}

const Map: React.FC<MapProps> = ({
    zoom = 15,
    center,
    marker,
    mapWidth,
    mapHeight
}) => React.useMemo(() => (
        <GoogleMap
            zoom = { zoom }
            center = { center }
            mapContainerStyle = {{
                ...containerStyle,
                width: mapWidth || containerStyle.width,
                height: mapHeight || containerStyle.height 
            }}
        >
            <Marker 
                position = { marker }
            />
        </GoogleMap>
    ), [
    zoom,
    center,
    marker,
    mapWidth,
    mapHeight
]);


export default React.memo(Map);

//Types
interface Coordinate {
    lat: number;
    lng: number;
}

//Styles
const containerStyle = {
    width: '100%',
    height: 300,
};