import {
  Avatar,
  Button,
  Group,
  Space,
  Text,
  createStyles,
  Select,
  ActionIcon,
  Flex,
  Paper,
  NumberInput,
  TextInput,
  Loader,
  Stack
} from '@mantine/core';
import { IconMoneybag, IconPlus, IconTrash } from '@tabler/icons';
import { AssetDto, PatchUserAssetsDto } from '../../client-typescript';
import { trim } from 'lodash';
import { useQuery, useQueryClient } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { LoaderDots } from '../common/LoaderDots';
import { useForm } from '@mantine/form';
import { randomId, useToggle } from '@mantine/hooks';
import { getPrecisionByCategory } from '../../utils/utils-format';
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? 'white' : 'black'
  }
}));

export type AddAssetProps = {
  assets: AssetDto[];
};

export type AddTransactionModel = {
  key: string;
  value: number | null;
  assetName: string | null;
  description: string | null;
  precision: number;
};

const initialValue: AddTransactionModel = {
  key: randomId(),
  assetName: null,
  value: null,
  description: null,
  precision: 2
};

export function AddAsset() {
  const { classes } = useStyles();
  const [isLoading, toggleLoading] = useToggle([false, true] as const);
  const context = useAPICommunication();
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      userAssets: [initialValue]
    },
    validate: {
      userAssets: {
        assetName: (value) => (value !== null && trim(value).length > 0 ? null : 'Required'),
        description: (value) => (value !== null && trim(value).length > 0 ? null : 'Required'),
        value: (value) =>
          value == null ? 'Required' : value <= 0 ? 'Value must be ge greater than zero' : isFinite(value) ? null : 'Required'
      }
    }
  });

  const assetQuery = useQuery('asset', async () => {
    return await context.assetsAPI.getAllAssets();
  });

  assetQuery?.data?.sort((item1, item2) =>
    item1.friendlyName > item2.friendlyName ? 1 : item1.friendlyName === item2.friendlyName ? 0 : -1
  );

  const getPrecision = (assetName: string) => {
    const foundAsset = assetQuery.data?.find((asset) => asset.name === assetName);
    if (foundAsset) {
      return getPrecisionByCategory(foundAsset.category);
    }
    return 2;
  };

  const fields = form.values.userAssets.map((item, index) => (
    <Flex key={item.key} mt="xs" pb={'lg'} w={'100%'}>
      <Paper style={{ flex: 8 }}>
        <Stack spacing={4}>
          <Select
            placeholder="* Asset name"
            searchable
            data={
              assetQuery.data?.map((asset) => ({
                value: asset.name,
                label: asset.friendlyName
              })) ?? []
            }
            {...form.getInputProps(`userAssets.${index}.assetName`)}
            rightSection={assetQuery.data === undefined || assetQuery.isLoading ? <Loader size="xs" /> : undefined}
          />
          <TextInput placeholder="* Asset origin (ex. cash, bank)" {...form.getInputProps(`userAssets.${index}.description`)} />
          <NumberInput
            placeholder={'* Amount'}
            min={0}
            precision={getPrecision(form.getInputProps(`userAssets.${index}.assetName`).value)}
            {...form.getInputProps(`userAssets.${index}.value`)}
          />
        </Stack>
      </Paper>

      <div style={{ flex: 1, marginLeft: 10 }}>
        {index !== 0 && (
          <ActionIcon size="md" color="red" onClick={() => form.removeListItem('userAssets', index)}>
            <IconTrash size={16} />
          </ActionIcon>
        )}
      </div>
    </Flex>
  ));

  const saveForm = async (event: any) => {
    event.preventDefault();
    const validation = form.validate();
    toggleLoading();
    if (!validation.hasErrors) {
      const userAssetPatchData: PatchUserAssetsDto[] = form.values.userAssets.map((value) => ({
        assetName: value.assetName ?? '',
        description: value.description ?? '',
        type: 'Update',
        value: value.value as unknown as number
      }));
      try {
        await context.userAssetsAPI.patchUserAssets({
          patchUserAssetsDto: userAssetPatchData
        });
        showNotification({
          autoClose: 5000,
          message: 'Successfully updated new assets',
          color: 'green'
        });
        form.reset();
        form.setValues({
          userAssets: [{ key: randomId(), assetName: null, value: null, description: null, precision: 2 }]
        });
        try {
          queryClient.invalidateQueries('userAsset');
        } catch (e) {
          showNotification({
            autoClose: 5000,
            message: 'Failed to refetch assets',
            color: 'red'
          });
        }
        try {
          queryClient.invalidateQueries('walletTotalValue');
        } catch (e) {
          showNotification({
            autoClose: 5000,
            message: 'Failed to refetch wallet value',
            color: 'red'
          });
        }
      } catch (e) {
        showNotification({
          autoClose: 5000,
          message: 'Failed to create new assets',
          color: 'red'
        });
      }
    }
    toggleLoading();
  };

  return (
    <Paper withBorder radius="md" p={'md'}>
      <Group>
        <Avatar variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} radius="xl">
          <IconMoneybag color="white" stroke="1.8" size={20} />
        </Avatar>
        <Text fz="lg">Add new transaction</Text>
      </Group>

      {assetQuery.isLoading ? (
        <LoaderDots h={144} />
      ) : (
        <div>
          <Space h="md" />
          <form onSubmit={saveForm}>
            {fields}
            <Flex align={'center'} justify="space-between" mt="lg">
              <ActionIcon variant="default" size={'lg'}>
                <IconPlus
                  className={classes.icon}
                  onClick={() =>
                    form.insertListItem('userAssets', {
                      key: randomId(),
                      assetName: undefined,
                      value: undefined,
                      description: undefined,
                      precision: 2
                    })
                  }
                />
              </ActionIcon>
              <Button type="submit" variant="filled" loading={isLoading} disabled={Object.values(form.errors).length > 0}>
                Submit
              </Button>
            </Flex>
          </form>
        </div>
      )}
    </Paper>
  );
}
