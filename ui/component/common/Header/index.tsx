"use client";
import { Grid, Typography, useTheme, Button } from "@mui/material";
import { FC, ReactNode } from "react";
import defaultIcon from "#/public/images/i2.png"; // Default image
import Image from "next/image";
import { useRouter } from "next/navigation"; // For navigation

type PropsType = {
  text?: string;
  changeTheme: () => void;
  themeIcon: string;
  isTheme?: boolean;
  customNode?: ReactNode; // Allow icon or image via ReactNode
  onImageClick?: () => void; // Handle click on the customNode or image
};

const Header: FC<PropsType> = ({
  text,
  changeTheme,
  themeIcon,
  isTheme,
  customNode,
  onImageClick,
}) => {
  const theme = useTheme();
  const router = useRouter();

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
        {/* Custom Icon/Image or Default */}
        <Grid
          onClick={onImageClick}
          sx={{
            alignSelf:"end" ,
            cursor: onImageClick ? "pointer" : "default",
            ...(theme.direction === "rtl" ? { mr: 2, ml: 1.5 } : { ml: 2, mr: 1.5 }),
          }}
        >
          {customNode ? (
            customNode // Render custom icon/image
          ) : (
            <Image
              width={35}
              height={35}
              src={defaultIcon} // Default image
              alt="icon"
            />
          )}
        </Grid>

        {/* Header Title */}
        <Typography variant="h6">{text}</Typography>
      </Grid>

      {/* Theme Toggle Button */}
      {isTheme && (
        <Button onClick={changeTheme} sx={{ p: 0, minWidth: "auto" }}>
          <Typography
            sx={{
              color: theme.palette.grey[700],
            }}
          >
            {themeIcon === "ok" ? "🌞" : "🌙"}
          </Typography>
        </Button>
      )}
    </Grid>
  );
};

export default Header;

