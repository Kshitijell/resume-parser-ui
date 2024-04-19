import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import { useEffect, useMemo, useCallback, useState } from "react";
import { useLocalStorage } from "src/hooks/use-local-storage";
import { localStorageGetItem } from "src/utils/storage-available";
import { SettingsContext } from "./settings-context";

const STORAGE_KEY = "settings";

export function SettingsProvider({ children, defaultSettings }) {
  const { state, update, reset } = useLocalStorage(
    STORAGE_KEY,
    defaultSettings
  );

  const [openDrawer, setOpenDrawer] = useState(false);

  const isArabic = localStorageGetItem("i18nextLng") === "ar";

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang("ar");
    }
  }, [isArabic]);

  const onChangeDirectionByLang = useCallback(
    (lang) => {
      update("themeDirection", lang === "ar" ? "rtl" : "ltr");
    },
    [update]
  );

  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      onChangeDirectionByLang,
      canReset,
      onReset: reset,
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [
      reset,
      update,
      state,
      canReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
      onChangeDirectionByLang,
    ]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}

SettingsProvider.propTypes = {
  children: PropTypes.node,
  defaultSettings: PropTypes.object,
};
