/**
 * Live Air Quality Service per PM-ESG Dashboard (Comune di Pisa)
 * Fonte: Open-Meteo Air Quality & Copernicus CAMS
 * Lat: 43.7167, Lng: 10.4000
 */

export const PISA_COORDINATES = {
  lat: 43.7167,
  lng: 10.4000,
  city: 'Pisa',
  region: 'Toscana'
};

/**
 * Fetch dati reali sulla qualità dell'aria a Pisa da Open-Meteo / Copernicus CAMS
 * Mappa esplicitamente: current.pm10, current.pm2_5, current.nitrogen_dioxide.
 * Elimina qualsiasi fallback fittizio: restituisce null e lastSuccessTime / 'n/d' se offline.
 */
export async function fetchPisaAirQuality(previousSuccessTime = null) {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${PISA_COORDINATES.lat}&longitude=${PISA_COORDINATES.lng}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,european_aqi&hourly=pm10,pm2_5&timezone=Europe%2FRome`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();

    const current = data.current || {};
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

    return {
      success: true,
      source: 'Open-Meteo / Copernicus CAMS (Stazione Pisa)',
      endpoint: url,
      timestamp: now.toISOString(),
      lastSuccessTime: `ore ${formattedTime}`,
      pm10: current.pm10 !== undefined && current.pm10 !== null ? Number(current.pm10) : null,
      pm2_5: current.pm2_5 !== undefined && current.pm2_5 !== null ? Number(current.pm2_5) : null,
      no2: current.nitrogen_dioxide !== undefined && current.nitrogen_dioxide !== null ? Number(current.nitrogen_dioxide) : null,
      co: current.carbon_monoxide !== undefined && current.carbon_monoxide !== null ? Number(current.carbon_monoxide) : null,
      aqi: current.european_aqi !== undefined && current.european_aqi !== null ? current.european_aqi : null,
      aqiLabel: current.european_aqi != null ? getAqiLabel(current.european_aqi) : 'n/d',
      isLive: true
    };
  } catch (error) {
    console.warn('Open-Meteo Air Quality offline/non raggiungibile:', error);
    return {
      success: false,
      source: 'Open-Meteo / Copernicus CAMS (Offline)',
      endpoint: url,
      timestamp: null,
      lastSuccessTime: previousSuccessTime || null,
      pm10: null,
      pm2_5: null,
      no2: null,
      co: null,
      aqi: null,
      aqiLabel: 'n/d',
      isLive: false,
      error: error.message
    };
  }
}

export function getAqiLabel(aqi) {
  if (aqi == null) return 'n/d';
  if (aqi <= 20) return 'Eccellente';
  if (aqi <= 40) return 'Buona';
  if (aqi <= 60) return 'Moderata';
  if (aqi <= 80) return 'Scadente';
  return 'Critica';
}
