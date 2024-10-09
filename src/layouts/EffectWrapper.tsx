import { useSelector } from 'react-redux';
import { RootState } from '../stores';
import Loading from '../components/Loading';

const EffectWrapper = () => {
  const isLoading = useSelector((state: RootState) => state.common.isLoading);

  return (
    <>
      {isLoading && <Loading />}
    </>
  );
};

export default EffectWrapper;
