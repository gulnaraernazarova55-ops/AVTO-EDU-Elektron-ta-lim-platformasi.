import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  Cpu,
  Gauge,
  Printer,
  Search,
  Stethoscope,
  Upload,
  Wrench,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  EmptyState,
  Input,
  Select,
  Tabs,
  TextArea,
} from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { usePageMeta, useT } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';
import {
  DIAGNOSTIC_RULES,
  ENGINE_HOTSPOTS,
  SIMULATOR_SYMPTOMS,
} from '../data/seedSimulatorData';
import { contentService } from '../services/contentService';
import { Assignment, DtcCode, Submission } from '../types';

type PracticalTab = 'assignments' | 'obd' | 'simulator' | 'maintenance' | 'diagram' | 'compression';

export const PracticalPage: React.FC = () => {
  const { lang, t, formatNumber } = useT();
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  usePageMeta(t.practical.title, t.practical.subtitle);

  const initialTab = (searchParams.get('tab') as PracticalTab) || 'assignments';
  const [activeTab, setActiveTab] = useState<PracticalTab>(initialTab);

  useEffect(() => {
    const tParam = searchParams.get('tab') as PracticalTab | null;
    if (tParam) setActiveTab(tParam);
  }, [searchParams]);

  const handleTabChange = (next: PracticalTab) => {
    setActiveTab(next);
    setSearchParams({ tab: next });
  };

  // 1. Assignments state
  const [assignments] = useState<Assignment[]>(() => contentService.getAssignments());
  const [submissions, setSubmissions] = useState<Submission[]>(() => contentService.getSubmissions());
  const [selectedAssignId, setSelectedAssignId] = useState<string>(assignments[0]?.id || '');
  const [reportText, setReportText] = useState('');
  const [attachmentBase64, setAttachmentBase64] = useState<string | undefined>();
  const [attachmentName, setAttachmentName] = useState<string | undefined>();
  const [progress, setProgress] = useState(() =>
    user ? contentService.getStudentProgress(user.id) : null
  );

  const activeAssignment = assignments.find((a) => a.id === selectedAssignId) || assignments[0];
  const mySubmission = user && activeAssignment
    ? submissions.find((s) => s.assignmentId === activeAssignment.id && s.studentId === user.id)
    : undefined;

  useEffect(() => {
    if (mySubmission) {
      setReportText(mySubmission.reportText);
      setAttachmentBase64(mySubmission.attachmentBase64);
      setAttachmentName(mySubmission.attachmentName);
    } else {
      setReportText('');
      setAttachmentBase64(undefined);
      setAttachmentName(undefined);
    }
  }, [selectedAssignId, mySubmission]);

  const checkedSteps = (activeAssignment && progress?.assignmentChecklists[activeAssignment.id]) || [];

  const toggleStep = (idx: number) => {
    if (!user || !activeAssignment) {
      showToast(t.auth.authRequired, 'info');
      return;
    }
    const next = contentService.updateStudentProgress(user.id, (prev) => {
      const curr = prev.assignmentChecklists[activeAssignment.id] || [];
      const updated = curr.includes(idx) ? curr.filter((i) => i !== idx) : [...curr, idx];
      return {
        ...prev,
        assignmentChecklists: { ...prev.assignmentChecklists, [activeAssignment.id]: updated },
      };
    });
    setProgress(next);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) {
      showToast('Max file size 1.5 MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAttachmentBase64(String(reader.result));
      setAttachmentName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast(t.auth.authRequired, 'info');
      return;
    }
    if (!activeAssignment || !reportText.trim()) {
      showToast(t.common.requiredField, 'error');
      return;
    }
    contentService.submitAssignment({
      assignmentId: activeAssignment.id,
      studentId: user.id,
      studentName: user.name,
      reportText: reportText.trim(),
      attachmentBase64,
      attachmentName,
      checkedSteps,
    });
    setSubmissions(contentService.getSubmissions());
    refreshUser();
    showToast(t.common.savedSuccess, 'success');
  };

  // 2. OBD-II Lookup state
  const [dtcCodes] = useState<DtcCode[]>(() => contentService.getDtcCodes());
  const [obdQuery, setObdQuery] = useState(searchParams.get('code') || '');
  const [obdSystem, setObdSystem] = useState<string>('all');

  const filteredDtc = useMemo(() => {
    const q = obdQuery.trim().toLowerCase();
    return dtcCodes.filter((d) => {
      if (obdSystem !== 'all' && d.system !== obdSystem) return false;
      if (!q) return true;
      return (
        d.code.toLowerCase().includes(q) ||
        d.meaning[lang].toLowerCase().includes(q) ||
        d.causes[lang].some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [dtcCodes, obdQuery, obdSystem, lang]);

  // 3. Diagnostic Simulator state
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['rough_idle', 'cel']);
  const simulatorResults = useMemo(() => {
    if (selectedSymptoms.length === 0) return [];
    return DIAGNOSTIC_RULES.map((rule) => {
      const hits = rule.matchedSymptoms.filter((s) => selectedSymptoms.includes(s)).length;
      if (hits === 0) return null;
      const ratio = hits / Math.max(selectedSymptoms.length, rule.matchedSymptoms.length);
      const confidence = Math.min(96, Math.round(ratio * 75 + rule.baseWeight));
      return { ...rule, hits, confidence };
    })
      .filter((x): x is NonNullable<typeof x> => Boolean(x))
      .sort((a, b) => b.confidence - a.confidence);
  }, [selectedSymptoms]);

  // 4. Maintenance Interval Calculator state
  const [mileage, setMileage] = useState(65000);
  const [carAge, setCarAge] = useState(4);
  const [fuelType, setFuelType] = useState<'gasoline' | 'diesel' | 'hybrid'>('gasoline');
  const [drivingCond, setDrivingCond] = useState<'normal' | 'severe'>('normal');

  const maintenanceSchedule = useMemo(() => {
    const factor = drivingCond === 'severe' ? 0.75 : 1;
    const items = [
      {
        id: 'oil',
        name: { uz: 'Motor moyi va moy filtri', ru: 'Моторное масло и фильтр', en: 'Engine Oil & Filter' },
        intervalKm: Math.round((fuelType === 'diesel' ? 8000 : 10000) * factor),
        intervalYears: 1,
      },
      {
        id: 'air_filter',
        name: { uz: 'Havo va salon filtrlari', ru: 'Воздушный и салонный фильтры', en: 'Air & Cabin Filters' },
        intervalKm: Math.round(15000 * factor),
        intervalYears: 1,
      },
      {
        id: 'plugs',
        name: {
          uz: fuelType === 'diesel' ? 'Qizdirish shamlari tekshiruvi' : 'Uchqun shamlari (Iridium/Std)',
          ru: fuelType === 'diesel' ? 'Проверка свечей накаливания' : 'Свечи зажигания',
          en: fuelType === 'diesel' ? 'Glow Plug Inspection' : 'Spark Plugs',
        },
        intervalKm: Math.round((fuelType === 'hybrid' ? 60000 : 40000) * factor),
        intervalYears: 3,
      },
      {
        id: 'fuel_filter',
        name: { uz: 'Yonilg‘i filtri', ru: 'Топливный фильтр', en: 'Fuel Filter' },
        intervalKm: Math.round((fuelType === 'diesel' ? 20000 : 45000) * factor),
        intervalYears: 2,
      },
      {
        id: 'timing',
        name: { uz: 'GRM kamari / zanjiri va roliklar', ru: 'Привод ГРМ (ремень/цепь) и ролики', en: 'Timing Belt / Chain & Tensioner' },
        intervalKm: Math.round(80000 * factor),
        intervalYears: 5,
      },
      {
        id: 'coolant',
        name: { uz: 'Antifriz (sovutish suyuqligi)', ru: 'Охлаждающая жидкость (антифриз)', en: 'Engine Coolant Flush' },
        intervalKm: 60000,
        intervalYears: 3,
      },
      {
        id: 'brake_fluid',
        name: { uz: 'Tormoz suyuqligi (DOT 4)', ru: 'Тормозная жидкость (DOT 4)', en: 'Brake Fluid (DOT 4)' },
        intervalKm: 40000,
        intervalYears: 2,
      },
    ];

    return items.map((item) => {
      const remainder = mileage % item.intervalKm;
      const kmLeft = item.intervalKm - remainder;
      const ageDue = carAge >= item.intervalYears && mileage > 10000 && remainder > item.intervalKm * 0.85;
      const overdue = kmLeft < 1000 || ageDue;
      return {
        ...item,
        kmLeft,
        overdue,
      };
    });
  }, [mileage, carAge, fuelType, drivingCond]);

  // 5. Interactive Engine Diagram state
  const [activeHotspotId, setActiveHotspotId] = useState(ENGINE_HOTSPOTS[0].id);
  const activeHotspot = ENGINE_HOTSPOTS.find((h) => h.id === activeHotspotId) || ENGINE_HOTSPOTS[0];

  // 6. Compression Calculator state
  const [cylCount, setCylCount] = useState<4 | 6 | 8>(4);
  const [compUnit, setCompUnit] = useState<'bar' | 'psi'>('bar');
  const [dryReadings, setDryReadings] = useState<number[]>([13.1, 12.9, 9.0, 13.0, 12.8, 12.9, 13.0, 12.7]);
  const [wetReadings, setWetReadings] = useState<(number | '')[]>([13.3, 13.0, 12.4, 13.1, '', '', '', '']);

  const compressionAnalysis = useMemo(() => {
    const activeDry = dryReadings.slice(0, cylCount);
    const maxVal = Math.max(...activeDry);
    const minVal = Math.min(...activeDry);
    const variancePct = maxVal > 0 ? Math.round(((maxVal - minVal) / maxVal) * 1000) / 10 : 0;
    const minAcceptable = maxVal * 0.85;
    const weakCylinders = activeDry
      .map((val, idx) => ({ idx: idx + 1, val, wet: wetReadings[idx] }))
      .filter((c) => c.val < minAcceptable || c.val < (compUnit === 'bar' ? 9.5 : 138));

    let verdict = '';
    if (weakCylinders.length === 0 && variancePct <= 15) {
      verdict =
        lang === 'uz'
          ? "Barcha silindrlar me'yorda (farq <= 15%). Mexanik germetiklik yaxshi."
          : lang === 'ru'
          ? 'Все цилиндры в норме (разброс ≤ 15%). Механика ЦПГ исправна.'
          : 'All cylinders within healthy limits (variance ≤ 15%). Mechanical sealing is normal.';
    } else {
      const ringsImproved = weakCylinders.some((w) => typeof w.wet === 'number' && w.wet - w.val >= (compUnit === 'bar' ? 1.5 : 22));
      if (ringsImproved) {
        verdict =
          lang === 'uz'
            ? "Moyli testda kompressiya sezilarli oshdi — zaif silindr(lar)da porshen halqalari yeyilgan yoki qotib qolgan."
            : lang === 'ru'
            ? 'После добавления масла компрессия заметно выросла — износ или залегание поршневых колец.'
            : 'Significant pressure gain on wet test confirms worn or stuck piston rings in the weak cylinder(s).';
      } else {
        verdict =
          lang === 'uz'
            ? "Silindrlar orasida me'yordan ortiq farq bor. Moy qo'shilganda o'zgarmasa — klapanlar germetikligi yoki GBS prokladkasini Leak-Down bilan tekshiring."
            : lang === 'ru'
            ? 'Превышен допустимый разброс. Если масляный тест не поднимает давление — проверьте клапаны или прокладку ГБЦ пневмотестом.'
            : 'Excessive variance detected. If wet test shows minimal rise, run a leak-down test for burnt valves or head gasket failure.';
      }
    }

    return { maxVal, minVal, variancePct, weakCylinders, verdict };
  }, [dryReadings, wetReadings, cylCount, compUnit, lang]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Breadcrumbs items={[{ label: t.nav.home, to: '/' }, { label: t.nav.practical }]} />

      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {t.practical.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{t.practical.subtitle}</p>
      </div>

      <Tabs
        activeTab={activeTab}
        onChange={handleTabChange}
        tabs={[
          { id: 'assignments', label: t.practical.tabs.assignments, icon: <Wrench className="w-4 h-4" /> },
          { id: 'obd', label: t.practical.tabs.obd, icon: <Cpu className="w-4 h-4" /> },
          { id: 'simulator', label: t.practical.tabs.simulator, icon: <Stethoscope className="w-4 h-4" /> },
          { id: 'maintenance', label: t.practical.tabs.maintenance, icon: <Calculator className="w-4 h-4" /> },
          { id: 'diagram', label: t.practical.tabs.diagram, icon: <Search className="w-4 h-4" /> },
          { id: 'compression', label: t.practical.tabs.compression, icon: <Gauge className="w-4 h-4" /> },
        ]}
      />

      {/* TAB 1: Hands-on Assignments */}
      {activeTab === 'assignments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 space-y-3">
            {assignments.map((assign) => {
              const sub = user
                ? submissions.find((s) => s.assignmentId === assign.id && s.studentId === user.id)
                : undefined;
              const selected = activeAssignment?.id === assign.id;
              return (
                <Card
                  key={assign.id}
                  padding="p-4"
                  className={`cursor-pointer transition-colors ${
                    selected ? 'border-orange-600 dark:border-amber-500 ring-1 ring-orange-600/30' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedAssignId(assign.id)}
                    className="w-full text-left space-y-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-500 tabular-nums">
                        {assign.estimatedMinutes} {t.common.minutes}
                      </span>
                      {sub && (
                        <Badge
                          variant={
                            sub.status === 'accepted'
                              ? 'success'
                              : sub.status === 'needs_revision'
                              ? 'danger'
                              : 'warning'
                          }
                        >
                          {t.practical.statuses[sub.status]}
                        </Badge>
                      )}
                    </div>
                    <h2 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      {assign.title[lang]}
                    </h2>
                  </button>
                </Card>
              );
            })}
          </div>

          {activeAssignment && (
            <Card className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {activeAssignment.title[lang]}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeAssignment.description[lang]}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 space-y-2">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {t.practical.toolsRequired}
                  </h3>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    {(activeAssignment.tools[lang] || activeAssignment.tools.en).map((tool, i) => (
                      <li key={i}>· {tool}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-amber-500/40 bg-amber-50/60 dark:bg-amber-950/20 p-4 space-y-2">
                  <h3 className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{t.practical.safetyWarning}</span>
                  </h3>
                  <ul className="space-y-1 text-xs text-amber-900 dark:text-amber-200">
                    {(activeAssignment.safetyWarnings[lang] || activeAssignment.safetyWarnings.en).map((w, i) => (
                      <li key={i}>· {w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.practical.checklistSteps}
                </h3>
                {(activeAssignment.steps[lang] || activeAssignment.steps.en).map((step, idx) => {
                  const checked = checkedSteps.includes(idx);
                  return (
                    <label
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleStep(idx)}
                        className="mt-0.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className={`text-sm ${checked ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                        {step}
                      </span>
                    </label>
                  );
                })}
              </div>

              {mySubmission && mySubmission.grade !== undefined && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-50/70 dark:bg-emerald-950/30 p-4 space-y-1.5">
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 tabular-nums">
                    {t.practical.teacherGrade}: {mySubmission.grade} / 100
                  </p>
                  {mySubmission.feedback && (
                    <p className="text-xs text-slate-700 dark:text-slate-200">
                      <strong>{t.practical.teacherFeedback}:</strong> {mySubmission.feedback}
                    </p>
                  )}
                </div>
              )}

              <form onSubmit={handleAssignmentSubmit} className="space-y-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                <TextArea
                  label={t.practical.yourReport}
                  rows={4}
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder={t.practical.reportPlaceholder}
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                    <Upload className="w-4 h-4" />
                    <span>{attachmentName || t.practical.attachPhoto}</span>
                    <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <Button type="submit" variant="primary">
                    {mySubmission ? t.practical.resubmitWork : t.practical.submitWork}
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      )}

      {/* TAB 2: OBD-II Lookup */}
      {activeTab === 'obd' && (
        <div className="space-y-5">
          <Card padding="p-4" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={obdQuery}
                onChange={(e) => setObdQuery(e.target.value)}
                placeholder={t.practical.obdSearchPlaceholder}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <Select value={obdSystem} onChange={(e) => setObdSystem(e.target.value)}>
              <option value="all">{t.practical.obdSystemAll}</option>
              <option value="fuel_air">Fuel &amp; Air</option>
              <option value="ignition">Ignition &amp; Misfire</option>
              <option value="emissions">Emissions &amp; O2</option>
              <option value="sensors">Sensors (CKP/CMP/MAF)</option>
              <option value="cooling_idle">Cooling &amp; Idle</option>
              <option value="transmission">Transmission</option>
            </Select>
          </Card>

          {filteredDtc.length === 0 ? (
            <EmptyState title={t.common.noData} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDtc.map((d) => (
                <Card key={d.code} padding="p-5" className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-base font-bold text-orange-600 dark:text-amber-400">
                      {d.code}
                    </span>
                    <Badge
                      variant={
                        d.severity === 'high' ? 'danger' : d.severity === 'medium' ? 'warning' : 'neutral'
                      }
                    >
                      {d.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {d.meaning[lang]}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-200 mb-1">
                        {t.practical.obdCauses}:
                      </p>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                        {d.causes[lang].map((c, idx) => (
                          <li key={idx}>· {c}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-200 mb-1">
                        {t.practical.obdChecks}:
                      </p>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                        {d.checks[lang].map((ck, idx) => (
                          <li key={idx}>· {ck}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Engine Diagnostic Simulator */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <Card className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {t.practical.simSelectSymptoms}
            </h2>
            <div className="space-y-2">
              {SIMULATOR_SYMPTOMS.map((sym) => {
                const active = selectedSymptoms.includes(sym.id);
                return (
                  <label
                    key={sym.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-sm cursor-pointer transition-colors ${
                      active
                        ? 'border-orange-600 bg-orange-50/70 dark:bg-orange-950/30 text-slate-900 dark:text-white font-medium'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() =>
                        setSelectedSymptoms((prev) =>
                          prev.includes(sym.id) ? prev.filter((id) => id !== sym.id) : [...prev, sym.id]
                        )
                      }
                      className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span>{sym.label[lang]}</span>
                  </label>
                );
              })}
            </div>
          </Card>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {t.practical.simProbableCauses}
            </h2>
            {simulatorResults.length === 0 ? (
              <EmptyState title={t.common.noData} />
            ) : (
              simulatorResults.map((res) => (
                <Card key={res.id} className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      {res.cause[lang]}
                    </h3>
                    <Badge variant={res.confidence >= 70 ? 'danger' : 'warning'}>
                      <span className="tabular-nums">{res.confidence}%</span> {t.practical.simConfidence}
                    </Badge>
                  </div>
                  <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {t.practical.simRecommendedChecks}:
                    </p>
                    <ul className="space-y-1">
                      {res.checks[lang].map((ck, idx) => (
                        <li key={idx}>· {ck}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: Maintenance Interval Calculator */}
      {activeTab === 'maintenance' && (
        <div className="space-y-6">
          <Card className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label={t.practical.maintMileage}
              type="number"
              min={0}
              step={1000}
              value={mileage}
              onChange={(e) => setMileage(Math.max(0, Number(e.target.value)))}
            />
            <Input
              label={t.practical.maintAge}
              type="number"
              min={0}
              max={40}
              value={carAge}
              onChange={(e) => setCarAge(Math.max(0, Number(e.target.value)))}
            />
            <Select
              label={t.practical.maintFuel}
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value as 'gasoline' | 'diesel' | 'hybrid')}
            >
              <option value="gasoline">Gasoline (Benzin)</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
            </Select>
            <Select
              label={t.practical.maintCondition}
              value={drivingCond}
              onChange={(e) => setDrivingCond(e.target.value as 'normal' | 'severe')}
            >
              <option value="normal">{t.practical.maintNormal}</option>
              <option value="severe">{t.practical.maintSevere}</option>
            </Select>
          </Card>

          <div className="flex justify-end no-print">
            <Button size="sm" variant="outline" onClick={() => window.print()}>
              <Printer className="w-4 h-4" />
              <span>{t.practical.maintPrint}</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {maintenanceSchedule.map((item) => (
              <Card key={item.id} padding="p-4" className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    {item.name[lang]}
                  </h3>
                  <p className="text-xs text-slate-500 tabular-nums mt-0.5">
                    {t.practical.maintDueIn}: {formatNumber(item.kmLeft)} km
                  </p>
                </div>
                <Badge variant={item.overdue ? 'danger' : 'success'}>
                  {item.overdue ? t.practical.maintOverdue : t.practical.maintUpcoming}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Interactive Engine Diagram */}
      {activeTab === 'diagram' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <Card className="lg:col-span-7 space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.practical.diagramHint}</p>
            <div className="relative rounded-xl bg-slate-900 border border-slate-800 overflow-hidden aspect-[4/3]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Schematic Inline Cylinder Cutaway */}
                <rect x="20" y="14" width="56" height="16" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />
                <rect x="24" y="30" width="44" height="38" rx="1.5" fill="#0F172A" stroke="#64748B" strokeWidth="0.8" />
                <rect x="33" y="52" width="18" height="12" rx="1.5" fill="#CBD5E1" />
                <rect x="40" y="64" width="4" height="14" fill="#EA580C" />
                <circle cx="42" cy="79" r="7" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
                <rect x="68" y="34" width="16" height="8" rx="1" fill="#334155" stroke="#38BDF8" strokeWidth="0.7" />
                <line x1="28" y1="30" x2="28" y2="44" stroke="#F59E0B" strokeWidth="1.5" />
                <rect x="40" y="16" width="4" height="20" fill="#F8FAFC" />

                {ENGINE_HOTSPOTS.map((hs, idx) => {
                  const active = hs.id === activeHotspot.id;
                  return (
                    <g
                      key={hs.id}
                      onClick={() => setActiveHotspotId(hs.id)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={hs.x}
                        cy={hs.y}
                        r={active ? 4.2 : 3.2}
                        fill={active ? '#EA580C' : '#F59E0B'}
                        stroke="#FFFFFF"
                        strokeWidth="0.8"
                      />
                      <text
                        x={hs.x}
                        y={hs.y + 1.1}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="3"
                        fontWeight="bold"
                      >
                        {idx + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </Card>

          <Card className="lg:col-span-5 space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {ENGINE_HOTSPOTS.map((hs, idx) => (
                <button
                  key={hs.id}
                  type="button"
                  onClick={() => setActiveHotspotId(hs.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
                    hs.id === activeHotspot.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {idx + 1}. {hs.name[lang].split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                {activeHotspot.name[lang]}
              </h2>
              <div>
                <p className="text-xs font-semibold text-orange-600 dark:text-amber-400">
                  {t.practical.diagramFunction}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {activeHotspot.role[lang]}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                  {t.practical.diagramFaults}
                </p>
                <ul className="mt-1 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  {activeHotspot.faults[lang].map((f, i) => (
                    <li key={i}>· {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 6: Compression Test Calculator */}
      {activeTab === 'compression' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <Card className="lg:col-span-7 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Select
                label={t.practical.compCylinders}
                value={cylCount}
                onChange={(e) => setCylCount(Number(e.target.value) as 4 | 6 | 8)}
              >
                <option value={4}>4 Cylinders</option>
                <option value={6}>6 Cylinders</option>
                <option value={8}>8 Cylinders</option>
              </Select>
              <Select
                label={t.practical.compUnit}
                value={compUnit}
                onChange={(e) => setCompUnit(e.target.value as 'bar' | 'psi')}
              >
                <option value="bar">Bar</option>
                <option value="psi">PSI</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Array.from({ length: cylCount }).map((_, idx) => (
                <div key={idx} className="space-y-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Cyl #{idx + 1}</p>
                  <Input
                    label="Dry"
                    type="number"
                    step="0.1"
                    value={dryReadings[idx]}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setDryReadings((prev) => prev.map((v, i) => (i === idx ? val : v)));
                    }}
                  />
                  <Input
                    label="Wet"
                    type="number"
                    step="0.1"
                    placeholder="—"
                    value={wetReadings[idx]}
                    onChange={(e) => {
                      const raw = e.target.value;
                      setWetReadings((prev) =>
                        prev.map((v, i) => (i === idx ? (raw === '' ? '' : Number(raw)) : v))
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {t.practical.compConclusion}
            </h2>
            <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-500">{t.practical.compMaxVar}</p>
                <p
                  className={`font-display text-2xl font-bold tabular-nums ${
                    compressionAnalysis.variancePct > 15 ? 'text-red-600' : 'text-emerald-600'
                  }`}
                >
                  {compressionAnalysis.variancePct}%
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">{t.practical.compWeakCylinders}</p>
                <p className="font-display text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                  {compressionAnalysis.weakCylinders.length > 0
                    ? compressionAnalysis.weakCylinders.map((w) => `#${w.idx}`).join(', ')
                    : '—'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <CheckCircle2
                className={`w-5 h-5 shrink-0 mt-0.5 ${
                  compressionAnalysis.variancePct > 15 ? 'text-amber-500' : 'text-emerald-500'
                }`}
              />
              <p>{compressionAnalysis.verdict}</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
