import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { oilFields } from '../data';

const MURZUQ_CENTER = [27.5, 12.5];
const DEFAULT_ZOOM = 8;

export function FieldMap() {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Field Map</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="h-[600px] rounded-lg overflow-hidden">
            <MapContainer
              center={MURZUQ_CENTER}
              zoom={DEFAULT_ZOOM}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {oilFields.map((field) => (
                <CircleMarker
                  key={field.id}
                  center={[field.location.latitude, field.location.longitude]}
                  radius={selectedField === field.id ? 12 : 8}
                  fillColor={field.concession === 'NC115' ? '#4f46e5' : '#10b981'}
                  color="white"
                  weight={2}
                  fillOpacity={0.7}
                  eventHandlers={{
                    click: () => setSelectedField(field.id),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">{field.name}</h3>
                      <p className="text-sm text-gray-600">{field.concession}</p>
                      <div className="mt-2 text-sm">
                        <p>OOIP: {field.ooip.toLocaleString()} MMbbl</p>
                        <p>Recovery Factor: {field.details.recoveryFactor}%</p>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Field Details</h3>
          <div className="space-y-6">
            {oilFields.map((field) => (
              <div
                key={field.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedField === field.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedField(field.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{field.name}</h4>
                  <span className="text-sm text-gray-500">{field.concession}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Discovery Date</p>
                    <p className="font-medium">
                      {new Date(field.details.discoveryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fluid Type</p>
                    <p className="font-medium">{field.details.fluidType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Water Cut</p>
                    <p className="font-medium">{field.details.waterCut}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Temperature</p>
                    <p className="font-medium">{field.details.reservoirTemperature}°F</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Lithology</p>
                    <p className="font-medium">{field.details.lithology}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}