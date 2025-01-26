import {
  Snackbar,
  SnackbarOrigin,
  Typography,
  Grid,
  useTheme,
} from "@mui/material";
import React from "react";
import { QueryParamsType } from "#/schema/Utils";
import { useTranslations } from "next-intl";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";

interface messagePropsTypes {
  show: boolean;
  onClose: () => void;
  message?: QueryParamsType;
}

const SuccessMessage = ({ show, onClose, message }: messagePropsTypes) => {
  const t = useTranslations();
  const theme = useTheme();
  interface State extends SnackbarOrigin {
    open: boolean;
  }

  const [state] = React.useState<State>({
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
          borderColor: theme.palette.success.main,
          backgroundColor: "#E0F5EC",
          borderRadius: "12px",
          px: 2,
          py: 1.5,
          alignItems: "center",
        }}
      >
        <CheckBoxRoundedIcon
          sx={[
            theme.direction === "rtl" ? { ml: 1 } : { mr: 1 },
            { color: "#48CA93" },
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
export default SuccessMessage;
