import { BarChart } from "@mui/x-charts";

export const SecondBar = ({ height, width }) => {
  return (
    <BarChart
      series={[{ data: [1, 2, 3, 2, 1] }]}
      xAxis={[{ scaleType: "band", data: ["A", "B", "C", "D", "E"] }]}
      height={height}
      width={width}
      leftAxis={null}
    />
  );
};
