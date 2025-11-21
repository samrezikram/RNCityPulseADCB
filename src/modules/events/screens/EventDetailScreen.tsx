import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useFavourites } from '../../../bridge/favourites/useFavourites';
import Button from '../../../designSystem/components/Button';
import Screen from '../../../designSystem/components/Screen';
import Text from '../../../designSystem/components/Text';
import { useTheme } from '../../../designSystem/ThemeProvider';
import { EventItem } from '../../../services/api/ticketmasterClient';
type RouteParams = {
  event: EventItem;
};

const EventDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { isFavourite, toggleFavourite } = useFavourites();

  const { event } = route.params as RouteParams;

  const venue = event._embedded?.venues?.[0];
  const start = event.dates?.start;
  const dateTime = [start?.localDate, start?.localTime].filter(Boolean).join(' · ');
  const fav = isFavourite(event.id);

  const lat = venue?.location?.latitude ? Number(venue.location.latitude) : null;
  const lng = venue?.location?.longitude ? Number(venue.location.longitude) : null;
  const hasLocation = lat != null && lng != null && !Number.isNaN(lat) && !Number.isNaN(lng);

  const handleBack = () => navigation.goBack();

  return (
    <Screen scrollable={false}>
      <ScrollView
        contentContainerStyle={[styles.content, { backgroundColor: theme.colors.background }]}
        showsVerticalScrollIndicator={false}>
        {event.images?.[0]?.url && (
          <Image source={{ uri: event.images[0].url }} style={styles.image} resizeMode="cover" />
        )}

        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text variant="heading1" numberOfLines={2}>
              {event.name}
            </Text>
            {venue?.name && (
              <Text color="textSecondary" style={styles.subText} numberOfLines={1}>
                {venue.name}
              </Text>
            )}
            {dateTime && (
              <Text color="textMuted" style={styles.subText}>
                {dateTime}
              </Text>
            )}
            {venue?.city?.name && venue?.country?.name && (
              <Text color="textSecondary" style={styles.locationText}>
                {venue.city.name}, {venue.country.name}
              </Text>
            )}
          </View>

          <TouchableOpacity onPress={() => toggleFavourite(event.id)} style={styles.favButton}>
            <Text variant="heading2" color={fav ? 'accent' : 'textSecondary'}>
              {fav ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>

        {hasLocation && Platform.OS === 'ios' && (
          <View style={styles.mapContainer}>
            <Text variant="heading2" style={styles.sectionTitle}>
              {t('event.map_preview') ?? 'Map preview'}
            </Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: lat as number,
                longitude: lng as number,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              pointerEvents="none">
              <Marker
                coordinate={{
                  latitude: lat as number,
                  longitude: lng as number,
                }}
              />
            </MapView>
          </View>
        )}

        <View style={styles.actions}>
          <Button label={t('event.back_to_events') ?? 'Back to events'} variant="ghost" onPress={handleBack} />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 16,
    gap: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  favButton: {
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  subText: {
    marginTop: 4,
  },
  locationText: {
    marginTop: 6,
  },
  mapContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  map: {
    width: '100%',
    height: 160,
    borderRadius: 16,
  },
  actions: {
    marginTop: 12,
    alignItems: 'center',
  },
});

export default EventDetailScreen;
