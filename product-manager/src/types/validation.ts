import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  name: yup.string()
    .required('Product name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  brand: yup.string()
    .required('Brand is required')
    .min(2, 'Brand must be at least 2 characters'),
  type: yup.string()
    .required('Type is required'),
  warranty_period: yup.number()
    .required('Warranty period is required')
    .positive('Warranty period must be positive')
    .integer('Warranty period must be a whole number'),
    start_date: yup.date()
    .nullable()
    .required('Start date is required'),
  price: yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .test('decimals', 'Price cannot have more than 2 decimal places', 
      (value) => !value || Number.isInteger(value * 100)),
});