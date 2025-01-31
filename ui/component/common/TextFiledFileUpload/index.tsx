import {
  Grid,
  IconButton,
  Stack,
  useTheme,
  Box,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useState, SetStateAction, Dispatch, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import fileUploaderSrc from "#/public/images/fileuploader.svg";
import { useTranslations } from "next-intl";
import { AcademyIcon } from "#/ui/component/common/AcademyIcon";
import { PreviewModal } from "#/ui/component/common/TextFiledFileUpload/PreviewModal";
import { useUploadFileMutation } from "#/redux/services/UploadApi";
import { setAlert, setError, setMessage } from "#/redux/features/snackBarHandlerSlice";
import { useAppDispatch } from "#/redux/hooks";

type fileUploadPropsType = {
  setFileGuId?: Dispatch<SetStateAction<string[] | any>>;
  label?: string;
  resetInput?: boolean;
  previewValue?: string;
  multiple?: boolean;
  title?: string;
  isRequired?: boolean;
  setId?: Dispatch<SetStateAction<string[] | any>>;
  allowedFormat?: string;
  accept?: string;
  previewModalValue?: string | string[];
  onRemove?: () => void;
  sizeFile?: number;
  iconColor?: string;
};

const TextFiledFileUpload = ({
  isRequired = false,
  setFileGuId,
  label,
  resetInput,
  previewValue,
  multiple,
  title,
  setId,
  allowedFormat,
  accept,
  onRemove,
  previewModalValue,
  sizeFile = 100 * 1024 * 1024, // 100MB as default size
  iconColor,
}: fileUploadPropsType) => {
  const [preview, setPreview] = useState<string | undefined>(previewValue);
  const [uploadFile, { data, reset }] = useUploadFileMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState("");
  const t = useTranslations();
  const theme = useTheme();
  const [pending, setPending] = useState(false);
  const dispatch = useAppDispatch();

  const restFile = () => {
    reset();
    setPreview("");
    setFileGuId?.([]);
    setId?.([]);
  };

  useEffect(() => {
    if (resetInput) restFile();
  }, [resetInput]);

  useEffect(() => {
    setPreview(previewValue);
  }, [previewValue]);

  const fileUploader = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      dispatch(setAlert(true));
      dispatch(setError(true));
      dispatch(setMessage(t("F_EntekhabElzami"))); // Show required selection message
      return;
    }
  
    const _files = Array.from(event.target.files);
  
    // Check file size
    const oversizedFiles = _files.filter((file) => file.size > sizeFile);
    if (oversizedFiles.length > 0) {
      const fileSizeInKB = oversizedFiles[0].size / 1024; // Convert to KB
      const fileSizeInMB = fileSizeInKB / 1024; // Convert to MB
  
      // Dynamically create the size message
      const sizeMessage =
        fileSizeInMB >= 1 ? `${fileSizeInMB.toFixed(2)} MB` : `${fileSizeInKB.toFixed(2)} KB`;
  
      dispatch(setAlert(true));
      dispatch(setError(true));
      dispatch(setMessage(t("limit_exceeded", { size: sizeMessage }))); // Show size error message
      return;
    }
  
    setPending(true);
  
    if (
      (accept && accept.includes(event?.target?.files[0].type.split("/").slice(0, 2)[1])) ||
      accept === undefined
    ) {
      uploadFile({ files: _files })
        .unwrap()
        .then((response: any) => {
          setPreview(`https://file.pmlm.ir/${response.result.url}`);
          setFileGuId?.(multiple ? response?.result : response.result.id);
          setFileSize(response.result.fileSizeText);
          setId?.(response.result.id);
          setPending(false);
        })
        .catch((error: any) => {
          setPending(false);
          console.log(error);
        });
    } else {
      setPending(false);
      dispatch(setAlert(true));
      dispatch(setError(true));
      dispatch(setMessage(t("Allowed_format"))); // Show format error message
    }
  };
  

  return (
    <Grid item xs={12} sx={{ p: 1, width: "100%" }}>
      <Typography
        component={"span"}
        variant={"subtitle2"}
        color={"text.primary"}
        fontWeight={"fontWeightMedium"}
        sx={[
          {
            pb: 1,
            display: "block",
            width: "fit-content",
          },
          isRequired && {
            position: "relative",
            "&::before": {
              content: '"*"',
              position: "absolute",
              top: "-2px",
              left: "-12px",
              color: "error.main",
            },
          },
        ]}
      >
        {title}
      </Typography>

      {preview ? (
        <Stack
          sx={{
            bgcolor: "background.paper",
            p: 1,
            borderRadius: "5px",
            border: `1px solid ${theme.palette.divider}`,
            alignItems: "center",
            maxWidth: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack sx={{ whiteSpace: "pre-wrap", flexDirection: "row", gap: 1 }}>
            <Image
              src={(preview && preview) || ""}
              alt={data?.result?.fileName || ""}
              width={72}
              height={72}
            />

            <Stack gap={1}>
              <Typography variant={"caption"} color={theme.palette.grey[700]}>
                {data?.result?.fileName}
              </Typography>
              <Typography variant={"caption"} color={theme.palette.grey[700]}>
                {fileSize}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            flexDirection={"row"}
            sx={theme.direction === "rtl" ? { mr: "auto" } : { ml: "auto" }}
          >
            <IconButton onClick={() => setOpen(!open)}>
              <AcademyIcon
                src={"icon-typeeye-solid"}
                color={iconColor || theme.palette.text.primary}
              />
            </IconButton>

            <IconButton
              onClick={() => {
                reset();
                setPreview("");
                onRemove?.();
              }}
            >
              <AcademyIcon
                src={"icon-typetrash-can"}
                color={iconColor || theme.palette.text.primary}
              />
            </IconButton>
            <PreviewModal
              open={open}
              handleOpen={() => setOpen(!open)}
              previewUrl={previewModalValue}
              preview={preview}
            />
          </Stack>
        </Stack>
      ) : (
        <Stack
          sx={{
            bgcolor: "background.paper",
            p: 1,
            borderRadius: "5px",
            border: `1px dashed ${theme.palette.primary.main}`,
            alignItems: "center",
            width: "100%",
            display: "flex",
          }}
        >
          <Stack
            justifyContent={"start"}
            alignItems={"center"}
            flexDirection={"row"}
            width={"100%"}
          >
            <IconButton component="label">
              <Stack
                gap={1}
                justifyContent={"start"}
                alignItems={"center"}
                flexDirection={"row"}
              >
                <Image
                  src={fileUploaderSrc}
                  alt={"fileUploader"}
                  width={42}
                  height={42}
                />
                <input
                  style={{ display: "none" }}
                  type="file"
                  hidden
                  multiple={multiple}
                  onChange={fileUploader}
                  accept={accept}
                />
              </Stack>
            </IconButton>
            <Stack
              gap={1}
              alignItems={"start"}
              justifyContent={"center"}
              mr={1}
            >
              <Typography
                variant={"subtitle2"}
                color={"text.primary"}
                fontWeight={"fontWeightMedium"}
              >
                {label}
              </Typography>
              <Typography variant={"caption"} color={theme.palette.grey[700]}>
                {allowedFormat ||
                  `${t("Allowed_formats")} ${t("Allowed_Volume", { size: sizeFile / (1024 * 1024) })}`} {/* Size in MB */}
              </Typography>
            </Stack>
          </Stack>
          {pending && (
            <Box sx={{ width: "100%", flexGrow: 1, mt: 1.5, mb: 1 }}>
              <LinearProgress />
            </Box>
          )}
        </Stack>
      )}
    </Grid>
  );
};

export default TextFiledFileUpload;
