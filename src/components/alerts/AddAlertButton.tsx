import { Button, createStyles } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { IconPlus } from '@tabler/icons';
import { useQueryClient } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { AddAlertModalInnerProps } from './AddAlertModal';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1]}`
  },

  active: {
    backgroundImage: theme.fn.gradient({ from: 'pink', to: 'orange' })
  },

  control: {
    border: '0 !important'
  },

  labelActive: {
    color: `${theme.white} !important`
  }
}));

export const AddAlertButton = () => {
  const context = useAPICommunication();
  const quueryClient = useQueryClient();

  return (
    <Button
      variant="outline"
      leftIcon={<IconPlus size={14} />}
      onClick={() =>
        openContextModal({
          modal: 'alertModal',
          title: 'Add new alert',
          size: 'lg',
          innerProps: {
            onSubmit: async (values) => {
              await context.allertsApi.addNewAllert({
                addAlertDto: { currency: values.currency, originAssetName: values.originAsset, value: values.value as number }
              });
              quueryClient.invalidateQueries('getAllAllerts');
            }
          } as AddAlertModalInnerProps
        })
      }>
      Add alert
    </Button>
  );
};
