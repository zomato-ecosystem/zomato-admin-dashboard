'use client';

import { useState, useMemo, useCallback } from 'react';
import Map, {
    Marker,
    Popup,
    Source,
    Layer,
    NavigationControl,
    FullscreenControl,
    GeolocateControl
} from 'react-map-gl';
import {
    Bike,
    Package,
    Store,
    Thermometer,
    Filter
} from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Badge } from "@/components/ui/badge";

// Types
interface GeoItem {
    id: string;
    type: 'order' | 'rider' | 'restaurant';
    latitude: number;
    longitude: number;
    status?: string;
    name?: string;
    details?: string;
}

// Mock Data
const MOCK_DATA: GeoItem[] = [
    // Orders
    { id: 'O1', type: 'order', latitude: 28.6139, longitude: 77.2090, status: 'DELIVERING', name: 'Order #1234', details: 'Butter Chicken x2' },
    { id: 'O2', type: 'order', latitude: 28.6200, longitude: 77.2100, status: 'PREPARING', name: 'Order #5678', details: 'Veg Pizza' },
    { id: 'O3', type: 'order', latitude: 28.6300, longitude: 77.2200, status: 'PENDING', name: 'Order #9012', details: 'Burger Meal' },
    // Riders
    { id: 'R1', type: 'rider', latitude: 28.6150, longitude: 77.2050, status: 'BUSY', name: 'Rider Ramesh' },
    { id: 'R2', type: 'rider', latitude: 28.6250, longitude: 77.2150, status: 'IDLE', name: 'Rider Suresh' },
    // Restaurants
    { id: 'REST1', type: 'restaurant', latitude: 28.6350, longitude: 77.2250, name: 'Pizza Hut CP' },
    { id: 'REST2', type: 'restaurant', latitude: 28.6100, longitude: 77.2000, name: 'KFC Connaught' },
];

export function LiveOrdersMap() {
    const [viewState, setViewState] = useState({
        latitude: 28.6139,
        longitude: 77.2090,
        zoom: 12
    });
    const [popupInfo, setPopupInfo] = useState<GeoItem | null>(null);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string>('all'); // all, orders, riders

    // Mapbox Token
    const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbTV..."'; // Replace with valid token or User's token

    const filteredData = useMemo(() => {
        if (activeFilter === 'all') return MOCK_DATA;
        return MOCK_DATA.filter(item => item.type === activeFilter.slice(0, -1)); // simple plural to singular logic
    }, [activeFilter]);

    // Heatmap Layer Config
    const heatmapLayer = {
        id: 'heatmap',
        type: 'heatmap' as const,
        paint: {
            'heatmap-weight': {
                property: 'dbh',
                type: 'exponential',
                stops: [[1, 0], [62, 1]]
            },
            'heatmap-intensity': {
                stops: [[11, 1], [15, 3]]
            },
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(33,102,172,0)',
                0.2, 'rgb(103,169,207)',
                0.4, 'rgb(209,229,240)',
                0.6, 'rgb(253,219,199)',
                0.8, 'rgb(239,138,98)',
                1, 'rgb(178,24,43)'
            ],
            'heatmap-radius': {
                stops: [[11, 15], [15, 20]]
            },
            'heatmap-opacity': {
                default: 1,
                stops: [[14, 1], [15, 0]]
            },
        }
    };

    const geoJsonData = useMemo(() => {
        return {
            type: 'FeatureCollection',
            features: MOCK_DATA.filter(d => d.type === 'order').map(d => ({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [d.longitude, d.latitude] },
                properties: { dbh: 1 } // placeholder property for weight
            }))
        };
    }, []);

    // Render Markers
    const pins = useMemo(() => filteredData.map((city, index) => {
        // Simple Color Coding
        let color = '#ef4444'; // Red (Default/Order)
        let Icon = Package;
        if (city.type === 'rider') {
            color = '#3b82f6'; // Blue
            Icon = Bike;
        } else if (city.type === 'restaurant') {
            color = '#f97316'; // Orange
            Icon = Store;
        }

        if (city.status === 'DELIVERING') color = '#22c55e'; // Green

        return (
            <Marker
                key={`marker-${index}`}
                longitude={city.longitude}
                latitude={city.latitude}
                anchor="bottom"
                onClick={(e: any) => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo(city);
                }}
            >
                <div
                    className="cursor-pointer transform hover:scale-110 transition-transform p-1 rounded-full shadow-lg border-2 border-white"
                    style={{ backgroundColor: color }}
                >
                    <Icon className="w-4 h-4 text-white" />
                </div>
            </Marker>
        );
    }), [filteredData]);

    return (
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-gray-200">
            <Map
                {...viewState}
                onMove={(evt: any) => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/light-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                <NavigationControl position="top-right" />
                <FullscreenControl position="top-right" />
                <GeolocateControl position="top-right" />

                {/* Markers */}
                {!showHeatmap && pins}

                {/* Heatmap */}
                {showHeatmap && (
                    <Source type="geojson" data={geoJsonData as any}>
                        <Layer {...heatmapLayer as any} />
                    </Source>
                )}

                {/* Popup */}
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={popupInfo.longitude}
                        latitude={popupInfo.latitude}
                        onClose={() => setPopupInfo(null)}
                        className="min-w-[200px]"
                    >
                        <div className="p-2">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant={popupInfo.type === 'order' ? 'destructive' : 'default'} className="uppercase text-xs">
                                    {popupInfo.type}
                                </Badge>
                                {popupInfo.status && (
                                    <span className="text-xs font-semibold text-gray-500">{popupInfo.status}</span>
                                )}
                            </div>
                            <h3 className="font-bold text-gray-900">{popupInfo.name}</h3>
                            {popupInfo.details && (
                                <p className="text-sm text-gray-600 mt-1">{popupInfo.details}</p>
                            )}
                        </div>
                    </Popup>
                )}
            </Map>

            {/* Controls Overlay */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md border border-gray-200 flex flex-col gap-3 z-10 w-48">
                <h3 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Map Filters
                </h3>

                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                            type="radio"
                            name="filter"
                            checked={activeFilter === 'all'}
                            onChange={() => setActiveFilter('all')}
                            className="text-red-600 focus:ring-red-500"
                        />
                        Show All
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                            type="radio"
                            name="filter"
                            checked={activeFilter === 'orders'}
                            onChange={() => setActiveFilter('orders')}
                        />
                        Orders Only
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                            type="radio"
                            name="filter"
                            checked={activeFilter === 'riders'}
                            onChange={() => setActiveFilter('riders')}
                        />
                        Partners Only
                    </label>
                </div>

                <div className="border-t border-gray-200 pt-2 mt-1">
                    <button
                        onClick={() => setShowHeatmap(!showHeatmap)}
                        className={`w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${showHeatmap
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <Thermometer className="w-4 h-4" />
                        Heatmap {showHeatmap ? 'On' : 'Off'}
                    </button>
                </div>
            </div>

            {/* Mapbox Token Warning if missing (Optional for dev) */}
            {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
                <div className="absolute bottom-4 left-4 right-4 bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-xs text-yellow-800 shadow-sm text-center">
                    Note: Mapbox Token missing. Map tiles may not load. Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.
                </div>
            )}
        </div>
    );
}
