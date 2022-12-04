import React from 'react';
import { Layout } from '../components/layout/Layout';
import { BrushChart } from '../components/dashboard/BrushChart';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { AssetsCarousel } from '../components/dashboard/AssetsCarousel';
import { Center, Grid, Loader, Stack } from '@mantine/core';
import { WalletStats } from '../components/dashboard/WalletStats';
import { HistoryTable } from '../components/dashboard/HistoryTable';
import { useAPICommunication } from '../contexts/APICommunicationContext';
import { useQuery } from 'react-query';
import { orderBy } from 'lodash';

const Dashboard = () => {
  const context = useAPICommunication();

  const walletHistoryData = useQuery('walletHistory', async () => {
    const data = await context.walletApi.apiWalletGet();
    return orderBy(data, (wallet) => wallet.dateStamp);
  });

  const assetsData = useQuery('assets', async () => {
    return await context.assetsAPI.getAllAssets();
  });

  const userPreferenceQuery = useQuery('userPreferenceDashboard', async () => {
    return await context.userPreferenceAPI.getUserPreferences();
  });

  if (walletHistoryData.data === undefined || userPreferenceQuery.data === undefined || assetsData.data === undefined) {
    return (
      <Center h={120}>
        <Loader size="xl" variant="dots" />
      </Center>
    );
  }

  const walletData = walletHistoryData.data.map((row) => [row.dateStamp.getTime(), row.value]);

  return (
    <Layout>
      <Grid gutter={'md'} pt={'lg'} pl={'md'} maw={'100%'} mah={'100%'} h={'100%'} justify="space-between">
        <Grid.Col lg={8}>
          <Stack justify={'space-between'} h={'100%'}>
            <div>
              <BrushChart data={walletData} />
            </div>
            <div
              style={{
                marginTop: 'auto',
                marginBottom: 'auto'
              }}>
              <AssetsCarousel assets={assetsData.data} />
            </div>
          </Stack>
        </Grid.Col>
        <Grid.Col lg={4}>
          <Stack h="100%">
            <WalletStats userPreferenceCurrency={userPreferenceQuery.data.preferenceCurrency.toUpperCase()} />
            <HistoryTable assets={assetsData.data} />
          </Stack>
        </Grid.Col>
      </Grid>
    </Layout>
  );
};

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <p>Redirecting to the login page...</p>
});
