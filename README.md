# Pisa Mobility & ESG Data Dashboard (PM-ESG) 🚲🌱🏛️

> **Cruscotto istituzionale per il monitoraggio e la trasparenza degli impatti della mobilità sostenibile - Comune di Pisa**
> Conforme al Piano Urbano della Mobilità Sostenibile (PUMS 2020-2030) e alle linee guida di accessibilità **WCAG 2.1 Livello AA**.

---

## 🌟 Caratteristiche Principali

1. **Header Istituzionale**: Brand del Comune di Pisa con Croce Pisana, orologio e data in tempo reale, dati live meteo e qualità dell'aria (PM10/PM2.5), pulsante di sincronizzazione IoT.
2. **Vista Executive (4 Dimensioni ESG)**:
   - Card interattive per *Environmental*, *Social*, *Economic*, *Governance* con badge semaforici colorati (`#10B981`, `#F59E0B`, `#EF4444`).
   - Grafico a 12 mesi per CO₂ evitata vs Target PUMS e Quota Mobilità Dolce %.
   - 5 Barre di avanzamento per gli obiettivi comunali al 2026.
3. **Vista Mappa Territoriale (GIS & IoT)**:
   - Mappa interattiva Leaflet centrata sull'Asse Pilota di Pisa (*Stazione FS ➔ Corso Italia ➔ Ponte di Mezzo ➔ Polo Fibonacci ➔ Piazza dei Miracoli*).
   - Toggle per layer Ciclopiste (OSM), Stalli Bike Sharing Ciclopi con alert di saturazione/esaurimento e Banchine TPL conformi PEBA.
   - Pannello Ispettore POI al click sui nodi.
4. **Vista Analyst (Correlazioni Bivariate)**:
   - Filtri per segmento utente (*Studenti*, *Turisti*, *Pendolari*, *Tutti*) e orizzonte temporale.
   - Grafico bivariato Recharts: Passaggi orari bici vs Saturazione bus LAM TPL con overlay velocità commerciale.
5. **Vista Open Data & Crowdsourcing Civico**:
   - Contatori divulgativi per la cittadinanza (Alberi equivalenti, km puliti, carburante ed economia risparmiati).
   - Tabella di trasparenza con specifiche tecniche e requisiti per ciascun flusso dati.
   - Tabella Open Data con download reale in **CSV** e **JSON**.
   - Form di segnalazione civica funzionante con memorizzazione persistente nel browser ed emissione protocollo telematico (`PROT-MOB-2026/XXX`).

---

## 🛠️ Stack Tecnologico

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS (Palette: Navy `#1E3A8A`, Emerald `#059669`, Slate `#64748B`, Rosso Pisano `#C41230`)
- **Icone**: Lucide React
- **Grafici**: Recharts
- **Cartografia**: Leaflet con base tiles CartoDB Positron / OSM
- **API Live Integrate**: Open-Meteo Air Quality & Forecast (Stazione Pisa)
- **Modelli di Calcolo**: Fattori ufficiali ISPRA / Agenzia Europea dell'Ambiente (EEA)

---

## 🚀 Installazione ed Esecuzione Locale

```bash
# 1. Clona il repository
git clone <URL_DEL_TUO_REPOSITORY>
cd pm-esg-dashboard

# 2. Installa le dipendenze
npm install

# 3. Avvia il server di sviluppo
npm run dev
```
L'applicazione sarà attiva su `http://localhost:3000/`.

---

## 🌐 Deploy Gratuito Online (1-Click)

### Opzione 1: Vercel (Consigliata)
1. Crea un account gratuito su [Vercel.com](https://vercel.com).
2. Collega il tuo repository GitHub: Vercel rileverà automaticamente Vite e farà il deploy in 30 secondi.
3. Otterrai un URL pubblico HTTPS tipo: `https://pisa-pm-esg.vercel.app`

### Opzione 2: Netlify
1. Crea un account gratuito su [Netlify.com](https://netlify.com).
2. Importa il repository GitHub. Imposta Build Command: `npm run build` e Publish directory: `dist`.
3. Otterrai un URL pubblico HTTPS tipo: `https://pisa-pm-esg.netlify.app`

### Opzione 3: GitHub Pages
1. Aggiungi `"homepage": "https://<tuo-username>.github.io/pm-esg-dashboard"` in `package.json`.
2. Esegui `npm install -D gh-pages` e usa il workflow GitHub Actions per deploy automatico.
