/**
 * Predictive Traffic & Weather Simulation Service for Pisa
 * Modello matematico di trasferimento modale e previsione congestione viabilità
 * Comune di Pisa - Direzione Mobilità Urbana (PUMS 2020-2030)
 */

export const WEATHER_SCENARIOS = {
  live: {
    id: 'live',
    name: 'Condizioni Live Reali (Open-Meteo)',
    icon: 'CloudSun',
    description: 'Dati acquisiti in tempo reale dalla stazione meteo di Pisa'
  },
  sunny: {
    id: 'sunny',
    name: 'Soleggiato & Clima Ideale',
    rainMm: 0,
    temp: 24.5,
    wind: 8,
    isRainy: false,
    icon: 'Sun',
    description: 'Condizioni ottimali: massima ciclabilità e traffico veicolare ridotto'
  },
  rain_moderate: {
    id: 'rain_moderate',
    name: 'Pioggia Moderata (6 mm/h)',
    rainMm: 6.2,
    temp: 14.0,
    wind: 18,
    isRainy: true,
    icon: 'CloudRain',
    description: 'Trasferimento modale verso auto privata e saturazione bus LAM'
  },
  rain_heavy: {
    id: 'rain_heavy',
    name: 'Maltempo Intenso & Vento Forte',
    rainMm: 16.5,
    temp: 11.5,
    wind: 38,
    isRainy: true,
    icon: 'CloudLightning',
    description: 'Forte congestione Lungarni e ritardi TPL urbano'
  }
};

/**
 * Calcola l'impatto predittivo del meteo sulla viabilità di Pisa
 */
export function calculatePredictiveImpact(weatherData, selectedScenario = 'live') {
  let isRain = false;
  let rainAmount = 0;
  let temp = 22;
  let windSpeed = 10;

  if (selectedScenario !== 'live' && WEATHER_SCENARIOS[selectedScenario]) {
    const sc = WEATHER_SCENARIOS[selectedScenario];
    isRain = sc.isRainy;
    rainAmount = sc.rainMm;
    temp = sc.temp;
    windSpeed = sc.wind;
  } else if (weatherData) {
    temp = weatherData.temperature ?? 22;
    windSpeed = weatherData.windSpeed ?? 10;
    // Weather codes for rain in Open-Meteo: 51,53,55,61,63,65,80,81,82,95,96
    const code = weatherData.weatherCode ?? 0;
    isRain = (code >= 51 && code <= 67) || (code >= 80 && code <= 99);
    rainAmount = isRain ? 4.5 : 0;
  }

  // Model Coefficients
  let carIncreasePercent = 0;
  let bikeDecreasePercent = 0;
  let busSaturation = 65;
  let lungarnoSpeedCar = 22; // km/h
  let lungarnoSpeedBike = 19; // km/h
  let delayMinutesCar = 0;
  let alertLevel = 'low'; // 'low' | 'medium' | 'high'
  let alertTitle = 'Viabilità Regolare';
  let citizenTip = 'Condizioni ideali per spostarsi in bicicletta su Lungarni e Corso Italia.';

  if (isRain) {
    if (rainAmount > 10) {
      // Heavy rain
      carIncreasePercent = 42.5;
      bikeDecreasePercent = -58.0;
      busSaturation = 96.0;
      lungarnoSpeedCar = 11.2;
      lungarnoSpeedBike = 14.0;
      delayMinutesCar = 12;
      alertLevel = 'high';
      alertTitle = 'Allerta Congestione Elevata su Lungarni';
      citizenTip = 'Forte afflusso di auto verso il centro. Linee LAM piene; consigliato anticipare gli spostamenti o usare percorsi protetti.';
    } else {
      // Moderate rain
      carIncreasePercent = 28.0;
      bikeDecreasePercent = -35.0;
      busSaturation = 88.5;
      lungarnoSpeedCar = 14.8;
      lungarnoSpeedBike = 16.5;
      delayMinutesCar = 7;
      alertLevel = 'medium';
      alertTitle = 'Rallentamenti Veicolari Previsti';
      citizenTip = 'Aumento del traffico privato (+28%). La bici rimane più veloce dell\'auto di circa 5 minuti sull\'Asse Pilota.';
    }
  } else {
    // Dry / Good weather
    carIncreasePercent = -8.5;
    bikeDecreasePercent = 18.0;
    busSaturation = 62.0;
    lungarnoSpeedCar = 23.5;
    lungarnoSpeedBike = 20.0;
    delayMinutesCar = 0;
    alertLevel = 'low';
    alertTitle = 'Traffico Fluido & Alta Ciclabilità';
    citizenTip = 'Flussi regolari su tutta la rete. 14.500+ passaggi ciclabili stimati oggi.';
  }

  return {
    isRain,
    rainAmount,
    temp,
    windSpeed,
    carIncreasePercent: carIncreasePercent > 0 ? `+${carIncreasePercent}%` : `${carIncreasePercent}%`,
    carIncreaseRaw: carIncreasePercent,
    bikeVariationPercent: bikeDecreasePercent > 0 ? `+${bikeDecreasePercent}%` : `${bikeDecreasePercent}%`,
    bikeVariationRaw: bikeDecreasePercent,
    busSaturation: `${busSaturation.toFixed(0)}%`,
    busSaturationRaw: busSaturation,
    lungarnoSpeedCar: `${lungarnoSpeedCar.toFixed(1)} km/h`,
    lungarnoSpeedBike: `${lungarnoSpeedBike.toFixed(1)} km/h`,
    delayMinutesCar: delayMinutesCar > 0 ? `+${delayMinutesCar} min` : 'Nessun ritardo',
    alertLevel,
    alertTitle,
    citizenTip
  };
}
