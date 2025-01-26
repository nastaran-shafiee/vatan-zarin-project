// @mui
import { alpha, useTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
// utils
import { bgBlur } from "#/ui/component/common/chart/cssStyles";
import { useAppSelector } from "#/redux/hooks";

// ----------------------------------------------------------------------

export default function StyledChart() {
  const theme = useTheme();
  const isDarkTheme = useAppSelector((state) => state.settingSlice.darkTheme);

  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        ".apexcharts-canvas": {
          // Tooltip
          ".apexcharts-tooltip": {
            backgroundColor: theme.palette.background.default,
          },
          ".apexcharts-xaxistooltip": {
            ...bgBlur({ color: theme.palette.background.default }),
            border: 0,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[5],
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            "&:before": { borderBottomColor: "transparent" },
            "&:after": {
              borderBottomColor: alpha(theme.palette.background.default, 0.8),
            },
          },
          ".apexcharts-tooltip.apexcharts-theme-light": {
            ...bgBlur({ color: theme.palette.background.default }),
            border: 0,
            background: "red !important",
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[5],
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            ".apexcharts-tooltip-title": {
              border: 0,
              textAlign: "center",
              fontWeight: theme.typography.fontWeightBold,
              backgroundColor: alpha(theme.palette.grey[500], 0.16),
              color:
                theme.palette.text[
                  isDarkTheme !== " " ? "primary" : "secondary"
                ],
            },
          },

          // Legend
          ".apexcharts-legend": {
            padding: 0,
          },
          ".apexcharts-legend-series": {
            display: "flex !important",
            alignItems: "center",
          },
          ".apexcharts-legend-marker": {
            marginRight: 8,
          },
          ".apexcharts-legend-text": {
            lineHeight: "18px",
            textTransform: "capitalize",
          },
        },
      }}
    />
  );

  return inputGlobalStyles;
}
