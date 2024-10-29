// RootStackParamList.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined;
    AddProduct: undefined;
    ProductDetail: { id: string }; // Example of a parameter if you plan to navigate with a product ID
  };
  type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
