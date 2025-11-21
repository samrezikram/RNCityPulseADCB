import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '../designSystem/ThemeProvider';
import { initI18n } from '../i18n';
import RootNavigator from './RootNavigator';

const client = new QueryClient();

const AppProviders: React.FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await initI18n();
      setReady(true);
    })();
  }, []);

  if (!ready) {
    return null; // you can show a small loader
  }

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
