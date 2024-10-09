import { TestData } from '../../apis';

export interface CommonState {
  isLoading: boolean;
  testData: TestData | null;
  additionalData: TestData | null;
  requestSuccess: boolean;
  requestError: string | null;
}
