import { createStyles, Progress, Box, Text, Group, Paper, SimpleGrid, Loader, ThemeIcon, Center } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight, IconDeviceAnalytics } from "@tabler/icons";
import { useQuery } from "react-query";
import { useAPICommunication } from "../../contexts/APICommunicationContext";
import { numberToMoneyString } from "../../utils/utils-format";

const useStyles = createStyles((theme) => ({
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  stat: {
    borderBottom: "3px solid",
    paddingBottom: 5,
  },

  statCount: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.3,
  },

  diff: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4],
  },
}));

interface WalletStatsProps {
  userPreferenceCurrency: string;
}

export const WalletStats = ({ userPreferenceCurrency }: WalletStatsProps) => {
  const { classes } = useStyles();

  const context = useAPICommunication();

  const walletTotalValueQuery = useQuery("walletTotalValue", async () => {
    return await context.walletApi.apiWalletTotalGet();
  });

  const lastDayOfPrevMonth = () => {
    var lastDayOfPrevMonth = new Date();
    lastDayOfPrevMonth.setDate(1);
    lastDayOfPrevMonth.setHours(-1);
    return lastDayOfPrevMonth.toISOString().split("T", 1)[0];
  };

  const walletLastMonthTotalValueQuery = useQuery("walletLastMonthTotalValue", async () => {
    const data = await context.walletApi.apiWalletGet({ from: lastDayOfPrevMonth(), to: lastDayOfPrevMonth() });
    return data[0].value;
  });

  if (walletTotalValueQuery.data === undefined || walletLastMonthTotalValueQuery.data === undefined) {
    return (
      <Paper withBorder style={{ height: 100 }} radius="md">
        <Center style={{ height: 100 }}>
          <Loader size="xl" variant="dots" />
        </Center>
      </Paper>
    );
  }

  const { totalValue, currencyTotalValue, cryptoTotalValue, metalTotalValue } = walletTotalValueQuery.data;

  const data = [
    {
      label: "Currency",
      count: (Math.round(currencyTotalValue * 100) / 100),
      part: Math.round((currencyTotalValue / totalValue) * 10000) / 100,
      color: "#136a8a",
    },
    {
      label: "Crypto Currency",
      count: (Math.round(cryptoTotalValue * 100) / 100),
      part: Math.round((cryptoTotalValue / totalValue) * 10000) / 100,
      color: "#267871",
    },
    {
      label: "Metals",
      count: (Math.round(metalTotalValue * 100) / 100),
      part: Math.round((metalTotalValue / totalValue) * 10000) / 100,
      color: "#00bf8f",
    },
  ];

  const diff =
    Math.round(((totalValue - walletLastMonthTotalValueQuery.data) / walletLastMonthTotalValueQuery.data) * 10000) /
    100;

  const segments = data.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : undefined,
  }));

  const descriptions = data.map((stat) => (
    <Box key={stat.label} sx={{ borderBottomColor: stat.color }} className={classes.stat}>
      <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
        {stat.label}
      </Text>
      <Group position="apart" align="flex-end" spacing={0}>
        <Text weight={700}>
          {numberToMoneyString(stat.count)} {userPreferenceCurrency}
        </Text>
        <Text color={stat.color} weight={700} size="sm" className={classes.statCount}>
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));

  const roundedTotalValue = Math.round(totalValue * 100) / 100;
  return (
    <Paper withBorder p="lg" radius="md">
      <Group position="apart">
        <Group align="flex-end" spacing="xs">
          <Text size="xl" weight={700}>
            { numberToMoneyString(roundedTotalValue) } {userPreferenceCurrency}
          </Text>
          <Text color="teal" className={classes.diff} size="sm" weight={700}>
            <span>{ numberToMoneyString(diff) }%</span>
            <ThemeIcon
              color="gray"
              variant="light"
              sx={(theme) => ({
                color: diff! > 0 ? theme.colors.teal[6] : theme.colors.red[6],
              })}
              size={38}
              radius="md"
            >
              {diff > 0 ? (
                <IconArrowUpRight size={25} stroke={1.5}></IconArrowUpRight>
              ) : (
                <IconArrowDownRight size={25} stroke={1.5}></IconArrowDownRight>
              )}
            </ThemeIcon>
          </Text>
        </Group>
        <IconDeviceAnalytics size={20} className={classes.icon} stroke={1.5} />
      </Group>

      <Text color="dimmed" size="sm">
        Total wallet value compared to previous month
      </Text>
      
      <Progress sections={segments} size={34} classNames={{ label: classes.progressLabel }} mt={40} />
      <SimpleGrid cols={1} mt="xl" mb="md">
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
};
