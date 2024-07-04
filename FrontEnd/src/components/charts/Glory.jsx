import { Gauge } from "@mui/x-charts/Gauge";

export default function BasicGauges() {
  return (
    <Gauge
      width={200}
      height={200}
      value={60}
      startAngle={0}
      endAngle={360}
      valueMin={0}
      valueMax={1000}
      cornerRadius="50%"
    />
  );
}
