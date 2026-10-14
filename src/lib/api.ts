import type {
  DriverStanding,
  ConstructorStanding,
  RaceEvent,
  SeasonSummary,
  DriverComparison,
} from '@/types/f1';
import {
  MOCK_DRIVER_STANDINGS,
  MOCK_CONSTRUCTOR_STANDINGS,
  MOCK_NEXT_RACE,
  MOCK_SEASON_SUMMARY,
  MOCK_DRIVER_COMPARISONS,
} from '@/lib/mockData';

const API_BASE = 'https://api.jolpi.ca/ergast/f1';

const CURRENT_YEAR = new Date().getFullYear().toString();

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

export async function getDriverStandings(
  year: string = CURRENT_YEAR
): Promise<DriverStanding[]> {
  try {
    const data = await fetchJSON<any>(
      `${API_BASE}/${year}/driverStandings.json`
    );
    const standings =
      data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings;
    if (!standings || standings.length === 0) throw new Error('No data');
    return standings.map((d: any): DriverStanding => ({
      position: d.position,
      points: d.points,
      wins: d.wins,
      driverId: d.Driver.driverId,
      driverName: `${d.Driver.givenName} ${d.Driver.familyName}`,
      driverCode: d.Driver.code || d.Driver.driverId.slice(0, 3).toUpperCase(),
      driverNumber: d.Driver.permanentNumber || '0',
      nationality: d.Driver.nationality,
      constructorName: d.Constructors?.[0]?.name || 'Unknown',
      constructorId: d.Constructors?.[0]?.constructorId || 'unknown',
    }));
  } catch {
    return MOCK_DRIVER_STANDINGS;
  }
}

export async function getConstructorStandings(
  year: string = CURRENT_YEAR
): Promise<ConstructorStanding[]> {
  try {
    const data = await fetchJSON<any>(
      `${API_BASE}/${year}/constructorStandings.json`
    );
    const standings =
      data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings;
    if (!standings || standings.length === 0) throw new Error('No data');
    return standings.map((c: any): ConstructorStanding => ({
      position: c.position,
      points: c.points,
      wins: c.wins,
      constructorId: c.Constructor.constructorId,
      constructorName: c.Constructor.name,
      nationality: c.Constructor.nationality,
    }));
  } catch {
    return MOCK_CONSTRUCTOR_STANDINGS;
  }
}

export async function getNextRace(): Promise<RaceEvent | null> {
  try {
    const data = await fetchJSON<any>(`${API_BASE}/${CURRENT_YEAR}.json`);
    const races = data?.MRData?.RaceTable?.Races;
    if (!races || races.length === 0) throw new Error('No data');
    const now = new Date();
    const upcoming = races.find((r: any) => new Date(`${r.date}T${r.time}`) > now);
    const race = upcoming || races[races.length - 1];
    return {
      round: race.round,
      raceName: race.raceName,
      circuitName: race.Circuit.circuitName,
      country: race.Circuit.Location.country,
      locality: race.Circuit.Location.locality,
      date: race.date,
      time: race.time,
      season: race.season,
    };
  } catch {
    return MOCK_NEXT_RACE;
  }
}

export async function getSeasonSummary(year: string): Promise<SeasonSummary> {
  try {
    const [standingsRes, constructorRes, resultsRes] = await Promise.all([
      fetchJSON<any>(`${API_BASE}/${year}/driverStandings.json`),
      fetchJSON<any>(`${API_BASE}/${year}/constructorStandings.json`),
      fetchJSON<any>(`${API_BASE}/${year}/results/1,24.json`),
    ]);

    const driverStandings =
      standingsRes?.MRData?.StandingsTable?.StandingsLists?.[0]
        ?.DriverStandings;
    const constructorStandings =
      constructorRes?.MRData?.StandingsTable?.StandingsLists?.[0]
        ?.ConstructorStandings;
    const results = resultsRes?.MRData?.RaceTable?.Races;

    if (!driverStandings || !constructorStandings || !results)
      throw new Error('No data');

    const driverChampion = driverStandings[0];
    const constructorChampion = constructorStandings[0];

    const raceWinners = results.map((r: any) => ({
      round: r.round,
      raceName: r.raceName,
      circuitName: r.Circuit.circuitName,
      driverName: `${r.Results[0].Driver.givenName} ${r.Results[0].Driver.familyName}`,
      driverId: r.Results[0].Driver.driverId,
      constructorName: r.Results[0].Constructor.name,
      constructorId: r.Results[0].Constructor.constructorId,
    }));

    return {
      year,
      driverChampion: `${driverChampion.Driver.givenName} ${driverChampion.Driver.familyName}`,
      driverChampionId: driverChampion.Driver.driverId,
      constructorChampion: constructorChampion.Constructor.name,
      constructorChampionId: constructorChampion.Constructor.constructorId,
      raceWinners,
    };
  } catch {
    return { ...MOCK_SEASON_SUMMARY, year };
  }
}

export async function getDriverComparison(
  driverId: string
): Promise<DriverComparison | null> {
  try {
    const data = await fetchJSON<any>(
      `${API_BASE}/${CURRENT_YEAR}/driverStandings.json`
    );
    const standings =
      data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings;
    if (!standings) throw new Error('No data');

    const driver = standings.find((d: any) => d.Driver.driverId === driverId);
    if (!driver) throw new Error('Driver not found');

    const podiums = await getDriverPodiums(driverId);

    return {
      driverId,
      driverName: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
      driverCode: driver.Driver.code || driverId.slice(0, 3).toUpperCase(),
      points: parseInt(driver.points, 10),
      wins: parseInt(driver.wins, 10),
      podiums,
      position: parseInt(driver.position, 10),
      constructorName: driver.Constructors?.[0]?.name || 'Unknown',
      nationality: driver.Driver.nationality,
    };
  } catch {
    return MOCK_DRIVER_COMPARISONS[driverId] || null;
  }
}

async function getDriverPodiums(driverId: string): Promise<number> {
  try {
    const data = await fetchJSON<any>(
      `${API_BASE}/${CURRENT_YEAR}/results/1,24.json`
    );
    const races = data?.MRData?.RaceTable?.Races;
    if (!races) throw new Error('No data');
    let count = 0;
    for (const race of races) {
      for (const result of race.Results) {
        if (result.Driver.driverId === driverId && parseInt(result.position, 10) <= 3) {
          count++;
        }
      }
    }
    return count;
  } catch {
    return 0;
  }
}

export async function getCurrentDrivers(): Promise<
  { id: string; name: string; code: string }[]
> {
  try {
    const data = await fetchJSON<any>(
      `${API_BASE}/${CURRENT_YEAR}/driverStandings.json`
    );
    const standings =
      data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings;
    if (!standings) throw new Error('No data');
    return standings.map((d: any) => ({
      id: d.Driver.driverId,
      name: `${d.Driver.givenName} ${d.Driver.familyName}`,
      code: d.Driver.code || d.Driver.driverId.slice(0, 3).toUpperCase(),
    }));
  } catch {
    return MOCK_DRIVER_STANDINGS.map((d) => ({
      id: d.driverId,
      name: d.driverName,
      code: d.driverCode,
    }));
  }
}
