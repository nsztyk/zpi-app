import React from "react";
import { Layout } from "../components/layout/Layout";
import { BrushChart } from "../components/dashboard/BrushChart";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { AssetsCarousel } from "../components/dashboard/AssetsCarousel";
import { Center, createStyles, Grid, Loader, Paper, Space } from "@mantine/core";
import { WalletStats } from "../components/dashboard/WalletStats";
import { HistoryTable } from "../components/dashboard/HistoryTable";
import { useAPICommunication } from "../contexts/APICommunicationContext";
import { useQuery } from "react-query";

const walletData = [
  [1666224000000, 31.34],
  [1666310400000, 31.18],
  [1666396800000, 31.05],
  [1666483200000, 31.0],
  [1666569600000, 30.95],
  [1666656000000, 31.24],
  [1666742400000, 31.29],
  [1666828800000, 31.85],
  [1666915200000, 31.86],
  [1667001600000, 32.28],
  [1667088000000, 32.1],
  [1667174400000, 32.65],
  [1667260800000, 32.21],
  [1667347200000, 32.35],
  [1667433600000, 32.44],
  [1667520000000, 30.95],
];

const useStyles = createStyles((theme) => ({
  content: {
    padding: 10,
  },
  flex: {
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
    padding: "0.5rem",
    gap: "1rem",
    [theme.fn.largerThan("sm")]: {
      padding: "0.5rem 1rem 1.5rem 1rem",
      gap: "1rem",
    },
  },
  flexRowTablet: {
    [theme.fn.smallerThan("md")]: {
      [theme.fn.largerThan("sm")]: {
        display: "flex",
        justifyContent: "center",
        width: "auto",
        gap: "2rem",
      },
    },
  },

  removeMarginTablet: {
    [theme.fn.smallerThan("md")]: {
      [theme.fn.largerThan("sm")]: {
        marginBottom: "0rem",
      },
    },
  },
}));

const historyData = {
  data: [
    {
      symbol: "EUR",
      name: "euro",
      value: 10,
      date: "20/04/2021",
    },
    {
      symbol: "PLN",
      name: "polish zloty",
      value: 10,
      date: "20/04/2021",
    },
    {
      symbol: "USD",
      name: "american dollar",
      value: 10,
      date: "20/04/2021",
    },
    {
      symbol: "EUR",
      name: "euro",
      value: 10,
      date: "20/04/2021",
    },
    {
      symbol: "PLN",
      name: "polish zloty",
      value: 10,
      date: "20/04/2021",
    },
    {
      symbol: "USD",
      name: "american dollar",
      value: 10,
      date: "20/04/2021",
    },
    {
      symbol: "EUR",
      name: "euro",
      value: 10,
      date: "20/04/2021",
    },
    {
      symbol: "PLN",
      name: "polish zloty",
      value: 10,
      date: "20/04/2021",
    },
    {
      symbol: "USD",
      name: "american dollar",
      value: 10,
      date: "20/04/2021",
    },
  ],
};

const Dashboard = () => {
  const { classes } = useStyles();

  const context = useAPICommunication();

  const userPreferenceQuery = useQuery("userPreferenceDashboard", async () => {
    return await context.userPreferenceAPI.getUserPreferences();
  });

  if (userPreferenceQuery.data === undefined) {
    return (
      <Center h={120}>
        <Loader size="xl" variant="dots" />
      </Center>
    );
  }

  return (
    <Layout>
      <div className={classes.content}>
        <Grid>
          <Grid.Col md={9}>
            <BrushChart data={walletData} />
          </Grid.Col>
          <Grid.Col md={3}>
            <WalletStats userPreferenceCurrency={userPreferenceQuery.data.preferenceCurrency.toUpperCase()} />
          </Grid.Col>
        </Grid>
        <Space h="md" />
        <div style={{ paddingBottom: "1rem" }}>
          <AssetsCarousel />
        </div>
        <Space h="md" />
        <Grid>
          <Grid.Col md={4}>{/* <AddAsset /> */}</Grid.Col>
          <Grid.Col md={8}>
            <HistoryTable data={historyData.data} />
          </Grid.Col>
        </Grid>
      </div>
    </Layout>
  );
};

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <p>Redirecting to the login page...</p>,
});
