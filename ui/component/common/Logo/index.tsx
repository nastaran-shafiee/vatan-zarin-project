import Image from "next/image";
import faLogo from "#/public/images/grid.svg";
import enLogo from "#/public/images/en-logo-pmlm.svg";
import arLogo from "#/public/images/ar-logo-pmlm.svg";
import Stack from "@mui/material/Stack";
import { PersistLangLink } from "#/ui/component/common/PersistLangLink";
import { useParams } from "next/navigation";
import { FC } from "react";
type PropsType = {
  width?: number;
  height?: number;
};

const Logo: FC<PropsType> = ({ width = 67, height = 28 }) => {
  const path = useParams();
  return (
    <Stack justifyContent={"center"} direction="row" alignItems="center">
      <PersistLangLink href={"/"}>
        {path.lang == "fa" && (
          <Image src={faLogo} alt={"logo"} width={width} height={height} />
        )}
        {path.lang == "en" && (
          <Image src={enLogo} alt={"logo"} width={width} height={height} />
        )}
        {path.lang == "ar" && (
          <Image src={arLogo} alt={"logo"} width={width} height={height} />
        )}
      </PersistLangLink>
    </Stack>
  );
};
export default Logo;
