import { writable } from 'svelte/store';

export interface MarsWeather {
  sol: string;
  terrestrialDate: string;
  minTemp: number;
  maxTemp: number;
  windSpeed: number;
}

export const articles = writable([]);
export const launches = writable([]);
export const weatherData = writable<MarsWeather[]>([]);
export const recentDataWeather = writable<MarsWeather[]>([]);
export const loading = writable(true);
export const error = writable<string | null>(null);

export async function fetchNews() {
    console.log("Fetching news...");
    loading.set(true);
    
    try {
      const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles/');
      console.log("Response received:", response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched data:", data);
      
      articles.set(data.results);
    } catch (err: unknown) {
      console.error('Error fetching news:', err);
      error.set(err instanceof Error ? err.message : String(err));
    } finally {
      console.log("Setting loading to false");
      loading.set(false);
    }
  }

export async function fetchLaunches() {
  try {
    const response = await fetch('https://fdo.rocketlaunch.live/json/launches/next/5');
    if (!response.ok) {
      throw new Error('Failed to fetch launches');
    }
    const data = await response.json();
    
    launches.set(
      data.result.sort(
        (a: any, b: any) => new Date(b.t0).getTime() - new Date(a.t0).getTime()
      )
    );
  } catch (err: unknown) {
    console.error('Error fetching launches:', err);
    error.set(err instanceof Error ? err.message : String(err));
  } finally {
    loading.set(false);
  }
}

export async function fetchMarsWeather() {
  try {
    const response = await fetch('https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json');
    if (!response.ok) {
      throw new Error('Failed to fetch Mars weather data');
    }
    const data = await response.json();
    const reports = data.soles;
    
    const parsedWeather = reports.map((report: any) => ({
      sol: report.sol,
      terrestrialDate: report.terrestrial_date,
      minTemp: report.min_temp || 0,
      maxTemp: report.max_temp || 0,
      windSpeed: report.wind_speed || 0,
    }));

    weatherData.set(parsedWeather);
    recentDataWeather.set(parsedWeather.slice(0, 4));
  } catch (err: unknown) {
    console.error('Error fetching Mars weather:', err);
    error.set(err instanceof Error ? err.message : String(err));
  } finally {
    loading.set(false);
  }
}
