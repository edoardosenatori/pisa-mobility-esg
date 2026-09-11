# 📑 PM-ESG: MASTER PROJECT CONTEXT, PRD & ROADMAP
## Pisa Mobility & ESG Data Dashboard — Guida di Contesto per Agenti AI & Sviluppatori

> **A CHI È RIVOLTO QUESTO DOCUMENTO**:  
> Questo file è la **fonte di verità assoluta** del progetto per qualsiasi assistente AI (Antigravity IDE, Claude Code, Grok, Gemini) e per i membri del team di sviluppo.  
> Leggendo questo documento, l'AI comprende immediatamente: identità, committenza, mission, vision, valori, storico evolutivo, architettura, stato dell'arte attuale, gap analysis tecnica e l'elenco prioritario delle task da eseguire.

---

## 1. 🏛️ IDENTITÀ, SCOPO, MISSION, VISION E VALORI

### 1.1 Descrizione dell'Applicazione
**PM-ESG** (*Pisa Mobility & ESG Data Dashboard*) è la piattaforma web istituzionale progettata per monitorare, modellizzare e rendicontare in tempo reale gli impatti ambientali, sociali, economici e di governance della mobilità urbana nel **Comune di Pisa**.

### 1.2 Committenza & Quadro Istituzionale
* **Ente Committente**: **Comune di Pisa** — *Direzione Mobilità Urbana, Transizione Ecologica e Smart City*.
* **Gestore Operativo**: **Pisamo S.r.l.** (*Azienda per la mobilità urbana del Comune di Pisa*).
* **Quadro Programmatico**:
  - **PUMS Pisa 2020-2030**: Piano Urbano della Mobilità Sostenibile (Delibera di Consiglio n. 19/2021).
  - **PNRR Missione 2 Componente 2**: Transizione Ecologica e Mobilità Dolce (investimenti in piste ciclabili, TPL elettrico e monitoraggio emissioni).
  - **Standard Internazionali**: Standard di sostenibilità urbana **ISO 37122** (Indicatori Smart City) e **GRI (Global Reporting Initiative)**.
  - **Fondi Nazionali**: Criteri di idoneità per bandi ministeriali **MASE** (>8,8 M€ per mobilità attiva).

### 1.3 Mission
Fornire all'amministrazione comunale uno strumento decisionale basato su dati oggettivi (Data-Driven Decision Making) e contemporaneamente offrire ai cittadini e agli studenti universitari una finestra trasparente per comprendere i benefici concreti della mobilità sostenibile a Pisa.

### 1.4 Vision
Evolvere da cruscotto di monitoraggio dell'Asse Pilota iniziale a **Gemello Digitale della Mobilità Urbana (Digital Mobility Twin)** per tutta l'area vasta pisana, integrando sensori IoT Edge AI, flussi TPL in tempo reale e partecipazione civica attiva.

### 1.5 Valori Fondamentali
1. **Trasparenza e Onestà Metodologica**: Distinzione cristallina tra dati *Live*, *Calcolati da modelli scientifici* e *Virtuali da atti amministrativi*. Nessun numero finto spacciato per sensore reale.
2. **Accessibilità e Inclusione (PEBA)**: Attenzione primaria alle utenze deboli, persone con disabilità e studenti fuorisede (Piano per l'Eliminazione delle Barriere Architettoniche).
3. **Rigore Scientifico**: Utilizzo esclusivo di fattori emissivi ufficiali (ISPRA) e parametri di costo chilometrico certificati (ACI).
4. **Privacy by Design (GDPR)**: Elaborazione delle immagini esclusivamente a bordo macchina (Edge AI) in memoria volatile, senza salvataggio o streaming cloud di volti o targhe, con validazione DPO.

---

## 2. 👥 REGISTRO TEAM & PROTOCOLLO DI COLLABORAZIONE

Il progetto è sviluppato da un team distribuito con branch dedicati:

| Collaboratore | Ambiente AI | Branching Convention |
| :--- | :--- | :--- |
| **Edoardo** (Lead Architect) | **Antigravity** (Google DeepMind) | `feature/edoardo-[task]` o merge release `main` |
| **Julian** | **Claude Code** (Anthropic) | `feature/julian-[task]` |
| **Iacopo** | **Grok** (xAI) | `feature/iacopo-[task]` |

* **Branch `main`**: Rilasciato e agganciato alla CI/CD di Vercel: 👉 **`https://pisa-mobility-esg.vercel.app/`**.
* **Branching Rule**: Prima di qualsiasi modifica, aggiornare con `git fetch --all --prune` e creare un branch isolato `feature/[nome]-[task]`. Non pushare mai codice che non superi `npm run build` con 0 errori.

---

## 3. 📜 STORICO DELL'EVOLUZIONE DELL'APP

* **v1.0 (Proof of Concept)**: Prime card mockup con statistiche statiche e grafica iniziale in React/Vite.
* **v2.0 (Geospatial & Asse Pilota)**: Integrazione Leaflet GIS con il tracciato dell'Asse Pilota di 6,5 km (*Stazione FS ➔ Corso Italia ➔ Ponte di Mezzo ➔ Polo Fibonacci ➔ Piazza dei Miracoli*), snappato su nodi OSM reali. Aggiunta layer stalli Ciclopi e banchine PEBA.
* **v2.5 (Matrice ESG & Progressive Disclosure)**: Introduzione delle 4 dimensioni ESG (*Environmental, Social, Economic, Governance*), switch "Guida alla Lettura (Cittadini)" per tradurre le metriche tecniche, componente universale `InfoTooltip` con rilevamento bordi dello schermo.
* **v3.0 (Smart City & Prediction Release)**:
  - 🤖 **Simulatore Predittivo AI Meteo-Traffico**: Algoritmo bivariato per stimare l'impatto di pioggia e allerta sui Lungarni (+28% / +42%) e linee LAM.
  - 🌱 **Eco-Calculator per Cittadini/Studenti**: Calcolo risparmio economico (€/anno ACI) e CO₂ evitata (ISPRA) per le tratte pisane.
  - 📑 **Report Esecutivo A4 per la Giunta**: Modale con print CSS vettoriale A4, stemma del Comune e timbro PNRR.
  - 🔗 **Registro Trasparenza Certificato**: Link ufficiali HTTP 200 verso ISPRA `fetransp.isprambiente.it`, ACI, PUMS Tages, PisaMo, Open-Meteo.
  - 🎯 **Onboarding Tour a 7 Step**: Maschera SVG Cutout che mantiene nitido al 100% l'elemento bersaglio.
  - 🎨 **Canva Connect API (Automazione Esterna)**: Script Python OAuth 2.0 PKCE che genera presentazioni modificabili native a 9 slide 16:9 (`.pptx` ➔ Canva).

---

## 4. 🔍 GAP ANALYSIS & STATO DELL'ARTE (Audit 10 Settembre 2026)

Dall'audit tecnico condotto sui file di revisione (`cose_da_sistemare_pm_esg (2).md` e `commenti .docx`), emergono le seguenti discrepanze tra la documentazione ideale e il sito live:

1. **Tour Onboarding Invasivo**: Al primo caricamento parte da solo al centro coprendo l'header e i KPI. Deve essere **disattivato di default** e aprirsi solo su clic dell'utente.
2. **Etichettatura Inquinanti**: Viene mostrato `PM10: 2.5 µg/m³` (che è un valore da PM2.5). Mancava la distinzione rigorosa tra PM10, PM2.5 e NO₂.
3. **Fallback Hardcoded Silenzioso**: Se Open-Meteo fallisce, restano hardcoded `24.5°C` e `18.2 µg/m³`. Serve lo stato "n/d" e l'orario dell'ultimo aggiornamento valido.
4. **Header Sovraccarico e Testi Spezzati**: A risoluzioni medie le scritte "Comune di / Pisa" e "PUMS 2020- / 2030" vanno a capo in modo sgradevole. Rimuovere il claim prematuro "WCAG 2.1 AA".
5. **Overclaiming Dati IoT**: Spacciare serie simulate per "sensori IoT vivi". Ogni numero deve mostrare esplicitamente se è *Live*, *Calcolato (ISPRA/ACI)* o *Modello PUMS (Virtuale)*.
6. **Form PEBA & Protocollo**: Il codice `PROT-MOB-2026/XXX` salvato in `localStorage` sembra un atto amministrativo vero. Va anteposto il prefisso `DEMO-` con disclaimer informativo.
7. **Terminologia Realistica**: Chiamare l'"AI Neural Engine" con il suo nome proprio: **"Simulatore Predittivo Meteo-Traffico (Modello PUMS)"**.

---

## 5. 🛠️ TASCHE DI MIGLIORAMENTO PRIORITARIE (ROADMAP OPERATIVA)

### 🔴 SPRINT A — Priorità P0 (Bloccanti per la Credibilità Istituzionale)
- [ ] **A.1 Tour Onboarding Default Chiuso**: Modificare `App.jsx` e `OnboardingTour.jsx` affinché il tour non parta automaticamente. Si apre solo al clic su "Guida Rapida" o "Avvia Tour". Supporto tasto Esc e click sull'overlay per chiusura immediata.
- [ ] **A.2 Correzione Mapping Aria Live (PM10 / PM2.5 / NO₂)**: In `liveAirQualityService.js` e `Header.jsx`, mappare esplicitamente `current.pm10`, `current.pm2_5` e `current.nitrogen_dioxide`. Rimuovere il fallback hardcoded a 24.5°C; mostrare lo stato con orario dell'ultima lettura (es. *"Aggiornato ore 14:15"* o *"n/d"*).
- [ ] **A.3 Pulizia e Stabilità dell'Header**: Rimuovere il claim "WCAG 2.1 AA" dalla barra superiore (spostarlo nel footer come obiettivo in corso). Rimuovere il badge di versione discordante `v2.5`. Applicare `whitespace-nowrap` sui chip istituzionali per evitare a capo antiestetici.
- [ ] **A.4 Badge di Trasparenza sui KPI Hero**: Inserire il componente `DataSourceBadge` visibile accanto ai 3 KPI della Hero (CO₂, Banchine PEBA, Transiti Asse) e all'Indice ESG, etichettandoli onestamente come *Live*, *Calcolato ISPRA* o *Modello PUMS*.
- [ ] **A.5 Disclaimer Form Segnalazioni PEBA**: In `OpenDataView.jsx`, anteporre `DEMO-` al numero di protocollo generato e mostrare il disclaimer: *"Memorizzato a fini dimostrativi su questo dispositivo — Non costituisce protocollo ufficiale del Comune di Pisa"*.

### 🟡 SPRINT B — Priorità P1 (Rifinitura Grafica & Coerenza)
- [ ] **B.1 Riorganizzazione Gerarchica Executive**: Assicurare che le 4 Card ESG siano immediatamente visibili above-the-fold dopo l'apertura della pagina.
- [ ] **B.2 Ridenominazione Simulatore**: Rinominare "AI Predictive Traffic Engine" in *"Simulatore Predittivo Meteo-Traffico (Modello PUMS)"* sia nel banner che nei tooltip.
- [ ] **B.3 Verifica Stampa Report A4**: Controllare che l'`ExecutiveReportModal` utilizzi un tema chiaro (`bg-white text-slate-900`) in modalità di stampa per evitare spreco di inchiostro e leggibilità compromessa.
- [ ] **B.4 Riconciliazione Indicatori e Scenari**: Verificare che le percentuali del simulatore (Sole, Pioggia, Allerta) corrispondano esattamente tra interfaccia grafica, service e testi d'aiuto.

### 🟢 SPRINT C — Priorità P2 (Mappa, Open Data & Accessibilità)
- [ ] **C.1 Mappa Territoriale**: Legenda fissa ben visibile, toggle ON/OFF con contrasto netto, corretta attribuzione licenze OpenStreetMap / Carto / Esri.
- [ ] **C.2 Export Dati**: Generare i file CSV e JSON con timestamp dinamico nel nome file (es. `pm-esg-pisa-2026-09-11.csv`).
- [ ] **C.3 Contrasti & Accessibilità**: Audit colori (testi slate-400 su slate-900 per superare il rapporto 4.5:1), navigazione da tastiera e supporto a `prefers-reduced-motion`.

---

## 6. 🌐 SCHEMA SORGENTI DATI REALI (Blueprint Tecnico da `commenti .docx`)

Per le future integrazioni live, attenersi a questo schema di collegamento:

| Dato | Fonte Ufficiale | Modalità di Appoggio |
| :--- | :--- | :--- |
| **Meteo Live** | Open-Meteo Forecast | `api.open-meteo.com/v1/forecast` (temperatura, pioggia mm/h, weather_code) |
| **Aria Live** | Open-Meteo Air Quality & Copernicus | `air-quality-api.open-meteo.com/v1/air-quality` (pm10, pm2_5, nitrogen_dioxide) |
| **Aria Certificata Storica** | ARPAT Toscana | Stazioni **PI-Borghetto** e **PI-Passi** (CSV giornaliero) |
| **Percorsi & Tempi Asse** | OpenStreetMap + OSRM | API di routing pubblico o istanza dedicata (`router.project-osrm.org`) |
| **TPL Orari & Fermate** | Autolinee Toscane | Feed GTFS Regione Toscana Urbano Pisa (`stops.txt`, `routes.txt`, `calendar.txt`) |
| **Bike Sharing Ciclopi** | Pisamo / Bicincittà | Feed standard `GBFS` (`station_information.json`, `station_status.json`) |
| **Accessibilità Fermate** | PEBA Comune di Pisa | Rilievo tecnico Ufficio Mobilità (GeoJSON fermate a norma) |
| **Delibera PUMS** | Portale PUMS Pisa | Delibera Consiglio Comunale n. 19/2021 |
| **Fattori CO₂ & Costi** | ISPRA & ACI | Banca dati `fetransp.isprambiente.it` (~168 g/km) e tabelle costi ACI (~0,42 €/km) |

---

## 7. 🚨 ISTRUZIONI OPERATIVE PER L'AGENTE AI (ANTIGRAVITY IDE)

Quando operi in questo repository:
1. **Lavora sempre sul branch di feature** (attualmente `feature/edoardo-sprint-a-refinements`), non toccare `main`.
2. **Palette Colori Rigorosa**:
   - Sfondo Principale: `Dark Slate #0F172A`
   - Card e Contenitori: `Navy Slate #1E293B` (bordo `#334155`)
   - Accenti: `Smeraldo #10B981`, `Ciano #06B6D4`, `Ambra #F59E0B`, `Viola #A855F7`, `Testo #F8FAFC`, `Rosso Pisano #C41230` (solo per allerta o stemma).
3. **Rispetta la Doppia Persona**: Qualsiasi modifica alle card o ai widget deve supportare sia la modalità tecnica che la modalità "Guida alla Lettura".
4. **Verifica della Build**: Esegui sempre `npm run build` prima di considerare completata qualsiasi modifica.
