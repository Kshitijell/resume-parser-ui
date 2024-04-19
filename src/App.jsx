import 'simplebar-react/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import ProgressBar from 'src/components/progress-bar';
import { SettingsProvider } from 'src/components/settings';
import { AuthProvider, AuthConsumer } from 'src/auth/context/msal';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MotionLazy } from './components/animate/motion-lazy';


export default function App() {

  useScrollToTop();

  // function getPreferredColorScheme() {
  //   if (window.matchMedia) {
  //     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //       return 'dark';
  //     }
  //   }
  //   return 'light';
  // }
  return (
    <AuthProvider>
      <SettingsProvider
        defaultSettings={{
          themeMode: 'light',
          themeDirection: 'ltr',
          themeContrast: 'defaultz',
          themeLayout: 'vertical',
          themeColorPresets: 'default',
          themeStretch: false,
        }}
      >
        <ThemeProvider>
          <MotionLazy>
            <ProgressBar />
            <ToastContainer position="bottom-right" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <AuthConsumer>
                <Router />
              </AuthConsumer>
            </LocalizationProvider>
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
