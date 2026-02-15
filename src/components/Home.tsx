import { Box, CircularProgress, Alert } from "@mui/material";
import { useWeather } from "@/hooks/useWeather";
import { WeatherDisplay } from "./weather/WeatherDisplay";
import Rain from "./weather/Rain";
import Snow from "./weather/Snow";
import Lightning from "./weather/Lightning";
import {
  getBackgroundGradient,
  getEffectType,
  getWeatherConfig,
} from "./weather/WeatherConfig";
import { WeatherDebugger } from "./weather/WeatherDebug";

export function Home() {
  const { data, loading, error } = useWeather();

  if (loading)
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  if (!data) return <Alert severity="warning">No weather data</Alert>;

  const weatherCode = data.current_weather.weathercode;
  const windspeed = data.current_weather.windspeed;
  const hour = new Date().getHours();

  // Get config based on weather code
  const effectType = getEffectType(weatherCode);
  const weatherConfig = getWeatherConfig(weatherCode);
  const backgroundGradient = getBackgroundGradient(hour, weatherCode);

  return (
    <>
      <WeatherDebugger />
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: -1, // Behind everything
          background: backgroundGradient,
          transition: "background 2s ease-in-out",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          flex: 1,
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          pt: 4,
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
          {effectType === "rain" && weatherConfig.showRain && (
            <Rain
              speed={weatherConfig.rainSpeed}
              wind={Math.min(windspeed / 10, 5)}
              density={weatherConfig.rainDensity}
              rainColor={weatherConfig.rainColor}
              rainOpacity={weatherConfig.rainOpacity}
            />
          )}

          {effectType === "snow" && weatherConfig.showRain && (
            <Snow
              speed={weatherConfig.rainSpeed}
              wind={Math.min(windspeed / 10, 3)}
              density={weatherConfig.rainDensity}
              snowColor={weatherConfig.rainColor}
              snowOpacity={weatherConfig.rainOpacity}
            />
          )}

          {weatherConfig.showLightning && (
            <Lightning
              color="#ffffff"
              intensity={weatherConfig.lightningIntensity}
              strikeFrequencyMs={weatherConfig.lightningFrequencyMs}
              doubleStrikeChance={0.3}
            />
          )}
        </Box>

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: 600,
            px: 3,
          }}
        >
          <WeatherDisplay data={data} showCurrent={true} showForecast={true} />
        </Box>
      </Box>
    </>
  );
}
