import { FC, ReactNode } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { faIR, arSD, enUS } from '@mui/x-data-grid';
import {
  faIR as pickersFaIR,
  enUS as pickersEnUS,
} from '@mui/x-date-pickers/locales';
import {
  faIR as coreFaIR,
  arSD as coreArSD,
  enUS as coreEnUS,
} from '@mui/material/locale';
import { useParams } from 'next/navigation';
interface dataGridProviderProps {
  children: ReactNode;
}

const DataGridProvider: FC<dataGridProviderProps> = ({ children }) => {
  const { lang } = useParams();
  const direction = lang !== 'en' ? 'rtl' : 'ltr';
  const existingTheme = useTheme();

  const langs =
    lang === 'fa' || lang === ''
      ? [faIR, pickersFaIR, coreFaIR]
      : lang === 'ar'
        ? [arSD, pickersEnUS, coreArSD]
        : [enUS, pickersEnUS, coreEnUS];

  const theme: any = createTheme({}, ...langs, existingTheme, {
    direction,
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default DataGridProvider;
