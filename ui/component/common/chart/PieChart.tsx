// @mui
import { Box, Card, useTheme } from "@mui/material";
// components
import { useChart } from "#/ui/component/common/chart";
import { intToMoney } from "#/helper";
import { lazy, Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";

// ----------------------------------------------------------------------

// PrimaryChart.propTypes = {
//     title: PropTypes.string,
//     subheader: PropTypes.string,
//     chartData: PropTypes.array.isRequired,
//     chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

const ApexChart = lazy(() => import("react-apexcharts"));

export default function PieChart({ chartLabels, chartData, ...other }: any) {
  const theme = useTheme();
  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    // colors,
    type: "donut",
    labels: chartLabels,
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      position: "right",
      horizontalAlign: "center",
    },

    // dataLabels: {
    //   enabled: true,
    //   dropShadow: {
    //     enabled: false,
    //   },
    // },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value: number) => " " + intToMoney(value) + " ",
        title: {
          formatter: (seriesName: string) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
  });

  return (
    <Card
      {...other}
      sx={{ background: "rgba(0,0,0,0)", boxShadow: "none", width: "100%" }}
    >
      <Box sx={{ py: 2, width: "100%" }} display="flex" justifyContent="center">
        <Suspense fallback={<CircularProgress />}>
          <ApexChart
            type="donut"
            series={chartData}
            options={chartOptions}
            height={105}
            width="100%"
          />
        </Suspense>
      </Box>
    </Card>
  );
}
