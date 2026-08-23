import React from 'react';
import { ShieldCheck, Heart, ExternalLink, Globe, FileSpreadsheet, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-950/80 border-t border-slate-800/80 text-slate-400 text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Colonna 1: Info Istituzionali */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-pisa-red" />
              <span>Comune di Pisa • Portale Mobilità Sostenibile & ESG</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Il cruscotto PM-ESG fornisce accesso trasparente in tempo reale ai parametri di sostenibilità ecologica, inclusione sociale PEBA, impatto economico e governance del Piano Urbano della Mobilità Sostenibile (PUMS 2020-2030).
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Conforme WCAG 2.1 Livello AA
              </span>
              <span>•</span>
              <span>Dati aperti CC-BY 4.0</span>
            </div>
          </div>

          {/* Colonna 2: Partner Istituzionali */}
          <div>
            <h5 className="text-slate-200 font-semibold mb-2.5 uppercase tracking-wider text-[11px]">Partner & Gestori</h5>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-1.5 hover:text-white cursor-pointer transition">
                <Globe className="w-3 h-3 text-blue-400" /> Pisamo S.r.l. (Mobilità Pisa)
              </li>
              <li className="flex items-center gap-1.5 hover:text-white cursor-pointer transition">
                <Globe className="w-3 h-3 text-emerald-400" /> Autolinee Toscane (TPL)
              </li>
              <li className="flex items-center gap-1.5 hover:text-white cursor-pointer transition">
                <Globe className="w-3 h-3 text-amber-400" /> Università di Pisa (UniPi)
              </li>
              <li className="flex items-center gap-1.5 hover:text-white cursor-pointer transition">
                <Globe className="w-3 h-3 text-purple-400" /> Fiab Pisa / Consulta Mobilità
              </li>
            </ul>
          </div>

          {/* Colonna 3: Normativa & PUMS */}
          <div>
            <h5 className="text-slate-200 font-semibold mb-2.5 uppercase tracking-wider text-[11px]">Riferimenti PUMS</h5>
            <ul className="space-y-1.5 text-xs">
              <li className="hover:text-white cursor-pointer transition">Delibera C.C. n. 42/2021 PUMS Pisa</li>
              <li className="hover:text-white cursor-pointer transition">Monitoraggio PNRR M2C2 Investimento 4.4</li>
              <li className="hover:text-white cursor-pointer transition">Piano Eliminazione Barriere (PEBA)</li>
              <li className="hover:text-white cursor-pointer transition">Catalogo Open Data Istituzionale</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 Comune di Pisa - Tutti i diritti riservati. Progettato con standard Smart City & ESG.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">Accessibilità</span>
            <span className="hover:text-slate-200 cursor-pointer">Note Legali</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
