import { Carousel } from '@mantine/carousel';
import { sub } from 'date-fns';
import { useQuery } from 'react-query';
import { useAPICommunication } from '../../contexts/APICommunicationContext';
import { dateToOffsetDate } from '../../utils/utils-format';
import { AssetChartBox } from './AssetChartBox';

type AssetsCarouselSlideProps = {
  assetName: string;
  userPreferenceCurrency: string;
  userPreferenceCurrencyExchangeRate: number;
  gradient: string;
};

export const AssetsCarouselSlide = ({
  assetName,
  userPreferenceCurrency,
  userPreferenceCurrencyExchangeRate,
  gradient
}: AssetsCarouselSlideProps) => {
  const dateToday = new Date();
  const dateYestarday = sub(dateToday, { days: 1 });
  const dateMonthAgo = sub(dateToday, { months: 1 });

  const context = useAPICommunication();

  const assetValues = useQuery(['assetValues', assetName], async () => {
    const from = dateToOffsetDate(dateMonthAgo);
    const data = await context.assetValuesApi.searchAssetValuesHistory({ assetName: assetName, from: from });
    const values = data.map((assetValueDto) => ({ value: assetValueDto.value, timeStamp: assetValueDto.timeStamp }));
    return values;
  });

  return (
    <Carousel.Slide>
      <AssetChartBox
        name={assetName.toUpperCase()}
        value={
          assetValues.data === undefined
            ? 0
            : assetName === 'usd'
            ? 1 / userPreferenceCurrencyExchangeRate
            : assetValues.data.length === 0
            ? 0
            : assetValues.data[assetValues.data.length - 1].value / userPreferenceCurrencyExchangeRate
        }
        data={
          assetValues.data === undefined
            ? []
            : assetName === 'usd'
            ? [
                { value: 1, timeStamp: dateYestarday },
                { value: 1, timeStamp: dateToday }
              ]
            : assetValues.data
        }
        userPreferenceCurrency={userPreferenceCurrency}
        gradient={gradient}
      />
    </Carousel.Slide>
  );
};
