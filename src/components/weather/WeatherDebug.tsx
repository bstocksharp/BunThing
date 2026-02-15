import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import {
  getBackgroundGradient,
  getEffectType,
  getWeatherConfig,
} from "./WeatherConfig";
import Rain from "./Rain";
import Lightning from "./Lightning";
import Snow from "./Snow";

type WeatherCategory =
  | "clear"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "rain_showers"
  | "snow_showers"
  | "thunderstorm";

type TimePeriod =
  | "morning"
  | "late_morning"
  | "afternoon"
  | "sunset"
  | "dusk"
  | "night";

const WEATHER_CATEGORIES: WeatherCategory[] = [
  "clear",
  "cloudy",
  "fog",
  "drizzle",
  "rain",
  "snow",
  "rain_showers",
  "snow_showers",
  "thunderstorm",
];

const TIME_PERIODS: TimePeriod[] = [
  "morning",
  "late_morning",
  "afternoon",
  "sunset",
  "dusk",
  "night",
];

const CATEGORY_TO_CODE: Record<WeatherCategory, number> = {
  clear: 0,
  cloudy: 2,
  fog: 45,
  drizzle: 51,
  rain: 65,
  snow: 75,
  rain_showers: 80,
  snow_showers: 85,
  thunderstorm: 95,
};

const HOUR_TO_PERIOD: Record<number, TimePeriod> = {
  5: "morning",
  6: "morning",
  7: "morning",
  8: "morning",
  9: "late_morning",
  10: "late_morning",
  11: "late_morning",
  12: "afternoon",
  13: "afternoon",
  14: "afternoon",
  15: "afternoon",
  16: "afternoon",
  17: "sunset",
  18: "sunset",
  19: "dusk",
  20: "dusk",
  21: "night",
  22: "night",
  23: "night",
  0: "night",
  1: "night",
  2: "night",
  3: "night",
  4: "night",
};

const TIME_PERIOD_TO_HOUR: Record<TimePeriod, number> = {
  morning: 6,
  late_morning: 10,
  afternoon: 14,
  sunset: 18,
  dusk: 20,
  night: 0,
};

export function WeatherDebugger() {
  const [category, setCategory] = useState<WeatherCategory>("clear");
  const [hour, setHour] = useState(14);
  const [showConfig, setShowConfig] = useState(false);

  const weatherCode = CATEGORY_TO_CODE[category];
  const period = HOUR_TO_PERIOD[hour] || "night";
  const gradient = getBackgroundGradient(hour, weatherCode);
  const config = getWeatherConfig(weatherCode);
  const effectType = getEffectType(weatherCode);

  const handleHourChange = (_: unknown, value: number | number[]) => {
    setHour(value as number);
  };

  const handlePeriodChange = (newPeriod: TimePeriod) => {
    setHour(TIME_PERIOD_TO_HOUR[newPeriod]);
  };

  return (
    <Card
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 320,
        maxHeight: "80vh",
        overflow: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
        boxShadow: 4,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          🎨 Weather Debugger
        </Typography>

        {/* Weather Category */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel>Weather Category</FormLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as WeatherCategory)}
            size="small"
          >
            {WEATHER_CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Time Period */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel>Time Period</FormLabel>
          <Select
            value={period}
            onChange={(e) => handlePeriodChange(e.target.value as TimePeriod)}
            size="small"
          >
            {TIME_PERIODS.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Hour Slider */}
        <Box sx={{ mb: 2 }}>
          <FormLabel>Hour: {hour}:00</FormLabel>
          <Slider
            value={hour}
            onChange={handleHourChange}
            min={0}
            max={23}
            marks
            valueLabelDisplay="auto"
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Weather Code Display */}
        <Box sx={{ mb: 2, p: 1, backgroundColor: "#f3f4f6", borderRadius: 1 }}>
          <Typography variant="caption" sx={{ display: "block" }}>
            Weather Code: <strong>{weatherCode}</strong>
          </Typography>
          <Typography variant="caption">
            Gradient Key:{" "}
            <strong>
              {category}_{period}
            </strong>
          </Typography>
        </Box>

        {/* Quick Info */}
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={`Rain: ${config.showRain ? "✓" : "✗"}`}
            size="small"
            color={config.showRain ? "success" : "default"}
          />
          <Chip
            label={`Lightning: ${config.showLightning ? "✓" : "✗"}`}
            size="small"
            color={config.showLightning ? "warning" : "default"}
          />
          <Chip label={`Speed: ${config.rainSpeed.toFixed(1)}`} size="small" />
          <Chip
            label={`Density: ${config.rainDensity.toFixed(1)}`}
            size="small"
          />
        </Stack>

        {/* Full Config */}
        <Button
          onClick={() => setShowConfig(!showConfig)}
          fullWidth
          size="small"
          variant="outlined"
          sx={{ mb: 2 }}
        >
          {showConfig ? "Hide" : "Show"} Full Config
        </Button>

        {showConfig && (
          <Box
            sx={{
              p: 1,
              backgroundColor: "#f3f4f6",
              borderRadius: 1,
              fontSize: "0.75rem",
              fontFamily: "monospace",
              maxHeight: 200,
              overflow: "auto",
            }}
          >
            <pre>{JSON.stringify(config, null, 2)}</pre>
          </Box>
        )}

        {/* Full Live Preview with Effects */}
        <Box
          sx={{
            mt: 3,
            height: 150,
            borderRadius: 2,
            background: gradient,
            border: "2px solid #e5e7eb",
            mb: 2,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {effectType === "rain" && config.showRain && (
            <Rain
              speed={config.rainSpeed}
              wind={2}
              density={config.rainDensity}
              rainColor={config.rainColor}
              rainOpacity={config.rainOpacity}
            />
          )}

          {effectType === "snow" && config.showRain && (
            <Snow
              speed={config.rainSpeed}
              wind={2}
              density={config.rainDensity}
              snowColor={config.rainColor}
              snowOpacity={config.rainOpacity}
            />
          )}

          {config.showLightning && (
            <Lightning
              color="#ffffff"
              intensity={config.lightningIntensity}
              strikeFrequencyMs={config.lightningFrequencyMs}
              doubleStrikeChance={0.3}
            />
          )}
        </Box>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          Live preview above
        </Typography>
      </CardContent>
    </Card>
  );
}
