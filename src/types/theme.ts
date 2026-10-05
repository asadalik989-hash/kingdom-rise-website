export interface ColorSchemeConfig {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  primary: string;
  primaryHover: string;
  primaryDark: string;
  primaryLight: string;
  accent: string;
  accentHover: string;
  accentDark: string;
  accentLight: string;
  canvas: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  badge?: string;
  isPreviousScheme?: boolean;
}

export const COLOR_SCHEMES: ColorSchemeConfig[] = [
  {
    id: 'amber-gold',
    name: 'Royal Amber & Obsidian Gold',
    subtitle: 'Refined Heritage Scheme (Active)',
    description: 'Upgraded previous scheme combining rich Saudi architectural amber gold, radiant sunlit highlights, and deep obsidian slate.',
    primary: '#D97706',       // Rich architectural amber gold
    primaryHover: '#B45309',  // Burnished ochre
    primaryDark: '#78350F',   // Deep bronze amber
    primaryLight: '#FEF3C7',  // Soft champagne glow
    accent: '#F59E0B',        // Radiant desert sun gold
    accentHover: '#D97706',
    accentDark: '#B45309',
    accentLight: '#FFFBEB',
    canvas: '#FAF8F5',        // Warm alabaster canvas
    surface: '#FFFFFF',
    text: '#1E293B',          // Deep navy charcoal for optimal contrast
    muted: '#78716C',         // Warm stone muted
    border: '#E7E5E4',
    badge: 'Previous Refined',
    isPreviousScheme: true,
  },
  {
    id: 'classic-amber-navy',
    name: 'Heritage Amber & Royal Navy',
    subtitle: 'Dual-Tone Previous Combination',
    description: 'Enhanced previous dual-tone palette pairing Saudi desert amber with deep imperial royal navy for dramatic contrast.',
    primary: '#D97706',       // Desert amber gold
    primaryHover: '#B45309',
    primaryDark: '#78350F',
    primaryLight: '#FEF3C7',
    accent: '#1E3A8A',        // Midnight royal navy accent
    accentHover: '#172554',
    accentDark: '#0F172A',
    accentLight: '#EFF6FF',
    canvas: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A',
    muted: '#64748B',
    border: '#E2E8F0',
    badge: 'Previous Dual-Tone',
    isPreviousScheme: true,
  },
  {
    id: 'warm-bronze-sand',
    name: 'Burnished Bronze & Desert Sand',
    subtitle: 'Warm Earth Previous Combination',
    description: 'Rich earth-toned previous combination featuring burnished Saudi bronze, luminous ochre, and warm travertine stone.',
    primary: '#B45309',       // Burnished Saudi Bronze
    primaryHover: '#92400E',
    primaryDark: '#78350F',
    primaryLight: '#FEF3C7',
    accent: '#F59E0B',        // Sunlit desert amber
    accentHover: '#D97706',
    accentDark: '#B45309',
    accentLight: '#FFFBEB',
    canvas: '#FCF9F5',
    surface: '#FFFFFF',
    text: '#1C1917',
    muted: '#78716C',
    border: '#E7E5E4',
    badge: 'Previous Earth',
    isPreviousScheme: true,
  },
  {
    id: 'blue-teal',
    name: 'Kingdom Cobalt & Coastal Teal',
    subtitle: 'Corporate Standard',
    description: 'Corporate engineering specification with royal cobalt blue and luminous coastal teal.',
    primary: '#0052CC',       // Royal cobalt
    primaryHover: '#0041A3',
    primaryDark: '#002D70',
    primaryLight: '#EBF2FC',
    accent: '#00C7AE',        // Coastal teal
    accentHover: '#00B39D',
    accentDark: '#009683',
    accentLight: '#E6FAF7',
    canvas: '#F4F7FA',        // Cool pearl canvas
    surface: '#FFFFFF',
    text: '#1E293B',
    muted: '#64748B',
    border: '#E2E8F0',
    badge: 'Corporate Standard',
  },
  {
    id: 'emerald-vision',
    name: 'Vision 2030 Emerald & Jade',
    subtitle: 'National Infrastructure',
    description: 'Inspired by Saudi Vision 2030 green initiatives, sustainable architecture, and oasis palms.',
    primary: '#047857',       // Saudi royal emerald
    primaryHover: '#065F46',
    primaryDark: '#064E3B',
    primaryLight: '#ECFDF5',
    accent: '#10B981',        // Vibrant jade mint
    accentHover: '#059669',
    accentDark: '#047857',
    accentLight: '#D1FAE5',
    canvas: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A',
    muted: '#64748B',
    border: '#E2E8F0',
    badge: 'Vision 2030',
  },
  {
    id: 'steel-titanium',
    name: 'Structural Steel & Titanium',
    subtitle: 'Heavy Civil Infrastructure',
    description: 'Engineered high-contrast palette for industrial mega-projects and structural fabrication.',
    primary: '#2563EB',       // Structural electric blue
    primaryHover: '#1D4ED8',
    primaryDark: '#1E3A8A',
    primaryLight: '#EFF6FF',
    accent: '#06B6D4',        // High-tech cyan
    accentHover: '#0891B2',
    accentDark: '#0E7490',
    accentLight: '#ECFEFF',
    canvas: '#F1F5F9',
    surface: '#FFFFFF',
    text: '#0F172A',
    muted: '#475569',
    border: '#CBD5E1',
    badge: 'Heavy Civil',
  },
];
