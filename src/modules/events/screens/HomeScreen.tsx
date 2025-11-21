import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useEventSearch } from '../../../bridge/events/useEventSearch';
import { useFavourites } from '../../../bridge/favourites/useFavourites';
import Button from '../../../designSystem/components/Button';
import Screen from '../../../designSystem/components/Screen';
import Text from '../../../designSystem/components/Text';
import { useTheme } from '../../../designSystem/ThemeProvider';
import { EventItem } from '../../../services/api/ticketmasterClient';
const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { events, loading, error, search } = useEventSearch();
  const { isFavourite, toggleFavourite } = useFavourites();

  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('Dubai');

  const handleSearch = async () => {
    await search(keyword.trim(), city.trim());
  };

  const handleOpenEvent = (event: EventItem) => {
    navigation.navigate('EventDetail', { event });
  };

  const renderItem = ({ item }: { item: EventItem }) => {
    const venue = item._embedded?.venues?.[0];
    const date = item.dates?.start?.localDate;
    const fav = isFavourite(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
        onPress={() => handleOpenEvent(item)}>
        {item.images?.[0]?.url && (
          <Image source={{ uri: item.images[0].url }} style={styles.image} resizeMode="cover" />
        )}
        <View style={styles.cardContent}>
          <View style={{ flex: 1 }}>
            <Text variant="heading2" numberOfLines={1}>
              {item.name}
            </Text>
            {venue?.name && (
              <Text color="textSecondary" numberOfLines={1} style={styles.cardSub}>
                {venue.name}
              </Text>
            )}
            {date && (
              <Text color="textMuted" style={styles.cardSub}>
                {date}
              </Text>
            )}
          </View>

          <TouchableOpacity onPress={() => toggleFavourite(item.id)}>
            <Text variant="heading2" color={fav ? 'accent' : 'textSecondary'}>
              {fav ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      <Text variant="heading1" style={styles.title}>
        {t('home.title')}
      </Text>

      <View style={styles.searchRow}>
        <View style={styles.searchColumn}>
          <Text variant="body" style={styles.label}>
            {t('home.search_placeholder')}
          </Text>
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder={t('home.search_placeholder')}
            placeholderTextColor="#6B7280"
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                color: theme.colors.textPrimary,
              },
            ]}
          />
        </View>

        <View style={styles.searchColumn}>
          <Text variant="body" style={styles.label}>
            {t('home.city_placeholder')}
          </Text>
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder={t('home.city_placeholder')}
            placeholderTextColor="#6B7280"
            style={styles.input}
          />
        </View>
      </View>

      <Button label="Search events" onPress={handleSearch} style={styles.searchButton} />

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      )}

      {error && !loading && (
        <Text color="textDanger" style={styles.errorText}>
          {error}
        </Text>
      )}

      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
  },
  searchColumn: {
    flex: 1,
  },
  label: {
    marginBottom: 4,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2933',
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#F9FAFB',
  },
  searchButton: {
    marginTop: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 10,
  },
  cardSub: {
    marginTop: 2,
  },
  center: {
    alignItems: 'center',
    marginVertical: 12,
  },
  errorText: {
    marginTop: 8,
  },
});

export default HomeScreen;
