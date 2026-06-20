const express = require('express');
const app = express();

// Set to 5001 to match your Kubernetes deployment.yaml
const PORT = process.env.PORT || 5001;

app.use(express.json());

// ADDED: A root route so the main AWS URL displays a success message!
app.get('/', (req, res) => {
    res.json({
        message: "Smart Manufacturing API is LIVE!",
        version: "1.0.0",
        available_endpoints: [
            "/api/v1/sensors",
            "/health"
        ]
    });
});

// Mock endpoint representing factory production line sensors
app.get('/api/v1/sensors', (req, res) => {
    res.json({
        status: "success",
        timestamp: new Date().toISOString(),
        factory_id: "FAC_MUM_30",
        production_line: "Line_4_Assembly",
        metrics: {
            temperature_celsius: (Math.random() * (85 - 65) + 65).toFixed(2),
            vibration_amplitude: (Math.random() * (1.5 - 0.2) + 0.2).toFixed(2),
            machine_status: "OPERATIONAL"
        }
    });
});

// Health check endpoint (essential for Kubernetes monitoring later)
app.get('/health', (req, res) => {
    res.status(200).json({ status: "UP" });
});

// Bind to 0.0.0.0 so Docker containers can accept outside internet traffic
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});