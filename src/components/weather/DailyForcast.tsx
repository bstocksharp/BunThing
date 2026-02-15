import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import type { DailyForecast } from "@/hooks/useWeather";

type Props = {
  daily: DailyForecast[];
};

export function DailyForecast({ daily }: Props) {
  return (
    <Card
      sx={{
        maxWidth: 500,
        mx: "auto",
        borderRadius: 4,
        boxShadow: 3,
        width: "100%",
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "bold" }}>
          7-Day Forecast
        </Typography>
        <List dense>
          {daily.map((day) => (
            <ListItem key={day.date} sx={{ px: 0 }}>
              <ListItemText
                primary={day.dayOfWeek}
                secondary={day.description}
                sx={{ flex: 1 }}
              />
              <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                {Math.round(day.tempMax)}°
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 2, minWidth: 30, textAlign: "right" }}
              >
                {Math.round(day.tempMin)}°
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
