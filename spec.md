# Smart Hydroponics Tower

## Current State
The app has a welcome screen, home page, plant selector, plant guide, growth tracker, harvest timer, nutrient settings, and system status. The backend stores one set of sensor readings (TDS, temperature, pump state, water clarity) with no history. There is no real-time data ingestion or live dashboard.

## Requested Changes (Diff)

### Add
- Backend: HTTP endpoint so IoT devices (ESP32/Arduino) can POST sensor data via a simple JSON payload
- Backend: Sensor reading history (last 50 readings) stored per session with timestamps
- Backend: getReadingHistory query to fetch all stored readings
- Frontend: New "Live Dashboard" screen accessible from the Home Page
- Frontend: Dashboard shows live sensor values (TDS, temperature, turbidity/water clarity, pump status) auto-refreshing every 3 seconds
- Frontend: Mini sparkline-style history charts for TDS and temperature
- Frontend: Color-coded status indicators comparing live values against the selected plant's safe ranges
- Frontend: Alert banners when any value is out of safe range
- Frontend: "How to connect your device" info section showing the canister HTTP endpoint URL and sample JSON payload
- Frontend: Last-updated timestamp shown on dashboard

### Modify
- Backend: extend SystemStatus to include a `turbidity` numeric field alongside waterClarity text
- Backend: store an array of timestamped readings (SensorReading type) capped at 50 entries
- Frontend: Home page gets a "Live Dashboard" button
- Frontend: App.tsx adds "live-dashboard" screen

### Remove
- Nothing removed

## Implementation Plan
1. Update backend to add SensorReading type with timestamp, store history array, add HTTP request handler for IoT POST, add getReadingHistory query
2. Add LiveDashboardPage component with auto-refresh, sparklines, safe-range comparison, alert banners, and device connection info
3. Wire new screen into App.tsx and HomePage
