import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  TextInput,
  Button,
  HelperText,
  Surface,
  Portal,
  Dialog,
  Avatar,
  useTheme
} from 'react-native-paper';
import { Formik } from 'formik';
import { productValidationSchema } from '../types/validation';
import { addProduct } from '../services/api';
import { GestureResponderEvent } from 'react-native';

interface ProductFormProps {
  onSuccess: () => void;
  onProductAdded: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess, onProductAdded = () => { } }) => {
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const theme = useTheme();

  const initialValues = {
    name: '',
    brand: '',
    type: '',
    warranty_period: '',
    start_date: new Date().toISOString().split('T')[0],
    price: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productValidationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addProduct({
            ...values,
            warranty_period: parseInt(values.warranty_period),
            price: parseFloat(values.price),
          });
          setSuccessDialogVisible(true);
          resetForm();
          onSuccess();
          onProductAdded();
        } catch (err) {
          console.error(err);
        } finally {
          setSubmitting(false);
        }
      }}

    >
      {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
        <ScrollView style={styles.container}>
          <Surface style={styles.formContainer}>
            <Avatar.Icon
              size={80}
              icon="package-variant"
              style={styles.icon}
              color={theme.colors.primary}
            />

            <TextInput
              label="Product Name"
              value={values.name}
              onChangeText={handleChange('name')}
              style={styles.input}
              error={touched.name && !!errors.name}
              mode="outlined"
              left={<TextInput.Icon icon="tag" />}
            />
            {touched.name && errors.name && (
              <HelperText type="error">{errors.name}</HelperText>
            )}

            <TextInput
              label="Brand"
              value={values.brand}
              onChangeText={handleChange('brand')}
              style={styles.input}
              error={touched.brand && !!errors.brand}
              mode="outlined"
              left={<TextInput.Icon icon="copyright" />}
            />
            {touched.brand && errors.brand && (
              <HelperText type="error">{errors.brand}</HelperText>
            )}

            <TextInput
              label="Type"
              value={values.type}
              onChangeText={handleChange('type')}
              style={styles.input}
              error={touched.type && !!errors.type}
              mode="outlined"
              left={<TextInput.Icon icon="shape" />}
            />
            {touched.type && errors.type && (
              <HelperText type="error">{errors.type}</HelperText>
            )}

            <TextInput
              label="Warranty Period (months)"
              value={values.warranty_period}
              onChangeText={handleChange('warranty_period')}
              keyboardType="numeric"
              style={styles.input}
              error={touched.warranty_period && !!errors.warranty_period}
              mode="outlined"
              left={<TextInput.Icon icon="shield-check" />}
            />
            {touched.warranty_period && errors.warranty_period && (
              <HelperText type="error">{errors.warranty_period}</HelperText>
            )}

            <TextInput
              label="Start Date (YYYY-MM-DD)"
              value={values.start_date}
              onChangeText={(text) => {
                // Basic date format validation
                if (/^\d{4}-\d{2}-\d{2}$/.test(text) || text === '' || text.length <= 10) {
                  handleChange('start_date')(text);
                }
              }}
              placeholder="YYYY-MM-DD"
              style={styles.input}
              error={touched.start_date && !!errors.start_date}
              mode="outlined"
              left={<TextInput.Icon icon="calendar" />}
            />
            {touched.start_date && errors.start_date && (
              <HelperText type="error">{errors.start_date}</HelperText>
            )}

            <TextInput
              label="Price"
              value={values.price}
              onChangeText={handleChange('price')}
              keyboardType="decimal-pad"
              style={styles.input}
              error={touched.price && !!errors.price}
              mode="outlined"
              left={<TextInput.Icon icon="currency-usd" />}
            />
            {touched.price && errors.price && (
              <HelperText type="error">{errors.price}</HelperText>
            )}

            <Button
              mode="contained"
              onPress={async (event: GestureResponderEvent) => {
                await handleSubmit();
                onProductAdded();
              }}
              loading={isSubmitting}
              disabled={isSubmitting}
              style={styles.button}
              icon="content-save"
            >
              Save Product
            </Button>
          </Surface>

          <Portal>
            <Dialog
              visible={successDialogVisible}
              onDismiss={() => setSuccessDialogVisible(false)}
            >
              <Dialog.Title>Success</Dialog.Title>
              <Dialog.Content>
                <HelperText type='info'>Product saved successfully!</HelperText>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setSuccessDialogVisible(false)}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 4,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    paddingVertical: 8,
  },
});

export default ProductForm;