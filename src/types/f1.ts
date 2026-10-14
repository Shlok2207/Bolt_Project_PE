export interface DriverStanding {
  position: string;
  points: string;
  wins: string;
  driverId: string;
  driverName: string;
  driverCode: string;
  driverNumber: string;
  nationality: string;
  constructorName: string;
  constructorId: string;
}

export interface ConstructorStanding {
  position: string;
  points: string;
  wins: string;
  constructorId: string;
  constructorName: string;
  nationality: string;
}

export interface RaceEvent {
  round: string;
  raceName: string;
  circuitName: string;
  country: string;
  locality: string;
  date: string;
  time: string;
  season: string;
}

export interface SeasonSummary {
  year: string;
  driverChampion: string;
  driverChampionId: string;
  constructorChampion: string;
  constructorChampionId: string;
  raceWinners: RaceWinner[];
}

export interface RaceWinner {
  round: string;
  raceName: string;
  circuitName: string;
  driverName: string;
  driverId: string;
  constructorName: string;
  constructorId: string;
}

export interface DriverComparison {
  driverId: string;
  driverName: string;
  driverCode: string;
  points: number;
  wins: number;
  podiums: number;
  position: number;
  constructorName: string;
  nationality: string;
}

export type TabKey = 'grid' | 'archive' | 'academy' | 'headtohead';
