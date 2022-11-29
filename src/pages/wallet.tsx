import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Layout } from "../components/layout/Layout";
import { AddAsset } from "../components/wallet/AddAsset";
import { UserAssetList } from "../components/wallet/UserAssetList";
import { WalletValue } from "../components/wallet/WalletValue";
import { Center, createStyles, Loader } from "@mantine/core";
import { useQuery } from "react-query";
import { useAPICommunication } from "../contexts/APICommunicationContext";

const useStyles = createStyles((theme) => ({
  content: {
    padding: "0.5rem",
    gap: "3rem",
    display: "flex",
    justifyContent: "center",
    [theme.fn.smallerThan("lg")]: {
      flexDirection: "column",
    },
    [theme.fn.largerThan("sm")]: {
      padding: "2rem 4rem",
      gap: "3rem",
    },
  },

  flexRowTablet: {
    flex: 2,
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
    flex: 3,
    justifySelf: "start",
    marginBottom: "2rem",
    [theme.fn.smallerThan("md")]: {
      [theme.fn.largerThan("sm")]: {
        marginBottom: "0rem",
      },
    },
  },
}));

const Wallet = () => {
  const { classes } = useStyles();

  const context = useAPICommunication();

  const userPreferenceQuery = useQuery("userPreference", async () => {
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
        <div className={classes.flexRowTablet}>
          <div className={classes.removeMarginTablet}>
            <WalletValue userPreferenceCurrency={userPreferenceQuery.data.preferenceCurrency} />
          </div>
          <div style={{ flex: 3, justifySelf: "end" }}>
            <AddAsset />
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <UserAssetList userPreferenceCurrencySymbol={userPreferenceQuery.data.preferenceCurrency} />
        </div>
      </div>
    </Layout>
  );
};

export default withAuthenticationRequired(Wallet, {
  onRedirecting: () => <p>Redirecting to the login page...</p>,
});
