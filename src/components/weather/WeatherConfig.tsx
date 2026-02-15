export type WeatherEffectConfig = {
  rainSpeed: number;
  rainDensity: number;
  rainOpacity: number;
  lightningIntensity: number;
  lightningFrequencyMs: [number, number];
  rainColor: string;
  showRain: boolean;
  showLightning: boolean;
};

export type TimeOfDayGradient = {
  background: string;
};

// Map weather codes to effect configs
export const WEATHER_CODE_CONFIG = {
  // Clear & Mostly Clear
  0: {
    rainSpeed: 0,
    rainDensity: 0,
    rainOpacity: 0,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#ffffff",
    showRain: false,
    showLightning: false,
  },
  1: {
    rainSpeed: 0,
    rainDensity: 0,
    rainOpacity: 0,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#ffffff",
    showRain: false,
    showLightning: false,
  },
  // Partly cloudy & Overcast
  2: {
    rainSpeed: 0,
    rainDensity: 0,
    rainOpacity: 0,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#ffffff",
    showRain: false,
    showLightning: false,
  },
  3: {
    rainSpeed: 0,
    rainDensity: 0,
    rainOpacity: 0,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#ffffff",
    showRain: false,
    showLightning: false,
  },
  // Fog
  45: {
    rainSpeed: 0,
    rainDensity: 0,
    rainOpacity: 0,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#ffffff",
    showRain: false,
    showLightning: false,
  },
  48: {
    rainSpeed: 0,
    rainDensity: 0,
    rainOpacity: 0,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#ffffff",
    showRain: false,
    showLightning: false,
  },
  // Drizzle (light)
  51: {
    rainSpeed: 0.5,
    rainDensity: 0.8,
    rainOpacity: 0.4,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#a5b4fc",
    showRain: true,
    showLightning: false,
  },
  53: {
    rainSpeed: 0.5,
    rainDensity: 0.8,
    rainOpacity: 0.4,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#a5b4fc",
    showRain: true,
    showLightning: false,
  },
  55: {
    rainSpeed: 0.5,
    rainDensity: 0.8,
    rainOpacity: 0.4,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#a5b4fc",
    showRain: true,
    showLightning: false,
  },
  // Freezing drizzle
  56: {
    rainSpeed: 0.6,
    rainDensity: 0.9,
    rainOpacity: 0.45,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#c7d2fe",
    showRain: true,
    showLightning: false,
  },
  57: {
    rainSpeed: 0.6,
    rainDensity: 0.9,
    rainOpacity: 0.45,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#c7d2fe",
    showRain: true,
    showLightning: false,
  },
  // Rain (light to moderate)
  61: {
    rainSpeed: 1,
    rainDensity: 1.2,
    rainOpacity: 0.6,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#a5b4fc",
    showRain: true,
    showLightning: false,
  },
  63: {
    rainSpeed: 1.2,
    rainDensity: 1.4,
    rainOpacity: 0.65,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#818cf8",
    showRain: true,
    showLightning: false,
  },
  // Rain (heavy)
  65: {
    rainSpeed: 1.5,
    rainDensity: 2,
    rainOpacity: 0.8,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#6366f1",
    showRain: true,
    showLightning: false,
  },
  // Freezing rain
  66: {
    rainSpeed: 1.2,
    rainDensity: 1.5,
    rainOpacity: 0.7,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#c7d2fe",
    showRain: true,
    showLightning: false,
  },
  67: {
    rainSpeed: 1.5,
    rainDensity: 2,
    rainOpacity: 0.8,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#c7d2fe",
    showRain: true,
    showLightning: false,
  },
  // Snow (light to moderate)
  71: {
    rainSpeed: 0.8,
    rainDensity: 1.5,
    rainOpacity: 0.6,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#e0e7ff",
    showRain: true,
    showLightning: false,
  },
  73: {
    rainSpeed: 1,
    rainDensity: 1.8,
    rainOpacity: 0.7,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#e0e7ff",
    showRain: true,
    showLightning: false,
  },
  // Snow (heavy)
  75: {
    rainSpeed: 1.3,
    rainDensity: 2.5,
    rainOpacity: 0.85,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#e0e7ff",
    showRain: true,
    showLightning: false,
  },
  // Snow grains
  77: {
    rainSpeed: 1.1,
    rainDensity: 2,
    rainOpacity: 0.75,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#e0e7ff",
    showRain: true,
    showLightning: false,
  },
  // Rain showers
  80: {
    rainSpeed: 1.2,
    rainDensity: 1.5,
    rainOpacity: 0.7,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#a5b4fc",
    showRain: true,
    showLightning: false,
  },
  81: {
    rainSpeed: 1.4,
    rainDensity: 1.8,
    rainOpacity: 0.75,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#818cf8",
    showRain: true,
    showLightning: false,
  },
  // Rain showers (violent)
  82: {
    rainSpeed: 1.8,
    rainDensity: 2.5,
    rainOpacity: 0.85,
    lightningIntensity: 0.3,
    lightningFrequencyMs: [3000, 8000] as [number, number],
    rainColor: "#6366f1",
    showRain: true,
    showLightning: false,
  },
  // Snow showers
  85: {
    rainSpeed: 1.2,
    rainDensity: 2,
    rainOpacity: 0.75,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#e0e7ff",
    showRain: true,
    showLightning: false,
  },
  86: {
    rainSpeed: 1.5,
    rainDensity: 2.5,
    rainOpacity: 0.85,
    lightningIntensity: 0,
    lightningFrequencyMs: [5000, 10000] as [number, number],
    rainColor: "#e0e7ff",
    showRain: true,
    showLightning: false,
  },
  // Thunderstorm (slight to moderate)
  95: {
    rainSpeed: 2,
    rainDensity: 3,
    rainOpacity: 0.9,
    lightningIntensity: 0.85,
    lightningFrequencyMs: [2000, 7000] as [number, number],
    rainColor: "#7c3aed",
    showRain: true,
    showLightning: true,
  },
  // Thunderstorm with hail
  96: {
    rainSpeed: 2.2,
    rainDensity: 3.2,
    rainOpacity: 0.92,
    lightningIntensity: 0.9,
    lightningFrequencyMs: [1800, 6000] as [number, number],
    rainColor: "#6d28d9",
    showRain: true,
    showLightning: true,
  },
  // Thunderstorm with hail (heavy)
  99: {
    rainSpeed: 2.5,
    rainDensity: 3.5,
    rainOpacity: 0.95,
    lightningIntensity: 0.95,
    lightningFrequencyMs: [1500, 5000] as [number, number],
    rainColor: "#5b21b6",
    showRain: true,
    showLightning: true,
  },
} as const satisfies Record<number, WeatherEffectConfig>;

// Weather category helper
function getWeatherCategory(code: number): string {
  if (code === 0 || code === 1) return "clear";
  if (code === 2 || code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain_showers";
  if (code >= 85 && code <= 86) return "snow_showers";
  if (code >= 95 && code <= 99) return "thunderstorm";
  return "clear";
}

// Time periods
function getTimePeriod(hour: number): string {
  if (hour >= 5 && hour < 9) return "morning";
  if (hour >= 9 && hour < 12) return "late_morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 19) return "sunset";
  if (hour >= 19 && hour < 21) return "dusk";
  return "night";
}

export const TIME_OF_DAY_GRADIENT = {
  // Clear skies
  clear_morning: {
    background:
      "linear-gradient(180deg, #fcd34d 0%, #fbbf24 50%, #87ceeb 100%)",
  },
  clear_late_morning: {
    background: "linear-gradient(180deg, #87ceeb 0%, #e0f6ff 100%)",
  },
  clear_afternoon: {
    background: "linear-gradient(180deg, #87ceeb 0%, #e0f6ff 100%)",
  },
  clear_sunset: {
    background:
      "linear-gradient(180deg, #fed7aa 0%, #fb923c 50%, #7c2d12 100%)",
  },
  clear_dusk: {
    background: "linear-gradient(180deg, #5b21b6 0%, #1e1b4b 100%)",
  },
  clear_night: {
    background: "linear-gradient(180deg, #1a1a3e 0%, #000000 100%)",
  },

  // Cloudy
  cloudy_morning: {
    background:
      "linear-gradient(180deg, #d1d5db 0%, #9ca3af 50%, #6b7280 100%)",
  },
  cloudy_late_morning: {
    background: "linear-gradient(180deg, #d1d5db 0%, #9ca3af 100%)",
  },
  cloudy_afternoon: {
    background: "linear-gradient(180deg, #d1d5db 0%, #9ca3af 100%)",
  },
  cloudy_sunset: {
    background:
      "linear-gradient(180deg, #a21caf 0%, #6b21a8 50%, #3f0f63 100%)",
  },
  cloudy_dusk: {
    background: "linear-gradient(180deg, #4c1d95 0%, #1e1b4b 100%)",
  },
  cloudy_night: {
    background: "linear-gradient(180deg, #1f2937 0%, #111827 100%)",
  },

  // Fog
  fog_morning: {
    background:
      "linear-gradient(180deg, #e5e7eb 0%, #d1d5db 50%, #9ca3af 100%)",
  },
  fog_late_morning: {
    background: "linear-gradient(180deg, #e5e7eb 0%, #d1d5db 100%)",
  },
  fog_afternoon: {
    background: "linear-gradient(180deg, #e5e7eb 0%, #d1d5db 100%)",
  },
  fog_sunset: {
    background:
      "linear-gradient(180deg, #b78728 0%, #78350f 50%, #451a03 100%)",
  },
  fog_dusk: {
    background: "linear-gradient(180deg, #3f0f63 0%, #1a0033 100%)",
  },
  fog_night: {
    background: "linear-gradient(180deg, #2d3748 0%, #1a202c 100%)",
  },

  // Drizzle/Light rain
  drizzle_morning: {
    background:
      "linear-gradient(180deg, #bfdbfe 0%, #93c5fd 50%, #60a5fa 100%)",
  },
  drizzle_late_morning: {
    background: "linear-gradient(180deg, #bfdbfe 0%, #93c5fd 100%)",
  },
  drizzle_afternoon: {
    background: "linear-gradient(180deg, #bfdbfe 0%, #93c5fd 100%)",
  },
  drizzle_sunset: {
    background:
      "linear-gradient(180deg, #7c3aed 0%, #5b21b6 50%, #3f0f63 100%)",
  },
  drizzle_dusk: {
    background: "linear-gradient(180deg, #4c1d95 0%, #1e1b4b 100%)",
  },
  drizzle_night: {
    background: "linear-gradient(180deg, #2e3a4a 0%, #1a1f2e 100%)",
  },

  // Rain
  rain_morning: {
    background:
      "linear-gradient(180deg, #7dd3c0 0%, #5a8a7a 50%, #1e3a3a 100%)",
  },
  rain_late_morning: {
    background: "linear-gradient(180deg, #94a3b8 0%, #64748b 100%)",
  },
  rain_afternoon: {
    background: "linear-gradient(180deg, #94a3b8 0%, #64748b 100%)",
  },
  rain_sunset: {
    background:
      "linear-gradient(180deg, #6d28d9 0%, #4c1d95 50%, #2e1065 100%)",
  },
  rain_dusk: {
    background: "linear-gradient(180deg, #3f0f63 0%, #1a0033 100%)",
  },
  rain_night: {
    background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
  },

  // Snow
  snow_morning: {
    background:
      "linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)",
  },
  snow_late_morning: {
    background: "linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)",
  },
  snow_afternoon: {
    background: "linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)",
  },
  snow_sunset: {
    background:
      "linear-gradient(180deg, #c084fc 0%, #a855f7 50%, #7e22ce 100%)",
  },
  snow_dusk: {
    background: "linear-gradient(180deg, #6b21a8 0%, #3f0f63 100%)",
  },
  snow_night: {
    background: "linear-gradient(180deg, #37474f 0%, #263238 100%)",
  },

  // Thunderstorm
  thunderstorm_morning: {
    background:
      "linear-gradient(180deg, #4c1d95 0%, #1e1b4b 50%, #0f0a1f 100%)",
  },
  thunderstorm_late_morning: {
    background: "linear-gradient(180deg, #4c1d95 0%, #2e1065 100%)",
  },
  thunderstorm_afternoon: {
    background: "linear-gradient(180deg, #4c1d95 0%, #2e1065 100%)",
  },
  thunderstorm_sunset: {
    background:
      "linear-gradient(180deg, #5b21b6 0%, #3f0f63 50%, #1a0033 100%)",
  },
  thunderstorm_dusk: {
    background: "linear-gradient(180deg, #2e1065 0%, #0f0a1f 100%)",
  },
  thunderstorm_night: {
    background: "linear-gradient(180deg, #1e1b4b 0%, #0f0a1f 100%)",
  },
} as const satisfies Record<string, TimeOfDayGradient>;

export function getWeatherConfig(weatherCode: number): WeatherEffectConfig {
  return (
    WEATHER_CODE_CONFIG[weatherCode as keyof typeof WEATHER_CODE_CONFIG] ||
    WEATHER_CODE_CONFIG[0]
  );
}

export function getBackgroundGradient(
  hour: number,
  weatherCode: number,
): string {
  const category = getWeatherCategory(weatherCode);
  const period = getTimePeriod(hour);
  const key = `${category}_${period}` as keyof typeof TIME_OF_DAY_GRADIENT;

  return (
    TIME_OF_DAY_GRADIENT[key]?.background ||
    TIME_OF_DAY_GRADIENT.clear_night.background
  );
}

export function getEffectType(weatherCode: number): "rain" | "snow" | "none" {
  // Snow codes
  if (weatherCode >= 71 && weatherCode <= 77) return "snow";
  if (weatherCode >= 85 && weatherCode <= 86) return "snow";

  // Rain/Drizzle codes
  if (weatherCode >= 51 && weatherCode <= 67) return "rain";
  if (weatherCode >= 80 && weatherCode <= 82) return "rain";
  if (weatherCode >= 95 && weatherCode <= 99) return "rain";

  return "none";
}
