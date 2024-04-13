export const driverAttributes: AttributeCategory[] = [
  {
    name: 'Thiele & Small parameters',
    attributes: {
      fs: {
        name: 'Resonance frequency (free air)',
        symbol: 'fS',
        units: 'Hz',
      },
      qms: {
        name: 'Mechanical quality factor',
        symbol: 'QMS',
      },
      qes: {
        name: 'Electrical quality factor',
        symbol: 'QES',
      },
      qts: {
        name: 'Total quality factor',
        symbol: 'QTS',
      },
    },
  },
  {
    name: 'Large signal parameters',
    attributes: {
      x_max: {
        name: 'Max linear excursion',
        symbol: 'xmax',
        units: 'mm',
      },
      x_lim: {
        name: 'Max excursion before damage',
        symbol: 'xlim',

        units: 'mm',
      },
      vd: {
        name: 'Air volume displaced at xmax',
        symbol: 'VD',
        units: 'cm³',
      },
      p_w: { name: 'Power handling', symbol: 'P', units: 'W' },
      p_max: { name: 'Program power', symbol: 'Pmax', units: 'W' },
    },
  },
  {
    name: 'Voice Coil',
    attributes: {
      z: { name: 'Nominal impedance', symbol: 'Z', units: 'Ω' },
      re: { name: 'DC resistance', symbol: 'RE', units: 'Ω' },
      le: {
        name: 'Inductance (1kHz)',
        symbol: 'LE',

        units: 'mH',
      },
      vc_diam: { name: 'VC Diameter', units: 'mm' },
      vc_material: { name: 'Winding material', type: 'string' },
      vc_former: { name: 'Former material', type: 'string' },
    },
  },
  {
    name: 'Magnet',
    attributes: {
      bl: { name: 'Force factor', symbol: 'Bl', units: 'N/A' },
      blre: {
        name: 'Motor constant',
        symbol: 'Bl/√RE',
        units: 'N/√W',
      },
      air_gap: { name: 'Air gap height', symbol: 'HAG', units: 'mm' },
      magnet_weight_kg: { name: 'Weight', units: 'kg' },
      magnet: { name: 'Material', type: 'string' },
    },
  },
  {
    name: 'Diaphragm',
    attributes: {
      dd: { name: 'Effective diameter', units: 'mm' },
      sd: { name: 'Effective area', symbol: 'SD', units: 'cm²' },
      mms: { name: 'Moving mass', symbol: 'MMS', units: 'g' },
      mmd: {
        name: 'Moving mass (without air load)',
        symbol: 'MMD',
        units: 'g',
      },
      diaphragm_material: { name: 'Material', type: 'string' },
    },
  },
  {
    name: 'Suspensions',
    attributes: {
      kms: { name: 'Stiffness', symbol: 'KMS', units: 'N/mm' },
      cms: { name: 'Compliance', symbol: 'CMS', units: 'µm/N' },
      vas: {
        name: 'Equivalent volume to the compliance',
        symbol: 'VAS',
        units: 'L',
      },
      rms: {
        name: 'Mechanical resistance',
        symbol: 'RMS',

        units: 'N·s/m',
      },
      surround_material: { name: 'Surround material', type: 'string' },
    },
  },
  {
    name: 'Dimensions',
    attributes: {
      size: { name: 'Size', units: 'mm' },
      size_inches: { name: 'Size', units: '"' },
      diam: { name: 'Overall diameter', units: 'mm' },
      mounting_diam: { name: 'Baffle cutout diameter', units: 'mm' },
      depth: { name: 'Overall depth', units: 'mm' },
      volume: { name: 'Volume occupied by the driver', units: 'L' },
      weight_kg: { name: 'Net weight', units: 'kg' },
      frame_material: { name: 'Frame material', type: 'string' },
    },
  },
];

export interface AttributeCategory {
  name: string;
  attributes: Record<string, Attribute>;
}

export interface Attribute {
  name: string;
  symbol?: string;
  units?: string;
  type?: string;
}
