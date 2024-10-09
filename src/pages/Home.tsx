import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionTestData, actionAdditionalData } from '../stores/actions/test'; // 呼叫 Redux action
import { RootState, AppDispatch } from '../stores';

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.common.isLoading); // 選取 loading 狀態
  const testData = useSelector((state: RootState) => state.common.testData);
  const additionalData = useSelector((state: RootState) => state.common.additionalData);
  const requestError = useSelector((state: RootState) => state.common.requestError);

  useEffect(() => {
    dispatch(actionTestData());
    dispatch(actionAdditionalData());
  }, [dispatch]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {requestError && <p>Error: {requestError}</p>}
      <h1>Welcome to the Home Page</h1>
      <h2>Test Data</h2>
      <pre>{JSON.stringify(testData, null, 2)}</pre>
      <h2>Additional Data</h2>
      <pre>{JSON.stringify(additionalData, null, 2)}</pre>
    </>
  );
};

export default Home;
