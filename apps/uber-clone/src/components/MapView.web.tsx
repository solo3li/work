import React from 'react';
import { View } from 'react-native';

export const Marker = ({ children }: any) => <View>{children}</View>;
export const Polyline = () => null;
export const PROVIDER_DEFAULT = null;

const MapView = ({ children, style, initialRegion }: any) => {
  const lat = initialRegion?.latitude || 37.7749;
  const lon = initialRegion?.longitude || -122.4194;
  
  // Create a bounding box for the iframe map
  const delta = 0.05;
  const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <View style={[style, { backgroundColor: '#e0e0e0', overflow: 'hidden', position: 'relative' }]}>
      {React.createElement('iframe', {
        title: "OpenStreetMap Preview",
        width: "100%",
        height: "100%",
        frameBorder: "0",
        scrolling: "no",
        marginHeight: "0",
        marginWidth: "0",
        src: src,
        style: { border: 0 }
      })}
      {/* Hide native children as they won't align perfectly over the iframe map */}
      <View style={{ display: 'none' }}>
        {children}
      </View>
    </View>
  );
};

export default MapView;