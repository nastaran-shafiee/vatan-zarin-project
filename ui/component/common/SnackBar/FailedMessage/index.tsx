import {
  Grid,
  Snackbar,
  SnackbarOrigin,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { QueryParamsType } from "#/schema/Utils";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";

interface messagePropsTypes {
  show: boolean;
  onClose: () => void; // This defines the onClose callback function type
  message?: QueryParamsType;
}

const FailedMessage = ({ show, onClose, message }: messagePropsTypes) => {
  const t = useTranslations();
  const theme = useTheme();

  interface State extends SnackbarOrigin {
    open: boolean;
  }

  const [state] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={show}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Grid
        container
        sx={{
          border: "1px solid",
          borderColor: theme.palette.error.main,
          backgroundColor: "#FFE6E4",
          borderRadius: "12px",
          px: 2,
          py: 1.5,
          alignItems: "center",
        }}
      >
        <DisabledByDefaultRoundedIcon
          sx={[
            theme.direction === "rtl" ? { ml: 1 } : { mr: 1 },
            { color: "#E88B76" },
          ]}
        />
        <Typography variant="body2" color={"#31313D"}>
          {" "}
          {t(message)}
        </Typography>
      </Grid>
    </Snackbar>
  );
};
export default FailedMessage;
