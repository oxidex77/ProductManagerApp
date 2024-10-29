// RootStackParamList.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined;
    AddProduct: undefined;
    ProductDetail: { id: string }; 
  };
  type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
