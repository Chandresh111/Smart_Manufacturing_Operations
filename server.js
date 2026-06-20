const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

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

// Health check endpoint (essential for Docker and Jenkins later)
app.get('/health', (req, res) => {
    res.status(200).json({ status: "UP" });
});

app.listen(PORT, () => {
    console.log(`Smart Manufacturing Service running on port ${PORT}`);
});