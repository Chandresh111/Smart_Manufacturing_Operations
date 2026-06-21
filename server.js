const express = require('express');
const app = express();

// Set to 5000 to match your Kubernetes deployment.yaml
const PORT = process.env.PORT || 5000;

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


// Dynamic Mock endpoint representing factory production line sensors
app.get('/api/v1/sensors', (req, res) => {
    // 1. Dynamic Inputs: Accept query parameters from the URL or use defaults
    const factoryId = req.query.factory_id || "FAC_MUM_30";
    const productionLine = req.query.line || "Line_4_Assembly";

    // 2. Generate the metrics
    const temp = (Math.random() * (90 - 60) + 60); // Generates between 60°C and 90°C
    const vib = (Math.random() * (2.0 - 0.1) + 0.1); // Generates between 0.1 and 2.0 amplitude

    // 3. Dynamic Logic: Determine machine health based on the generated metrics
    let currentStatus = "OPERATIONAL";

    if (temp > 85 || vib > 1.6) {
        currentStatus = "CRITICAL_OUTAGE";
    } else if (temp > 80 || vib > 1.2) {
        currentStatus = "MAINTENANCE_WARNING";
    }

    // 4. Send the dynamic response
    res.json({
        status: "success",
        timestamp: new Date().toISOString(),
        factory_id: factoryId,
        production_line: productionLine,
        metrics: {
            temperature_celsius: temp.toFixed(2),
            vibration_amplitude: vib.toFixed(2),
            machine_status: currentStatus
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