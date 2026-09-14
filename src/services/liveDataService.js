/**
 * Live Data Service per PM-ESG Dashboard
 * Connette API pubbliche reali per il territorio di Pisa (Lat: 43.7167, Lng: 10.4000)
 * e applica coefficienti ufficiali ISPRA / EEA.
 */

// Coordinate geografiche del centro di Pisa
export const PISA_COORDINATES = {
  lat: 43.7167,
  lng: 10.4000,
  city: 'Pisa',
  region: 'Toscana'
};

// Coefficienti Ufficiali di Calcolo ESG (Fonti: ISPRA / EEA)
export const ESG_FACTORS = {
  co2KgPerKmCar: 0.135,       // kg CO2 per km per auto media in Italia (ISPRA 2025)
  co2KgPerLiterGasoline: 2.31, // kg CO2 per litro di benzina
  treeCo2KgPerYear: 20.0,     // kg CO2 assorbiti in media da un albero urbano/anno (EEA)
  eurCostPerKmCar: 0.22,      // Costo medio chilometrico ACI (carburante + usura)
  pisaPopulation: 90000,      // Popolazione residente Pisa + ~45.000 studenti fuori sede
};

export { fetchPisaAirQuality, getAqiLabel } from './liveAirQualityService';

/**
 * Fetch dati meteo reali a Pisa
 * Se l'API fallisce o è offline, restituisce null per i valori numerici e lastSuccessTime.
 */
export async function fetchPisaWeather(previousSuccessTime = null) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${PISA_COORDINATES.lat}&longitude=${PISA_COORDINATES.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=Europe%2FRome`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();

    const current = data.current || {};
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

    return {
      success: true,
      source: 'Open-Meteo Forecast Pisa Real-Time',
      endpoint: url,
      timestamp: now.toISOString(),
      lastSuccessTime: `ore ${formattedTime}`,
      temperature: current.temperature_2m !== undefined && current.temperature_2m !== null ? Number(current.temperature_2m) : null,
      humidity: current.relative_humidity_2m !== undefined && current.relative_humidity_2m !== null ? Number(current.relative_humidity_2m) : null,
      precipitation: current.precipitation !== undefined && current.precipitation !== null ? Number(current.precipitation) : null,
      windSpeed: current.wind_speed_10m !== undefined && current.wind_speed_10m !== null ? Number(current.wind_speed_10m) : null,
      condition: current.weather_code != null ? getWeatherDescription(current.weather_code) : 'n/d',
      isLive: true
    };
  } catch (error) {
    console.warn('Open-Meteo Forecast offline/non raggiungibile:', error);
    return {
      success: false,
      source: 'Open-Meteo Forecast (Offline)',
      endpoint: url,
      timestamp: null,
      lastSuccessTime: previousSuccessTime || null,
      temperature: null,
      humidity: null,
      precipitation: null,
      windSpeed: null,
      condition: 'n/d',
      isLive: false,
      error: error.message
    };
  }
}

function getWeatherDescription(code) {
  if (code === 0) return 'Cielo Sereno';
  if (code === 1 || code === 2) return 'Poco Nuvoloso';
  if (code === 3) return 'Coperto';
  if (code >= 51 && code <= 67) return 'Pioggia / Pioviggine';
  if (code >= 80 && code <= 82) return 'Rovesci';
  if (code >= 95) return 'Temporale';
  return 'Variabile';
}
