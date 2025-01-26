import {
  Grid,
  IconButton,
  Stack,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
  ChangeEvent,
} from "react";
import Image from "next/image";
import fileUploaderSrc from "#/public/images/fileuploader.svg";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { AcademyIcon } from "#/ui/component/common/AcademyIcon";
import { PreviewModal } from "#/ui/component/common/TextFiledFileUpload/PreviewModal";
import { useUploadFileMutation } from "#/redux/services/UploadApi";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {
  setAlert,
  setError,
  setMessage,
} from "#/redux/features/snackBarHandlerSlice";
import { useAppDispatch } from "#/redux/hooks";

type fileUploadPropsType = {
  setFileGuId?: Dispatch<SetStateAction<string[] | any>>;
  label?: string;
  imageResizeType?: number;
  resetInput?: boolean;
  previewValue?: string;
  HasThumb?: boolean;
  typeFile?: string;
  multiple?: boolean;
  title?: string;
  isRequired?: boolean;
  setId?: Dispatch<SetStateAction<string[] | any>>;
  allowedFormat?: string;
  accept?: string;
  previewModalValue?: string | string[];
  onRemove?: () => void;
};

const TextFiledFileUpload = ({
  isRequired = false,
  typeFile = "",
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
    if (event.target.files) {
      const _files = Array.from(event.target.files);

      // Check file size (100MB limit)
      const oversizedFiles = _files.filter(
        (file) => file.size > 100 * 1024 * 1024
      );
      if (oversizedFiles.length > 0) {
        dispatch(setAlert(true));
        dispatch(setError(true));
        dispatch(setMessage(t("limit_100mb")));
        return;
      }

      setPending(true);

      (accept &&
        accept?.includes(
          event?.target?.files[0].type.split("/").slice(0, 2)[1]
        )) ||
      accept === undefined
        ? uploadFile({ files: _files.map((i) => i) })
            .unwrap()
            .then((response: any) => {
              if (event?.target?.files) {
                setPreview(`https://file.pmlm.ir/${response.result.url}`);
                setFileGuId?.(multiple ? response?.result : response.result.id);
                setFileSize(response.result.fileSizeText);
                setId?.(response.result.id);
                setPending(false);
              }
            })
            .catch((error: any) => {
              setPending(false);
              console.log(error);
            })
        : `$${
            (setPending(false),
            (dispatch(setAlert(true)),
            dispatch(setError(true)),
            dispatch(setMessage(t("Allowed_format")))))
          }`;
    }
  };

  return (
    <Grid item xs={12} sx={{ p: 1, width: "100%" }}>
      <Typography
        component={"span"}
        variant={"subtitle2"}
        sx={[
          { pb: 1, display: "block", width: "fit-content" },
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
                color={theme.palette.text.primary}
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
                color={theme.palette.text.primary}
              />
            </IconButton>
            <PreviewModal
              open={open}
              handleOpen={() => setOpen(!open)}
              typeFile={typeFile}
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
              <Typography variant={"subtitle2"} color={theme.palette.grey[800]}>
                {label}
              </Typography>
              <Typography variant={"caption"} color={theme.palette.grey[700]}>
                {allowedFormat ||
                  `${t("Allowed_formats")} ${t("Allowed_Volume")}`}
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
