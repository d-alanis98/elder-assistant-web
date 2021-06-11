import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
    zoom?: number;
    center: Coordinate;
    marker: Coordinate;
}

const Map: React.FC<MapProps> = ({
    zoom = 15,
    center,
    marker
}) => (
    <LoadScript
        googleMapsApiKey = { process.env.REACT_APP_GOOGLE_MAPS_KEY || '' }
    >
        {
            React.useMemo(() => (
                <GoogleMap
                    zoom = { zoom }
                    center = { center }
                    mapContainerStyle = { containerStyle }
                >
                    <Marker 
                        position = { marker }
                    />
                </GoogleMap>
            ), [
                zoom,
                center,
                marker
            ])
        }
    </LoadScript>
);


export default React.memo(Map);

//Types
interface Coordinate {
    lat: number;
    lng: number;
}

//Styles
const containerStyle = {
    width: '100%',
    height: '100%',
    minHeight: '300px'
};