import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Surface,
  useTheme,
  ActivityIndicator,
  Avatar,
  Caption,
  Divider,
  IconButton,
  Text
} from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { getProducts } from '../services/api';
import { Product } from '../types';
import { useFocusEffect } from '@react-navigation/native';
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();

  const loadProducts = async () => {
    try {
      setRefreshing(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    loadProducts();
  }, []);

  // const renderProducts = (item: Product) => {
  //   const price = typeof item.price === 'number' ? 
  //     `$${item.price.toFixed(2)}` : 
  //     "$0.00";
  //   return price;
  // };
 
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return "Invalid Date";
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <Surface style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>{item.name || 'Unnamed Product'}</Title>
              <Caption>{item.brand || 'No Brand'}</Caption>
            </View>
            <Avatar.Icon
              size={40}
              icon="package-variant"
              style={[styles.cardIcon, { backgroundColor: theme.colors.primary }]}
            />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Icon name="shape" size={20} />
              <Paragraph style={styles.detailText}>{item.type || 'No Type'}</Paragraph>
            </View>
            <View style={styles.detailRow}>
              <Icon name="shield-check" size={20} />
              <Paragraph style={styles.detailText}>
                {`${item.warranty_period || 0} months warranty`}
              </Paragraph>
            </View>
            <View style={styles.detailRow}>
              <Icon name="calendar" size={20} />
              <Paragraph style={styles.detailText}>
                Started: {formatDate(item.start_date)}
              </Paragraph>
            </View>
            <View style={styles.detailRow}>
              <Icon name="currency-usd" size={20} />
              <Paragraph style={styles.detailText}>{item.price}</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
    </Surface>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id?.toString() ?? ''}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Icon source="package-variant" size={48} />
          <Title style={styles.emptyText}>No products yet</Title>
          <Caption>Add your first product to get started</Caption>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  card: {
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  cardIcon: {
    marginLeft: 8,
  },
  divider: {
    marginVertical: 8,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailText: {
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    marginBottom: 8,
  },
});

export default ProductList;
