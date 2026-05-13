/** Contenido editorial completo por especialidad (además de odontología y pediatría, que tienen página propia). */

export type EspDetalle = {
  eyebrow: string;
  heroTitulo: string;
  heroSub: string;
  stats: [string, string][];
  servicioDesc: string[];
  steps: { title: string; text: string; img: string }[];
  tech: { title: string; desc: string; img: string }[];
  gallery: string[];
  faqKey: string;
  darkTitle: string;
  darkText: string;
  ctaTitulo: string;
};

const U = (path: string) =>
  `https://images.unsplash.com/${path}?auto=format&fit=crop&w=1200&q=80`;

export const ESP_DETALLE: Record<string, EspDetalle> = {
  "medicina-general": {
    eyebrow: "Medicina familiar y adultos",
    heroTitulo: "Tu médico conoce tu historia.",
    heroSub:
      "Atención primaria con tiempo real de consulta, detección temprana y coordinación con especialistas en el mismo edificio.",
    stats: [
      ["18,000+", "CONSULTAS ANUALES"],
      ["2", "MÉDICAS FAMILIAR"],
      ["15 min", "TIEMPO MÍNIMO EXPLICADO"],
      ["COFEPRIS", "LINEAMIENTOS"],
    ],
    servicioDesc: [
      "Chequeos con laboratorio básico y riesgo cardiovascular calculado.",
      "Diabetes, hipertensión, tiroides y otras crónicas con metas claras.",
      "Esquemas actualizados y recordatorios por WhatsApp.",
      "Constancias laborales, escolares y licencias con criterio clínico.",
    ],
    steps: [
      {
        title: "Historia clínica digital",
        text: "Un solo expediente para todas tus visitas en Vivanta.",
        img: U("photo-1576091160399-112ba8d25d1d"),
      },
      {
        title: "Exploración sin apuro",
        text: "Lista de síntomas, hábitos y medicamentos revisada con calma.",
        img: U("photo-1559839734-2b71ea197ec2"),
      },
      {
        title: "Plan y estudios",
        text: "Solo lo necesario, con costos orientativos antes de ordenar.",
        img: U("photo-1579684385127-1ef15d5081de"),
      },
      {
        title: "Seguimiento",
        text: "Recordatorios y canal directo con tu médica de cabecera.",
        img: U("photo-1519494026892-80bbd2d6fd0d"),
      },
    ],
    tech: [
      {
        title: "Electrocardiógrafo en consulta",
        desc: "ECG de 12 derivaciones cuando el cuadro lo sugiere, sin otra cita.",
        img: U("photo-1559757148-5c350d0d3c56"),
      },
      {
        title: "Telemedicina opcional",
        desc: "Seguimiento de crónicos estables o resultados de laboratorio.",
        img: U("photo-1576091160550-2173dba999ef"),
      },
      {
        title: "Red interna de especialistas",
        desc: "Derivación con contexto clínico, sin repetir tu historia.",
        img: U("photo-1582719478250-c89cae4dc85b"),
      },
    ],
    gallery: [
      U("photo-1551601651-2a8555f1a136"),
      U("photo-1505751172876-fa1923c5c528"),
      U("photo-1532938911079-1b06ac7ceec7"),
      U("photo-1579684385127-1ef15d5081de"),
    ],
    faqKey: "medicinaGeneral",
    darkTitle: "Medicina que coordina, no que fragmenta.",
    darkText:
      "Si hace falta cardiología, nutrición u otra área, aquí compartimos estudios con tu permiso y evitamos estudios duplicados.",
    ctaTitulo: "Agenda tu primera valoración en medicina general",
  },
  ortopedia: {
    eyebrow: "Movilidad y columna",
    heroTitulo: "Volver a moverte con criterio.",
    heroSub:
      "Lesiones deportivas, artrosis, columna y hombro: tratamiento conservador primero, cirugía solo cuando el beneficio es claro.",
    stats: [
      ["3,200+", "VALORACIONES"],
      ["1", "ORTOPEDISTA"],
      ["CIRUGÍA", "CUANDO TOCA"],
      ["REHAB", "COORDINADA"],
    ],
    servicioDesc: [
      "Inyecciones guiadas, viscosuplementación y manejo del dolor.",
      "RM y tomografía interpretadas con tu historia clínica.",
      "Fracturas, esguinces y sobrecarga en deportistas y adultos mayores.",
      "Programas de fortalecimiento con fisioterapia asociada.",
    ],
    steps: [
      {
        title: "Historia mecánica",
        text: "Cuándo duele, qué lo dispara y qué ya probaste.",
        img: U("photo-1518611012118-696072aa579a"),
      },
      {
        title: "Exploración funcional",
        text: "Pruebas en cabina y marcha, no solo la imagen.",
        img: U("photo-1516549655169-df83a0774514"),
      },
      {
        title: "Plan por fases",
        text: "Conservador, infiltración o cirugía: plazos y riesgos explicados.",
        img: U("photo-1571019613454-1cb2f99b2d8b"),
      },
      {
        title: "Alta y prevención",
        text: "Ejercicios en casa y señales de alarma claras.",
        img: U("photo-1544367567-0f2fcb009e0b"),
      },
    ],
    tech: [
      {
        title: "Imagen de alta resolución",
        desc: "Lectura conjunta con radiología cuando el caso lo requiere.",
        img: U("photo-1582719478250-c89cae4dc85b"),
      },
      {
        title: "Bloques guiados",
        desc: "Infiltraciones con control de dolor y función.",
        img: U("photo-1576091160399-112ba8d25d1d"),
      },
      {
        title: "Protocolo preoperatorio",
        desc: "Optimización médica antes de cirugía electiva.",
        img: U("photo-1551190822-a9333d879b1f"),
      },
    ],
    gallery: [
      U("photo-1518611012118-696072aa579a"),
      U("photo-1571019613454-1cb2f99b2d8b"),
      U("photo-1544367567-0f2fcb009e0b"),
      U("photo-1516549655169-df83a0774514"),
    ],
    faqKey: "ortopedia",
    darkTitle: "Cirugía informada, nunca apurada.",
    darkText:
      "Te mostramos alternativas conservadoras y tiempos de recuperación realistas antes de firmar un procedimiento.",
    ctaTitulo: "Reserva valoración ortopédica",
  },
  cardiologia: {
    eyebrow: "Corazón y vasos",
    heroTitulo: "Prevención con evidencia.",
    heroSub:
      "Riesgo cardiovascular, arritmias, hipertensión e isquemia: estudios en sitio y lectura por cardiólogo con tiempo para preguntas.",
    stats: [
      ["12,000+", "ECG REALIZADOS"],
      ["1", "CARDIÓLOGO"],
      ["HOLTER", "24–48 H"],
      ["ECO", "EN CONSULTA"],
    ],
    servicioDesc: [
      "Interpretación y plan: medicación, estilo de vida y seguimiento.",
      "Ecocardiograma transtorácico con informe detallado.",
      "Monitoreo ambulatorio y prueba de esfuerzo coordinados aquí.",
      "Programa postevento y riesgo residual.",
    ],
    steps: [
      {
        title: "Riesgo global",
        text: "Presión, lípidos, historia familiar y síntomas en un solo mapa.",
        img: U("photo-1505751172876-fa1923c5c528"),
      },
      {
        title: "Estudios adecuados",
        text: "Solo lo que guía decisiones; evitamos cascadas innecesarias.",
        img: U("photo-1559757148-5c350d0d3c56"),
      },
      {
        title: "Plan terapéutico",
        text: "Metas de presión y colesterol con fechas de control.",
        img: U("photo-1576091160399-112ba8d25d1d"),
      },
      {
        title: "Coordinación",
        text: "Con medicina interna, nutrición y urgencias de la clínica.",
        img: U("photo-1559757175-0eb30cd8c063"),
      },
    ],
    tech: [
      {
        title: "Holter digital",
        desc: "Instalación, retiro e informe con explicación cara a cara.",
        img: U("photo-1576091160550-2173dba999ef"),
      },
      {
        title: "Ecocardiografía",
        desc: "Evaluación de válvulas y función ventricular.",
        img: U("photo-1559757148-5c350d0d3c56"),
      },
      {
        title: "Prueba de esfuerzo",
        desc: "En sede aliada con lectura cardiológica Vivanta.",
        img: U("photo-1551190822-a9333d879b1f"),
      },
    ],
    gallery: [
      U("photo-1559757148-5c350d0d3c56"),
      U("photo-1576091160550-2173dba999ef"),
      U("photo-1505751172876-fa1923c5c528"),
      U("photo-1559757175-0eb30cd8c063"),
    ],
    faqKey: "cardiologia",
    darkTitle: "Tu corazón merece tiempo de explicación.",
    darkText:
      "Te mostramos trazos y reportes en lenguaje claro. Si no hay indicación de estudio avanzado, no lo pedimos.",
    ctaTitulo: "Agenda cardiología",
  },
  ginecologia: {
    eyebrow: "Salud femenina",
    heroTitulo: "Cada etapa con respeto.",
    heroSub:
      "Bienestar ginecológico, embarazo de bajo riesgo, planificación familiar y climaterio con consultas sin juicio.",
    stats: [
      ["9,000+", "CONSULTAS"],
      ["1", "GINECÓLOGA"],
      ["PAP", "EN LAB CERTIFICADO"],
      ["EMBARAZO", "BAJO RIESGO"],
    ],
    servicioDesc: [
      "Citología y colposcopía según guías nacionales.",
      "Controles prenatales con calendario de estudios y vacunas.",
      "Anticoncepción hormonal y no hormonal con elección informada.",
      "Manejo de sofocos, sueño y cambios del climaterio.",
    ],
    steps: [
      {
        title: "Escucha primero",
        text: "Motivo de consulta, antecedentes y dudas sin interrupciones.",
        img: U("photo-1551601651-2a8555f1a136"),
      },
      {
        title: "Exploración respetuosa",
        text: "Consentimiento, privacidad y acompañante si lo deseas.",
        img: U("photo-1573496359142-b8d87734a5a2"),
      },
      {
        title: "Resultados claros",
        text: "Laboratorio e imagen explicados con próximos pasos.",
        img: U("photo-1584515933487-779824d29309"),
      },
      {
        title: "Plan personal",
        text: "Seguimiento por trimestre o según tu necesidad.",
        img: U("photo-1551190822-a9333d879b1f"),
      },
    ],
    tech: [
      {
        title: "Ultrasonido ginecológico",
        desc: "Ventanas acordadas para primera vez o control.",
        img: U("photo-1551601651-2a8555f1a136"),
      },
      {
        title: "Biopsia ambulatoria",
        desc: "Cuando el protocolo lo indica, con analgesia adecuada.",
        img: U("photo-1579684385127-1ef15d5081de"),
      },
      {
        title: "Educación perinatal",
        desc: "Material y sesiones para pareja y familia.",
        img: U("photo-1584515933487-779824d29309"),
      },
    ],
    gallery: [
      U("photo-1551601651-2a8555f1a136"),
      U("photo-1573496359142-b8d87734a5a2"),
      U("photo-1584515933487-779824d29309"),
      U("photo-1579684385127-1ef15d5081de"),
    ],
    faqKey: "ginecologia",
    darkTitle: "Decisiones compartidas, siempre.",
    darkText:
      "Te explicamos opciones de tratamiento y respetamos tus tiempos, incluida la planificación familiar.",
    ctaTitulo: "Agendar ginecología",
  },
  neurologia: {
    eyebrow: "Cerebro y nervios periféricos",
    heroTitulo: "Claridad ante el vértigo y la migraña.",
    heroSub:
      "Cefalea, mareos, memoria y trastornos del sueño: exploración detallada y estudios solo cuando cambian el plan.",
    stats: [
      ["6,500+", "CONSULTAS"],
      ["1", "NEURÓLOGO"],
      ["EEG", "PROGRAMADO"],
      ["DIARIO", "DE MIGRAÑA"],
    ],
    servicioDesc: [
      "Clasificación de cefalea y plan anti-crisis.",
      "Vértigo periférico vs central con maniobras y videonistagmografía aliada.",
      "Parkinson temprano y temblor esencial: seguimiento fino.",
      "Neuropatías diabéticas y déficit de vitamina B12.",
    ],
    steps: [
      {
        title: "Cuaderno de crisis",
        text: "Patrón de sueño, alimentación y desencadenantes.",
        img: U("photo-1545389336-cf090694435e"),
      },
      {
        title: "Exploración neurológica",
        text: "Marcha, reflejos, pares y coordinación documentados.",
        img: U("photo-1551190822-a9333d879b1f"),
      },
      {
        title: "Estudios focalizados",
        text: "RM, EEG o potenciales según criterio estricto.",
        img: U("photo-1579684385127-1ef15d5081de"),
      },
      {
        title: "Plan farmacológico prudente",
        text: "Dosis mínima efectiva y revisiones programadas.",
        img: U("photo-1519494026892-80bbd2d6fd0d"),
      },
    ],
    tech: [
      {
        title: "Electroencefalograma",
        desc: "Indicaciones claras y ambiente tranquilo.",
        img: U("photo-1551190822-a9333d879b1f"),
      },
      {
        title: "Alianza con imagen",
        desc: "Resonancia con protocolos neurológicos en centros aliados.",
        img: U("photo-1576091160399-112ba8d25d1d"),
      },
      {
        title: "Sueño y autonomía",
        desc: "Higiene del sueño y estrategias no farmacológicas primero.",
        img: U("photo-1545389336-cf090694435e"),
      },
    ],
    gallery: [
      U("photo-1545389336-cf090694435e"),
      U("photo-1551190822-a9333d879b1f"),
      U("photo-1579684385127-1ef15d5081de"),
      U("photo-1519494026892-80bbd2d6fd0d"),
    ],
    faqKey: "neurologia",
    darkTitle: "Menos estudios, más contexto.",
    darkText:
      "Pedimos imagen o electrofisiología solo cuando el resultado cambia lo que haremos por ti.",
    ctaTitulo: "Agendar neurología",
  },
  nutricion: {
    eyebrow: "Nutrición clínica",
    heroTitulo: "Planes que sí vives.",
    heroSub:
      "Sobrepeso, diabetes, embarazo y rendimiento: metas realistas, cocina cotidiana y seguimiento con composición corporal.",
    stats: [
      ["4,000+", "PLANES"],
      ["1", "NUTRIÓLOGA"],
      ["LAB", "INTERPRETADO"],
      ["FAMILIA", "INCLUIDA"],
    ],
    servicioDesc: [
      "Educación alimentaria sin modas ni restricciones extremas.",
      "Control glucémico con lista de compras y ejemplos de platos.",
      "Embarazo y lactancia con energía y hierro adecuados.",
      "Deportistas: hidratación, macros y periodización simple.",
    ],
    steps: [
      {
        title: "Historia dietética",
        text: "Horarios, presupuesto y cocina disponible.",
        img: U("photo-1490645935967-10de6ba17061"),
      },
      {
        title: "Composición corporal",
        text: "Grasa visceral y músculo como guía, no obsesión.",
        img: U("photo-1571019613454-1cb2f99b2d8b"),
      },
      {
        title: "Plan semanal",
        text: "Desayunos, comidas y cenas con intercambios.",
        img: U("photo-1547592166-23ac45744acd"),
      },
      {
        title: "Seguimiento",
        text: "Ajustes mensuales y laboratorio cuando toca.",
        img: U("photo-1512621776951-a57141f2eefd"),
      },
    ],
    tech: [
      {
        title: "Bioimpedancia",
        desc: "Segmentada para ver evolución real.",
        img: U("photo-1571019613454-1cb2f99b2d8b"),
      },
      {
        title: "Recetario Vivanta",
        desc: "Ideas con ingredientes de Querétaro y supermercado común.",
        img: U("photo-1490645935967-10de6ba17061"),
      },
      {
        title: "Integración médica",
        desc: "Misma historia con medicina general y endocrinología.",
        img: U("photo-1579684385127-1ef15d5081de"),
      },
    ],
    gallery: [
      U("photo-1490645935967-10de6ba17061"),
      U("photo-1512621776951-a57141f2eefd"),
      U("photo-1547592166-23ac45744acd"),
      U("photo-1571019613454-1cb2f99b2d8b"),
    ],
    faqKey: "nutricion",
    darkTitle: "Nutrición sin culpa, con números.",
    darkText:
      "Vemos laboratorio y plato al mismo tiempo: menos mitos, más hábitos sostenibles.",
    ctaTitulo: "Agendar nutrición",
  },
};

export function tienePaginaCompleta(slug: string): slug is keyof typeof ESP_DETALLE {
  return slug in ESP_DETALLE;
}
