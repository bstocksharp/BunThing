import { Card, CardContent, Typography, Box, alpha } from "@mui/material";
import type { HourlyForecast } from "@/hooks/useWeather";

type Props = {
  hourly: HourlyForecast[];
};

// Simple helper to map weather to visuals
const getWeatherIcon = (desc: string) => {
  const d = desc.toLowerCase();
  if (d.includes("thunderstorm")) return "⚡";
  if (d.includes("rain") || d.includes("drizzle")) return "🌧️";
  if (d.includes("cloud")) return "☁️";
  if (d.includes("snow")) return "❄️";
  return "☀️";
};

export function HourlyForecast({ hourly }: Props) {
  const now = new Date();
  const currentHour = now.getHours();

  // Get next 12 hours
  const next12Hours = hourly.slice(
    currentHour,
    Math.min(currentHour + 12, hourly.length),
  );

  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: "auto",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="overline"
          sx={{ mb: 2, display: "block", opacity: 0.7, letterSpacing: 1.5 }}
        >
          Hourly Forecast
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 1,
            // Custom scrollbar for better look
            "::-webkit-scrollbar": { height: "6px" },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: "10px",
            },
          }}
        >
          {next12Hours.map((hour, index) => (
            <Box
              key={hour.time}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 80,
                py: 2,
                px: 1,
                borderRadius: 3,
                transition: "all 0.2s ease",
                background:
                  index === 0 ? "rgba(255,255,255,0.1)" : "transparent",
              }}
            >
              <Typography
                variant="caption"
                sx={{ opacity: 0.8, fontWeight: 600 }}
              >
                {index === 0 ? "NOW" : `${hour.hour}:00`}
              </Typography>

              <Typography variant="h5" sx={{ my: 1, fontSize: "1.5rem" }}>
                {getWeatherIcon(hour.description)}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {Math.round(hour.temperature)}°
              </Typography>

              {hour.precipitation > 0 ? (
                <Typography
                  variant="caption"
                  sx={{ color: "#7dd3fc", fontWeight: "bold", mt: 1 }}
                >
                  {hour.precipitation.toFixed(1)}mm
                </Typography>
              ) : (
                <Typography variant="caption" sx={{ opacity: 0.5, mt: 1 }}>
                  0%
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
