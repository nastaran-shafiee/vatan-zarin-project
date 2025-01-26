"use client";
import { Grid, Typography, useTheme, Button, Stack } from "@mui/material";
import { FC } from "react";
import icon2 from "#/public/images/i2.png";
import Image from "next/image";
import { AcademyIcon } from "../AcademyIcon";

type PropsType = {
  text?: string;
  changeTheme: () => void;
  themeIcon: string;
};

const Header: FC<PropsType> = ({ text, changeTheme, themeIcon }) => {
  const theme = useTheme();

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: theme.palette.background.paper,
        width: "100%",
        ...(theme.direction === "rtl" ? { p: 1.8, pr: 0 } : { p: 1.8, pl: 0 }),
      }}
    >
      <Grid display="flex" alignItems="center">
        <Grid
          sx={[
            theme.direction === "rtl" ? { mr: 2, ml: 1.5 } : { ml: 2, mr: 1.5 },
          ]}
        >
          <Image width={35} height={35} src={icon2} alt="course" />
        </Grid>
        <Typography variant="h6">{text}</Typography>
      </Grid>
      <Button onClick={changeTheme} sx={{ p: 0, minWidth: "auto" }}>
        <AcademyIcon
          src={themeIcon === "ok" ? "icon-brightening" : "icon-moon-light"}
          color={theme.palette.grey[700]}
        />
      </Button>
    </Grid>
  );
};
export default Header;
