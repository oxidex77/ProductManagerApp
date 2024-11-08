import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProductForm from '../components/ProductForm';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

type AddProductScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddProduct'>;

interface AddProductScreenProps {
  navigation: AddProductScreenNavigationProp;
}

interface AddProductScreenProps {
  navigation: AddProductScreenNavigationProp;
}

const AddProductScreen: React.FC<AddProductScreenProps> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <ProductForm onSuccess={() => navigation.goBack()} onProductAdded={() => {}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default AddProductScreen;
