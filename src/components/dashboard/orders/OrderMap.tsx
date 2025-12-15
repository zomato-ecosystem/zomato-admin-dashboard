export function OrderMap() {
    return (
        <div className="relative w-full h-[400px] bg-muted/30 rounded-lg border border-border flex items-center justify-center overflow-hidden">
            {/* Placeholder for Mapbox/Leaflet */}
            <div className="absolute inset-0 bg-[url('https://docs.mapbox.com/mapbox-gl-js/assets/streets.jpg')] bg-cover opacity-50" />
            <div className="relative z-10 bg-background/80 p-4 rounded-lg shadow-lg text-center backdrop-blur-sm">
                <p className="font-semibold text-foreground">Live Tracking Map</p>
                <p className="text-xs text-muted-foreground">Coordinates: 28.6139° N, 77.2090° E</p>
            </div>
        </div>
    );
}
