const map = L.map("map", {
    minZoom: 1,
    maxZoom: 18
}).setView([2, -70], 3);

const noLabelsLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Tiles &copy; Esri",
        maxZoom: 1
    }
);

const labelsLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Tiles &copy; Esri",
        minZoom: 2,
        maxZoom: 18
    }
);

function updateMapLayer() {
    const layer = map.getZoom() < 2 ? noLabelsLayer : labelsLayer;

    if (!map.hasLayer(layer)) {
        map.eachLayer(currentLayer => {
            if (currentLayer === noLabelsLayer || currentLayer === labelsLayer) {
                map.removeLayer(currentLayer);
            }
        });

        layer.addTo(map);
    }
}

updateMapLayer();
map.on("zoomend", updateMapLayer);

L.marker([4.711, -74.072])
    .addTo(map)
    .bindPopup("My location");