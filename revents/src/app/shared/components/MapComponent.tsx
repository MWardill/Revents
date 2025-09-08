import {} from 'react-leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

type Props = {  
    position: [number, number];
    venue: string;
}

export default function MapComponent({ position, venue }: Props) {

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={new Icon({iconUrl: markerIconPng})} position={position}>
                <Popup>
                    {venue}
                </Popup>
            </Marker>
        </MapContainer>
    )   
}