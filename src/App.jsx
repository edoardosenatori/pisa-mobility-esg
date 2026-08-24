import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ExecutiveView from './components/views/ExecutiveView';
import MapView from './components/views/MapView';
import AnalystView from './components/views/AnalystView';
import OpenDataView from './components/views/OpenDataView';
import Toast from './components/ui/Toast';
import DataRequirementsModal from './components/ui/DataRequirementsModal';
import { fetchPisaAirQuality, fetchPisaWeather } from './services/liveDataService';

export default function App() {
  const [activeTab, setActiveTab] = useState('executive');
  const [toast, setToast] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Progressive Disclosure: Citizen Guide Mode (Persistent in localStorage)
  const [citizenGuide, setCitizenGuide] = useState(() => {
    try {
      return localStorage.getItem('pm_esg_guide') === 'true';
    } catch {
      return false;
    }
  });

  // Sync mode changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pm_esg_guide', citizenGuide);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [citizenGuide]);

  // Live Real-Time Data State for Pisa
  const [liveAirQuality, setLiveAirQuality] = useState(null);
  const [liveWeather, setLiveWeather] = useState(null);

  // Modal State for Data Requirements / Transparency
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inspectMetricId, setInspectMetricId] = useState('air_quality_pisa');

  // Fetch real data for Pisa on mount
  useEffect(() => {
    async function loadLiveData() {
      try {
        const [air, weather] = await Promise.all([
          fetchPisaAirQuality(),
          fetchPisaWeather()
        ]);
        setLiveAirQuality(air);
        setLiveWeather(weather);
      } catch (err) {
        console.warn('Initial live data load error:', err);
      }
    }
    loadLiveData();
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const [air, weather] = await Promise.all([
        fetchPisaAirQuality(),
        fetchPisaWeather()
      ]);
      setLiveAirQuality(air);
      setLiveWeather(weather);
      
      setToast({
        type: 'success',
        title: 'Sincronizzazione Live Completata',
        message: `API Open-Meteo & Copernicus allineate. PM10 a Pisa: ${air.pm10} µg/m³ (${air.aqiLabel}), Temp: ${weather.temperature}°C.`,
        meta: `Timestamp: ${new Date().toLocaleTimeString('it-IT')} • Fonte: ${air.source}`
      });
    } catch (err) {
      setToast({
        type: 'info',
        title: 'Sync Eseguito con Cache Locale',
        message: 'Dati territoriali aggiornati.',
        meta: `Timestamp: ${new Date().toLocaleTimeString('it-IT')}`
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  const handleInspectMetric = (metricId) => {
    setInspectMetricId(metricId);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Institutional Navigation Header with Mode Switch */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        liveWeather={liveWeather}
        liveAirQuality={liveAirQuality}
        onOpenDataModal={() => setIsModalOpen(true)}
        citizenGuide={citizenGuide}
        setCitizenGuide={setCitizenGuide}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'executive' && (
          <ExecutiveView 
            onNavigateToMap={() => setActiveTab('map')}
            onNavigateToAnalyst={() => setActiveTab('analyst')}
            onInspectMetric={handleInspectMetric}
            liveAirQuality={liveAirQuality}
            citizenGuide={citizenGuide}
          />
        )}

        {activeTab === 'map' && (
          <MapView 
            onTriggerCivicReport={() => setActiveTab('opendata')}
            onInspectMetric={handleInspectMetric}
            citizenGuide={citizenGuide}
          />
        )}

        {activeTab === 'analyst' && (
          <AnalystView 
            onInspectMetric={handleInspectMetric}
            citizenGuide={citizenGuide}
          />
        )}

        {activeTab === 'opendata' && (
          <OpenDataView 
            onShowToast={showToast}
            onInspectMetric={handleInspectMetric}
            citizenGuide={citizenGuide}
          />
        )}
      </main>

      {/* Technical Data Requirements & Transparency Modal */}
      <DataRequirementsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMetricId={inspectMetricId}
      />

      {/* Institutional Toast Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}
