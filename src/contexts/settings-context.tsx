import { createContext, useContext, useEffect, useState } from 'react';

const initialSettings = {
  theme: 'light',
  tintColor : '#2F3247'
};

type SettingsContextType = {
  settings: typeof initialSettings;
  saveSettings: (updatedSettings: typeof initialSettings) => void;
};

export const restoreSettings = () => {
  let settings = null;

  try {
    const storedData = window.localStorage.getItem('settings');

    if (storedData) {
      settings = JSON.parse(storedData);
    } else {
      settings = {
        theme: window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light' ,
        tintColor :  initialSettings.tintColor
      };
    }
  } catch (err) {
    console.error("use setting error :" + err);
  }

  return settings;
};

export const storeSettings = (settings : typeof initialSettings ) => {
  window.localStorage.setItem('settings', JSON.stringify(settings));
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: initialSettings,
  saveSettings: () => { }
});


export const SettingsProvider = ({children }  : {children : React.ReactNode}) => {
 
  const [settings, setSettings] = useState(initialSettings);


  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings(restoredSettings);
    }
  }, []);

  const saveSettings = (updatedSettings  : typeof initialSettings
    )  => {
    setSettings(updatedSettings);
    storeSettings(updatedSettings);
  };


  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};


export const SettingsConsumer = SettingsContext.Consumer;

export const useSettings = () => useContext(SettingsContext);