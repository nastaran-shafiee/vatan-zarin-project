import React from "react";
import { Box, IconButton, Theme, Typography } from "@mui/material";
import { AcademyIcon } from "#/ui/component/common/AcademyIcon";
import { SelectedItem, SelectedItemProps } from "../corses";


const SelectedItemContent: React.FC<SelectedItemProps> = ({
  item,
  setSelectedItems,
  getCurrentTime,
  theme,
  t,
}) => {
  return (
    <Box
      key={item?.contentId}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={1}
      borderRadius="8px"
      bgcolor="background.neutral"
      boxShadow={1}
    >
      <Box display="flex" flexDirection="column">
        <Typography variant="body1" mb={1}>
          {item?.title}
        </Typography>
        <Box display="flex" flexDirection="row" gap={1}>
          <IconButton
          
            sx={{ width: "14px", height: "14px" }}
          >
            <AcademyIcon src="icon-clock---regular" color="text.secondary" />
          </IconButton>
          <Typography color="text.secondary">{getCurrentTime()}</Typography>
          <Typography
            component="span"
            bgcolor={
              item?.contentState === 1
                ? theme.palette.badge.state1
                : theme.palette.badge.state8
            }
            fontSize="11px"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px={1}
            py={0.2}
            borderRadius="12px"
            ml={theme.direction === "rtl" ? "5px" : "0"}
            mr={theme.direction === "rtl" ? "0" : "5px"}
          >
            {item?.contentState === 1 ? t("Approved") : t("Pending_approval")}
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={() =>
          setSelectedItems((prev:SelectedItem[]) =>
            prev.filter((i) => i?.contentId !== item?.contentId)
          )
        }
      >
        <AcademyIcon src="icon-typetrash-can" color={theme.palette.secondary.main} />
      </IconButton>
    </Box>
  );
};



export default SelectedItemContent;
