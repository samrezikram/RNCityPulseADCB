import { useState } from 'react';
import { mockEvents } from '../../mocks/events';
import { EventItem, fetchEvents } from '../../services/api/ticketmasterClient';

export const useEventSearch = () => {
  const [events, setEvents] = useState<EventItem[]>(mockEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (keyword: string, city: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchEvents(keyword, city);

      if (result.length === 0) {
        // fallback to mocks
        setEvents(
          mockEvents.filter(
            e =>
              e.name.toLowerCase().includes(keyword.toLowerCase()) ||
              e._embedded?.venues?.[0]?.city?.name
                ?.toLowerCase()
                .includes(city.toLowerCase()),
          ),
        );
      } else {
        setEvents(result);
      }
    } catch (e) {
      setError('Could not load events');
      setEvents(mockEvents);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    error,
    search,
  };
};