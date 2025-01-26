// @mui
import { Box, Card, useTheme } from "@mui/material";
// components
import { useChart } from "#/ui/component/common/chart";
import { lazy, Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";

// ----------------------------------------------------------------------

const ApexChart = lazy(() => import("react-apexcharts"));

export default function SecondaryChart({
  chartLabels,
  chartData,
  height = 180,
  type = "bar",
  width = "100%",
  BarColumnWidth = "55%",
  strokeWidth = "1",
  logarithmic = false,
  yAxis = null,
  ...other
}: any) {
  const theme = useTheme();
  const chartOptions = useChart({
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: BarColumnWidth,
        endingShape: "rounded",
      },
    },
    legend: { show: false },
    fill: { type: chartData.map((i: any) => i.fill) },
    labels: chartLabels,
    stroke: {
      // show: true,
      width: strokeWidth,
      curve: "straight",
      // colors: ['transparent'],
    },
    yaxis: yAxis || [
      {
        logarithmic,
        labels: {
          // ...(theme.direction === 'rtl' && { offsetX: -45 }),
          // minWidth: 90,
          align: "center",
          formatter: function (val: number) {
            if (typeof val !== "undefined") {
              return `${ReduceDecimal(val)}`;
            }
            return val;
          },
        },
      },
      // {
      //   opposite: true,
      //   logarithmic,
      //   labels: {
      //     align: 'center',
      //     formatter: function (val: number) {
      //       if (typeof val !== 'undefined') {
      //         return `${ReduceDecimal(val)}`;
      //       }
      //       return val;
      //     },
      //   },
      // },
    ],
    xaxis: {
      labels: {
        ...(theme.direction === "rtl" && {
          rotate: 45,
        }),
      },
    },

    // tooltip: {
    //   shared: true,
    //   intersect: false,
    //   y: {
    //     formatter: (y: number) => {
    //       if (typeof y !== 'undefined') {
    //         return `${y}`;
    //       }
    //       return y;
    //     },
    //   },
    // },
  });

  return (
    <Card
      {...other}
      sx={{ background: "rgba(0,0,0,0)", boxShadow: "none", width, height }}
    >
      <Box sx={{ height }}>
        <Suspense fallback={<CircularProgress />}>
          <ApexChart
            type={type}
            series={chartData}
            options={chartOptions}
            height={height}
            width={width}
          />
        </Suspense>
      </Box>
    </Card>
  );
}

export const ReduceDecimal = (value: number) => {
  if (value > 1000000000) {
    return (value / 1000000).toFixed(3) + "B";
  }
  if (value > 1000000) {
    return (value / 1000000).toFixed(2) + "M";
  }
  if (value > 1000) {
    return (value / 1000).toFixed(0) + "K";
  }
  return value.toFixed(0);
};
