import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
    zoom?: number;
    center: Coordinate;
    markers?: MarkerData[];
}

const Map: React.FC<MapProps> = ({
    zoom = 15,
    center,
    markers
}) => {
    const containerStyle = {
        width: '100%',
        height: '100%',
        minHeight: '300px'
    };

    return (
        <LoadScript
            googleMapsApiKey = { process.env.REACT_APP_GOOGLE_MAPS_KEY || '' }
        >
            <GoogleMap
                zoom = { zoom }
                center = { center }
                mapContainerStyle = { containerStyle }
            >
                {
                    markers && markers.map(marker => (
                        <Marker 
                            key = { marker.id }
                            position = { marker.position }
                        />
                    ))
                }
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;

//Types
interface Coordinate {
    lat: number;
    lng: number;
}

interface MarkerData {
    id: string;
    position: Coordinate;
}