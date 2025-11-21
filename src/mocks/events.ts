import { EventItem } from '../services/api/ticketmasterClient';

export const mockEvents: EventItem[] = [
  {
    id: 'mock1',
    name: 'Downtown Music Night',
    images: [{ url: 'https://placehold.co/600x400?text=Music' }],
    dates: { start: { localDate: '2025-11-25', localTime: '19:30:00' } },
    _embedded: {
      venues: [
        {
          name: 'Dubai Opera',
          city: { name: 'Dubai' },
          country: { name: 'United Arab Emirates' },
          location: { latitude: '25.1972', longitude: '55.2744' },
        },
      ],
    },
  },
  {
    id: 'mock2',
    name: 'City Food Festival',
    images: [{ url: 'https://placehold.co/600x400?text=Food' }],
    dates: { start: { localDate: '2025-12-01', localTime: '17:00:00' } },
    _embedded: {
      venues: [
        {
          name: 'JBR Beach Walk',
          city: { name: 'Dubai' },
          country: { name: 'United Arab Emirates' },
          location: { latitude: '25.0800', longitude: '55.1400' },
        },
      ],
    },
  },
  {
    id: 'mock3',
    name: 'Desert Light Show',
    images: [{ url: 'https://placehold.co/600x400?text=Desert' }],
    dates: { start: { localDate: '2025-12-10', localTime: '20:00:00' } },
    _embedded: {
      venues: [
        {
          name: 'Al Qudra Lakes',
          city: { name: 'Dubai' },
          country: { name: 'United Arab Emirates' },
          location: { latitude: '24.8231', longitude: '55.3180' },
        },
      ],
    },
  },
];