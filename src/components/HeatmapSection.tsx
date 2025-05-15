"use client";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/leaflet/marker-shadow.png",
  shadowSize: [41, 41],
});

const ResizeMap = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200); // delay ensures DOM is ready
  }, [map]);

  return null;
};

const HeatmapSection = () => {
  const [activeTab, setActiveTab] = useState("chart");

  // Heights for each tab content
  const containerHeights = {
    chart: 220,
    map: 400,
  };

  return (
    <div
  className="chart-container w-full rounded-md overflow-hidden border border-gray-300"
  style={{
    height: activeTab === "map" ? "400px" : "220px",
    transition: "height 0.3s ease",
  }}
>

      <h2 className="text-lg font-semibold mb-4">Inspection Due Heatmap</h2>

      <Tabs defaultValue="chart" onValueChange={setActiveTab} className="h-full">
        <TabsList className="mb-4">
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>

        {/* Container for tab content */}
        <div className="relative h-[calc(100%-3rem)] w-full"> 
          {/* 3rem approx height of h2 + margin */}
          
          {/* Chart content */}
          <TabsContent
            value="chart"
            className="absolute inset-0 flex items-center justify-center bg-white p-4"
          >
            <div className="text-center text-gray-500 overflow-auto">
              <p>Ward data visualization will be displayed here</p>
              <p className="text-sm">Shows complaint distribution by ward</p>
            </div>
          </TabsContent>

          {/* Map content */}
          <TabsContent value="map" className="absolute inset-0">
            <MapContainer
              center={[9.1526, 79.1219]}
              zoom={13}
              scrollWheelZoom={true}
              className="w-full h-full rounded-md"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ResizeMap />
              <Marker position={[9.142, 79.123]}>
                <Popup>Maria Mahal – 5 Trees</Popup>
              </Marker>
              <Marker position={[9.151, 79.128]}>
                <Popup>SPIC Area – 12 Trees</Popup>
              </Marker>
              <Marker position={[9.146, 79.115]}>
                <Popup>Railway Colony – 3 Trees</Popup>
              </Marker>
            </MapContainer>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default HeatmapSection;
