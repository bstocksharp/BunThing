import {
  Card,
  CardContent,
  Typography,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";
import { useWeather, type WeatherData } from "@/hooks/useWeather";
import { HourlyForecast } from "./HourlyForcast";
import { DailyForecast } from "./DailyForcast";

type Props = {
  data?: WeatherData;
  showCurrent?: boolean;
  showHourly?: boolean;
  showForecast?: boolean;
};

export function WeatherDisplay({
  data: passedData,
  showCurrent = true,
  showHourly = true,
  showForecast = true,
}: Props) {
  // Skip fetching if data was passed in from parent
  const {
    data: fetchedData,
    loading,
    error,
  } = useWeather({
    skip: !!passedData,
  });

  const data = passedData || fetchedData;

  if (loading && !data)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error && !data) return <Alert severity="error">{error}</Alert>;

  if (!data) return <Alert severity="warning">No weather data</Alert>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Current Weather */}
      {showCurrent && (
        <Card
          sx={{
            maxWidth: 500,
            mx: "auto",
            borderRadius: 4,
            boxShadow: 3,
            justifyContent: "center",
            textAlign: "center",
            padding: 3,
          }}
        >
          <CardContent>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
              {Math.round(data.current_weather.temperature)}°F
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              Wind: {Math.round(data.current_weather.windspeed)} mph
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.current_weather.description}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Hourly Forecast */}
      {showHourly && data.hourly.length > 0 && (
        <HourlyForecast hourly={data.hourly} />
      )}

      {/* 7-Day Forecast */}
      {showForecast && data.daily.length > 0 && (
        <DailyForecast daily={data.daily} />
      )}
    </Box>
  );
}
