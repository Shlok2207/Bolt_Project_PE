import type {
  DriverStanding,
  ConstructorStanding,
  RaceEvent,
  SeasonSummary,
  DriverComparison,
} from '@/types/f1';

export const MOCK_DRIVER_STANDINGS: DriverStanding[] = [
  { position: '1', points: '431', wins: '8', driverId: 'norris', driverName: 'Lando Norris', driverCode: 'NOR', driverNumber: '4', nationality: 'British', constructorName: 'McLaren', constructorId: 'mclaren' },
  { position: '2', points: '397', wins: '7', driverId: 'piastri', driverName: 'Oscar Piastri', driverCode: 'PIA', driverNumber: '81', nationality: 'Australian', constructorName: 'McLaren', constructorId: 'mclaren' },
  { position: '3', points: '357', wins: '4', driverId: 'verstappen', driverName: 'Max Verstappen', driverCode: 'VER', driverNumber: '1', nationality: 'Dutch', constructorName: 'Red Bull', constructorId: 'red_bull' },
  { position: '4', points: '312', wins: '2', driverId: 'leclerc', driverName: 'Charles Leclerc', driverCode: 'LEC', driverNumber: '16', nationality: 'Monégasque', constructorName: 'Ferrari', constructorId: 'ferrari' },
  { position: '5', points: '289', wins: '2', driverId: 'hamilton', driverName: 'Lewis Hamilton', driverCode: 'HAM', driverNumber: '44', nationality: 'British', constructorName: 'Ferrari', constructorId: 'ferrari' },
  { position: '6', points: '254', wins: '1', driverId: 'russell', driverName: 'George Russell', driverCode: 'RUS', driverNumber: '63', nationality: 'British', constructorName: 'Mercedes', constructorId: 'mercedes' },
  { position: '7', points: '218', wins: '0', driverId: 'alonso', driverName: 'Fernando Alonso', driverCode: 'ALO', driverNumber: '14', nationality: 'Spanish', constructorName: 'Aston Martin', constructorId: 'aston_martin' },
  { position: '8', points: '195', wins: '0', driverId: 'sainz', driverName: 'Carlos Sainz', driverCode: 'SAI', driverNumber: '55', nationality: 'Spanish', constructorName: 'Williams', constructorId: 'williams' },
  { position: '9', points: '154', wins: '0', driverId: 'gasly', driverName: 'Pierre Gasly', driverCode: 'GAS', driverNumber: '10', nationality: 'French', constructorName: 'Alpine', constructorId: 'alpine' },
  { position: '10', points: '132', wins: '0', driverId: 'hulkenberg', driverName: 'Nico Hulkenberg', driverCode: 'HUL', driverNumber: '27', nationality: 'German', constructorName: 'Kick Sauber', constructorId: 'sauber' },
  { position: '11', points: '98', wins: '0', driverId: 'stroll', driverName: 'Lance Stroll', driverCode: 'STR', driverNumber: '18', nationality: 'Canadian', constructorName: 'Aston Martin', constructorId: 'aston_martin' },
  { position: '12', points: '75', wins: '0', driverId: 'albon', driverName: 'Alexander Albon', driverCode: 'ALB', driverNumber: '23', nationality: 'Thai', constructorName: 'Williams', constructorId: 'williams' },
  { position: '13', points: '54', wins: '0', driverId: 'ocon', driverName: 'Esteban Ocon', driverCode: 'OCO', driverNumber: '31', nationality: 'French', constructorName: 'Haas', constructorId: 'haas' },
  { position: '14', points: '42', wins: '0', driverId: 'tsunoda', driverName: 'Yuki Tsunoda', driverCode: 'TSU', driverNumber: '22', nationality: 'Japanese', constructorName: 'RB', constructorId: 'rb' },
  { position: '15', points: '28', wins: '0', driverId: 'bearman', driverName: 'Oliver Bearman', driverCode: 'BEA', driverNumber: '87', nationality: 'British', constructorName: 'Haas', constructorId: 'haas' },
  { position: '16', points: '21', wins: '0', driverId: 'lawson', driverName: 'Liam Lawson', driverCode: 'LAW', driverNumber: '30', nationality: 'New Zealander', constructorName: 'RB', constructorId: 'rb' },
  { position: '17', points: '14', wins: '0', driverId: 'doohan', driverName: 'Jack Doohan', driverCode: 'DOO', driverNumber: '61', nationality: 'Australian', constructorName: 'Alpine', constructorId: 'alpine' },
  { position: '18', points: '8', wins: '0', driverId: 'bortoleto', driverName: 'Gabriel Bortoleto', driverCode: 'BOR', driverNumber: '5', nationality: 'Brazilian', constructorName: 'Kick Sauber', constructorId: 'sauber' },
  { position: '19', points: '6', wins: '0', driverId: 'antonelli', driverName: 'Andrea Antonelli', driverCode: 'ANT', driverNumber: '12', nationality: 'Italian', constructorName: 'Mercedes', constructorId: 'mercedes' },
  { position: '20', points: '0', wins: '0', driverId: 'hadjar', driverName: 'Isack Hadjar', driverCode: 'HAD', driverNumber: '6', nationality: 'French', constructorName: 'RB', constructorId: 'rb' },
];

export const MOCK_CONSTRUCTOR_STANDINGS: ConstructorStanding[] = [
  { position: '1', points: '828', wins: '15', constructorId: 'mclaren', constructorName: 'McLaren', nationality: 'British' },
  { position: '2', points: '669', wins: '6', constructorId: 'ferrari', constructorName: 'Ferrari', nationality: 'Italian' },
  { position: '3', points: '614', wins: '4', constructorId: 'red_bull', constructorName: 'Red Bull', nationality: 'Austrian' },
  { position: '4', points: '412', wins: '1', constructorId: 'mercedes', constructorName: 'Mercedes', nationality: 'German' },
  { position: '5', points: '273', wins: '0', constructorId: 'aston_martin', constructorName: 'Aston Martin', nationality: 'British' },
  { position: '6', points: '209', wins: '0', constructorId: 'williams', constructorName: 'Williams', nationality: 'British' },
  { position: '7', points: '186', wins: '0', constructorId: 'alpine', constructorName: 'Alpine', nationality: 'French' },
  { position: '8', points: '96', wins: '0', constructorId: 'haas', constructorName: 'Haas', nationality: 'American' },
  { position: '9', points: '70', wins: '0', constructorId: 'rb', constructorName: 'RB', nationality: 'Italian' },
  { position: '10', points: '22', wins: '0', constructorId: 'sauber', constructorName: 'Kick Sauber', nationality: 'Swiss' },
];

export const MOCK_NEXT_RACE: RaceEvent = {
  round: '20',
  raceName: 'Singapore Grand Prix',
  circuitName: 'Marina Bay Street Circuit',
  country: 'Singapore',
  locality: 'Marina Bay',
  date: '2026-10-04',
  time: '13:00:00Z',
  season: '2026',
};

export const MOCK_SEASON_SUMMARY: SeasonSummary = {
  year: '2026',
  driverChampion: 'Lando Norris',
  driverChampionId: 'norris',
  constructorChampion: 'McLaren',
  constructorChampionId: 'mclaren',
  raceWinners: [
    { round: '1', raceName: 'Bahrain Grand Prix', circuitName: 'Bahrain International Circuit', driverName: 'Lando Norris', driverId: 'norris', constructorName: 'McLaren', constructorId: 'mclaren' },
    { round: '2', raceName: 'Saudi Arabian Grand Prix', circuitName: 'Jeddah Corniche Circuit', driverName: 'Max Verstappen', driverId: 'verstappen', constructorName: 'Red Bull', constructorId: 'red_bull' },
    { round: '3', raceName: 'Australian Grand Prix', circuitName: 'Albert Park Grand Prix Circuit', driverName: 'Oscar Piastri', driverId: 'piastri', constructorName: 'McLaren', constructorId: 'mclaren' },
    { round: '4', raceName: 'Japanese Grand Prix', circuitName: 'Suzuka Circuit', driverName: 'Max Verstappen', driverId: 'verstappen', constructorName: 'Red Bull', constructorId: 'red_bull' },
    { round: '5', raceName: 'Chinese Grand Prix', circuitName: 'Shanghai International Circuit', driverName: 'Lando Norris', driverId: 'norris', constructorName: 'McLaren', constructorId: 'mclaren' },
    { round: '6', raceName: 'Miami Grand Prix', circuitName: 'Miami International Autodrome', driverName: 'Oscar Piastri', driverId: 'piastri', constructorName: 'McLaren', constructorId: 'mclaren' },
    { round: '7', raceName: 'Emilia Romagna Grand Prix', circuitName: 'Autodromo Enzo e Dino Ferrari', driverName: 'Charles Leclerc', driverId: 'leclerc', constructorName: 'Ferrari', constructorId: 'ferrari' },
    { round: '8', raceName: 'Monaco Grand Prix', circuitName: 'Circuit de Monaco', driverName: 'Charles Leclerc', driverId: 'leclerc', constructorName: 'Ferrari', constructorId: 'ferrari' },
    { round: '9', raceName: 'Canadian Grand Prix', circuitName: 'Gilles Villeneuve Circuit', driverName: 'George Russell', driverId: 'russell', constructorName: 'Mercedes', constructorId: 'mercedes' },
    { round: '10', raceName: 'Spanish Grand Prix', circuitName: 'Circuit de Barcelona-Catalunya', driverName: 'Lando Norris', driverId: 'norris', constructorName: 'McLaren', constructorId: 'mclaren' },
    { round: '11', raceName: 'Austrian Grand Prix', circuitName: 'Red Bull Ring', driverName: 'Max Verstappen', driverId: 'verstappen', constructorName: 'Red Bull', constructorId: 'red_bull' },
    { round: '12', raceName: 'British Grand Prix', circuitName: 'Silverstone Circuit', driverName: 'Lewis Hamilton', driverId: 'hamilton', constructorName: 'Ferrari', constructorId: 'ferrari' },
    { round: '13', raceName: 'Belgian Grand Prix', circuitName: 'Circuit de Spa-Francorchamps', driverName: 'Oscar Piastri', driverId: 'piastri', constructorName: 'McLaren', constructorId: 'mclaren' },
    { round: '14', raceName: 'Hungarian Grand Prix', circuitName: 'Hungaroring', driverName: 'Lando Norris', driverId: 'norris', constructorName: 'McLaren', constructorId: 'mclaren' },
    { round: '15', raceName: 'Dutch Grand Prix', circuitName: 'Circuit Zandvoort', driverName: 'Max Verstappen', driverId: 'verstappen', constructorName: 'Red Bull', constructorId: 'red_bull' },
    { round: '16', raceName: 'Italian Grand Prix', circuitName: 'Autodromo Nazionale Monza', driverName: 'Oscar Piastri', driverId: 'piastri', constructorName: 'McLaren', constructorId: 'mclaren' },
  ],
};

export const MOCK_DRIVER_COMPARISONS: Record<string, DriverComparison> = {
  norris: { driverId: 'norris', driverName: 'Lando Norris', driverCode: 'NOR', points: 431, wins: 8, podiums: 14, position: 1, constructorName: 'McLaren', nationality: 'British' },
  piastri: { driverId: 'piastri', driverName: 'Oscar Piastri', driverCode: 'PIA', points: 397, wins: 7, podiums: 12, position: 2, constructorName: 'McLaren', nationality: 'Australian' },
  verstappen: { driverId: 'verstappen', driverName: 'Max Verstappen', driverCode: 'VER', points: 357, wins: 4, podiums: 11, position: 3, constructorName: 'Red Bull', nationality: 'Dutch' },
  leclerc: { driverId: 'leclerc', driverName: 'Charles Leclerc', driverCode: 'LEC', points: 312, wins: 2, podiums: 8, position: 4, constructorName: 'Ferrari', nationality: 'Monégasque' },
  hamilton: { driverId: 'hamilton', driverName: 'Lewis Hamilton', driverCode: 'HAM', points: 289, wins: 2, podiums: 7, position: 5, constructorName: 'Ferrari', nationality: 'British' },
  russell: { driverId: 'russell', driverName: 'George Russell', driverCode: 'RUS', points: 254, wins: 1, podiums: 5, position: 6, constructorName: 'Mercedes', nationality: 'British' },
  alonso: { driverId: 'alonso', driverName: 'Fernando Alonso', driverCode: 'ALO', points: 218, wins: 0, podiums: 3, position: 7, constructorName: 'Aston Martin', nationality: 'Spanish' },
  sainz: { driverId: 'sainz', driverName: 'Carlos Sainz', driverCode: 'SAI', points: 195, wins: 0, podiums: 2, position: 8, constructorName: 'Williams', nationality: 'Spanish' },
};
