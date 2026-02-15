import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export type CurrentWeather = {
  temperature: number;
  windspeed: number;
  weathercode: number;
  description: string;
};

export type DailyForecast = {
  date: string;
  dayOfWeek: string;
  tempMax: number;
  tempMin: number;
  weathercode: number;
  description: string;
  precipitation: number;
  windspeedMax: number;
  uvIndex: number;
};

export type HourlyForecast = {
  time: string;
  hour: number;
  temperature: number;
  weathercode: number;
  description: string;
  precipitation: number;
};

export type WeatherData = {
  current_weather: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
};

function getWeatherDescription(code: number): string {
  // Clear & Sunny
  if (code === 0) return "☀️ Clear sky";
  if (code === 1) return "🌤️ Mostly clear";
  if (code === 2) return "⛅ Partly cloudy";
  if (code === 3) return "☁️ Overcast";

  // Fog
  if (code === 45 || code === 48) return "🌫️ Foggy";

  // Drizzle
  if (code === 51 || code === 53 || code === 55) return "🌧️ Light drizzle";
  if (code === 56 || code === 57) return "🌧️ Freezing drizzle";

  // Rain
  if (code === 61 || code === 63) return "🌧️ Light rain";
  if (code === 65) return "🌧️ Heavy rain";
  if (code === 66 || code === 67) return "🌧️ Freezing rain";

  // Snow
  if (code === 71 || code === 73) return "❄️ Light snow";
  if (code === 75) return "❄️ Heavy snow";
  if (code === 77) return "❄️ Snow grains";

  // Rain showers
  if (code === 80 || code === 81) return "🌧️ Rain showers";
  if (code === 82) return "⛈️ Heavy rain showers";

  // Snow showers
  if (code === 85 || code === 86) return "❄️ Snow showers";

  // Thunderstorm
  if (code === 95 || code === 96) return "⚡ Thunderstorm";
  if (code === 99) return "⚡ Thunderstorm with hail";

  return "Unknown";
}

type UseWeatherOptions = {
  skip?: boolean;
};

export function useWeather(options?: UseWeatherOptions) {
  const { token } = useAuth();
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const shouldSkip = options?.skip ?? false;

  useEffect(() => {
    if (!token || shouldSkip) {
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/weather", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch weather");

        const raw = await response.json();

        const current = raw.current_weather;
        const daily = raw.daily;
        const hourly = raw.hourly;

        const transformed: WeatherData = {
          current_weather: {
            temperature: current.temperature,
            windspeed: current.windspeed,
            weathercode: current.weathercode,
            description: getWeatherDescription(current.weathercode),
          },
          daily: daily.time.map((dateStr: string, i: number) => ({
            date: dateStr,
            dayOfWeek: new Date(dateStr + "T00:00").toLocaleDateString(
              "en-US",
              { weekday: "short" },
            ),
            tempMax: daily.temperature_2m_max[i],
            tempMin: daily.temperature_2m_min[i],
            weathercode: daily.weathercode?.[i] || 0,
            description: getWeatherDescription(daily.weathercode?.[i] || 0),
            precipitation: daily.precipitation_sum?.[i] || 0,
            windspeedMax: daily.windspeed_10m_max?.[i] || 0,
            uvIndex: daily.uv_index_max?.[i] || 0,
          })),
          hourly: hourly.time.map((timeStr: string, i: number) => ({
            time: timeStr,
            hour: new Date(timeStr).getHours(),
            temperature: hourly.temperature_2m[i],
            weathercode: hourly.weathercode?.[i] || 0,
            description: getWeatherDescription(hourly.weathercode?.[i] || 0),
            precipitation: hourly.precipitation?.[i] || 0,
          })),
        };

        setData(transformed);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [token, shouldSkip]);

  return { data, loading, error };
}
