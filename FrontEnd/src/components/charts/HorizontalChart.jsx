import { BarChart } from "@mui/x-charts/BarChart";
import { dataset } from "./weather";

const chartSetting = {
  xAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  width: 700,
  height: 300,
};

const valueFormatter = (value) => `${value}mm`;

export default function HorizontalGrid() {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[{ dataKey: "seoul" }]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
  );
}
