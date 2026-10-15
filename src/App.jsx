import React, { useState, useMemo, useEffect } from 'react';
import {
  FlaskConical,
  Sprout,
  Paintbrush,
  Droplets,
  Sparkles,
  Search,
  ShoppingCart,
  Moon,
  Sun,
  X,
  Plus,
  Trash2,
  CheckCircle,
  FileText,
  ShieldCheck,
  Globe2,
  Clock,
  Award,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Package,
  Layers,
  Send,
  Check,
  AlertCircle,
  Menu,
  Truck,
  Headphones,
  ClipboardCheck,
  Building2,
  BadgeCheck
} from 'lucide-react';

// ==========================================
// 40 COMPREHENSIVE INDUSTRIAL CHEMICAL PRODUCTS
// ==========================================
const CHEMICAL_PRODUCTS = [
  // 1. Pharmaceuticals & Healthcare (8 products)
  {
    id: 'pharma-1',
    name: 'Purified Glycerin USP / BP',
    cas: '56-81-5',
    formula: 'C3H8O3',
    grade: 'Pharma / USP / BP',
    category: 'Pharmaceuticals & Healthcare',
    packaging: '250 kg HDPE Drums',
    packOptions: ['250 kg HDPE Drums', '1250 kg IBC Tote', '24 MT ISO Tank'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    description: 'High-purity vegetable-derived glycerin 99.7% conforming to USP and European Pharmacopoeia standards. Essential humectant, solvent, and sweetening agent in syrups, cough elixirs, and topical formulations.',
    applications: ['Cough Syrups & Elixirs', 'Topical Ointments & Creams', 'Oral Care Formulations', 'Gelatin Capsule Plasticizer'],
    specifications: {
      'Assay (Purity)': '≥ 99.7% min',
      'Appearance': 'Clear, colorless viscous liquid',
      'Specific Gravity @ 25°C': '1.261 - 1.263',
      'Refractive Index @ 20°C': '1.4740 - 1.4753',
      'Heavy Metals (Pb)': '< 5 ppm',
      'Water Content (KF)': '≤ 0.3%',
      'Sulphated Ash': '≤ 0.01%',
      'Chlorides & Sulfates': 'Passes USP tests'
    }
  },
  {
    id: 'pharma-2',
    name: 'Isopropyl Alcohol (IPA) USP',
    cas: '67-63-0',
    formula: 'C3H8O',
    grade: 'USP / Electronic Grade',
    category: 'Pharmaceuticals & Healthcare',
    packaging: '160 kg Mild Steel Drums',
    packOptions: ['160 kg MS Drums', '160 kg HDPE Drums', '1000 L IBC', 'Road Tankers'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-pure Isopropanol with 99.9% min assay. Critical pharmaceutical processing solvent, cleanroom disinfectant, sanitizing agent, and extractant for botanical and active ingredients.',
    applications: ['Hospital Surface Disinfection', 'API Extraction Solvent', 'Medical Wipe Solutions', 'Sterile Cleanroom Sanitizer'],
    specifications: {
      'Purity (GC)': '≥ 99.90%',
      'Water (Moisture)': '≤ 0.10%',
      'Acidity (as Acetic)': '≤ 0.002%',
      'Non-Volatile Residue': '≤ 10 mg/L',
      'Appearance': 'Clear, water-white liquid',
      'Density @ 20°C': '0.785 - 0.787 g/cm³',
      'Distillation Range': '82.0°C - 83.0°C',
      'Benzene Content': '< 2 ppm'
    }
  },
  {
    id: 'pharma-3',
    name: 'Sodium Bicarbonate Pharma Grade',
    cas: '144-55-8',
    formula: 'NaHCO3',
    grade: 'IP / BP / USP',
    category: 'Pharmaceuticals & Healthcare',
    packaging: '25 kg Multi-wall Paper Bags',
    packOptions: ['25 kg Paper Bags with PE liner', '50 kg HDPE Bags', '1000 kg Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80',
    description: 'Pharmaceutical grade sodium bicarbonate engineered for effervescent tablets, hemodialysis solutions, and antacid oral suspensions with strictly controlled carbonate and iron impurities.',
    applications: ['Hemodialysis Solutions', 'Effervescent Granules', 'Antacid Suspensions', 'pH Buffer in Injections'],
    specifications: {
      'Assay (Dry Basis)': '99.0% - 100.5%',
      'pH of 1% Solution': '8.0 - 8.6',
      'Loss on Drying': '≤ 0.25%',
      'Carbonate (Na2CO3)': 'Passes USP Limit',
      'Heavy Metals (Pb)': '≤ 5 ppm',
      'Arsenic (As)': '≤ 2 ppm',
      'Iron (Fe)': '≤ 10 ppm',
      'Chloride (Cl)': '≤ 150 ppm'
    }
  },
  {
    id: 'pharma-4',
    name: 'Citric Acid Monohydrate',
    cas: '5949-29-1',
    formula: 'C6H8O7·H2O',
    grade: 'Pharma / Food / IP / BP',
    category: 'Pharmaceuticals & Healthcare',
    packaging: '25 kg Kraft Paper Bags',
    packOptions: ['25 kg Kraft Bags', '50 lb Bags', '1000 kg PP Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    description: 'Natural fermentation-derived citric acid monohydrate crystalline powder. Functions as an effervescent couple, acidulant, chelating agent, and pH regulator in pharmaceuticals and nutritional effervescents.',
    applications: ['Effervescent Formulations', 'Taste Masking & Acidulant', 'Blood Anticoagulant Formulations', 'Syrup Preservative Buffer'],
    specifications: {
      'Assay': '99.5% - 101.0%',
      'Water Content': '7.5% - 8.8%',
      'Appearance': 'White crystalline granules',
      'Sulphated Ash': '≤ 0.05%',
      'Oxalate': '≤ 100 ppm',
      'Sulfate': '≤ 150 ppm',
      'Heavy Metals': '≤ 5 ppm',
      'Clarity of Solution': 'Passes test'
    }
  },
  {
    id: 'pharma-5',
    name: 'Microcrystalline Cellulose MCC 101/102',
    cas: '9004-34-6',
    formula: '(C6H10O5)n',
    grade: 'Pharma / USP / NF',
    category: 'Pharmaceuticals & Healthcare',
    packaging: '20 kg Fibre Drums',
    packOptions: ['20 kg Fibre Drums', '25 kg Kraft Paper Bags'],
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    description: 'Purified, partially depolymerized alpha-cellulose spray-dried into free-flowing spherical microparticles. The global gold-standard binder and diluent for direct compression tableting.',
    applications: ['Direct Compression Tablets', 'Hard Capsule Filling', 'Sustained-Release Pellets', 'Oral Suspension Thickener'],
    specifications: {
      'Loss on Drying': '≤ 5.0% (MCC 102)',
      'pH': '5.0 - 7.5',
      'Bulk Density': '0.28 - 0.34 g/cm³',
      'Conductivity': '≤ 75 µS/cm',
      'Residue on Ignition': '≤ 0.05%',
      'Heavy Metals': '≤ 10 ppm',
      'Particle Size (d50)': '50 µm (101) / 100 µm (102)',
      'Total Viable Aerobic Count': '≤ 1000 CFU/g'
    }
  },
  {
    id: 'pharma-6',
    name: 'Povidone Iodine PVP-I',
    cas: '25655-41-8',
    formula: '(C6H9NO)n·xI',
    grade: 'USP / EP',
    category: 'Pharmaceuticals & Healthcare',
    packaging: '25 kg Fibre Drums',
    packOptions: ['25 kg Fibre Drums with dual PE liners', '10 kg Poly Pails'],
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80',
    description: 'Complex of Polyvinylpyrrolidone with iodine providing broad-spectrum topical antiseptic efficacy against bacteria, viruses, and fungi with minimum skin irritation.',
    applications: ['Surgical Scrub & Prep Solutions', 'Wound Dressing Formulations', 'Gargle & Mouthwash Actives', 'Veterinary Antiseptic Sprays'],
    specifications: {
      'Available Iodine': '9.0% - 12.0%',
      'Loss on Drying': '≤ 8.0%',
      'Residue on Ignition': '≤ 0.025%',
      'Heavy Metals': '≤ 20 ppm',
      'Iodide Ion (I⁻)': '≤ 6.6%',
      'Nitrogen Content': '9.5% - 11.5%',
      'Appearance': 'Yellow-brown amorphous powder',
      'Solubility': 'Completely soluble in water'
    }
  },
  {
    id: 'pharma-7',
    name: 'Propylene Glycol USP',
    cas: '57-55-6',
    formula: 'C3H8O2',
    grade: 'Pharma / USP / EP',
    category: 'Pharmaceuticals & Healthcare',
    packaging: '215 kg Steel / HDPE Drums',
    packOptions: ['215 kg HDPE Drums', '1000 L IBC Tote', '22 MT ISO Tanker'],
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-pure 1,2-propanediol exceeding 99.8% assay. Clear, viscous, odorless pharmaceutical vehicle, humectant, and co-solvent in injectable, topical, and oral formulations.',
    applications: ['Injectable Drug Co-solvent', 'Oral Syrups & Drops', 'Ophthalmic Formulations', 'Cosmetic Emollient Base'],
    specifications: {
      'Purity (GC)': '≥ 99.8%',
      'Specific Gravity @ 25°C': '1.035 - 1.037',
      'Water Content': '≤ 0.2%',
      'Acidity (as Acetic)': '≤ 0.005%',
      'Heavy Metals (Pb)': '< 5 ppm',
      'Residue on Ignition': '≤ 0.005%',
      'Chlorides': '≤ 1 ppm',
      'Appearance': 'Viscous clear odorless liquid'
    }
  },
  {
    id: 'pharma-8',
    name: 'Liquid Paraffin Heavy & Light',
    cas: '8042-47-5',
    formula: 'Mineral Oil (Hydrocarbons)',
    grade: 'IP / BP / USP',
    category: 'Pharmaceuticals & Healthcare',
    packaging: '175 kg New Steel Drums',
    packOptions: ['175 kg Steel Drums', '200 L HDPE Drums', 'Tanker Loads'],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    description: 'Highly refined pharmaceutical-grade white mineral oil transparent, free from fluorescence, sulfur, or aromatic compounds. Lubricant laxative and dermatological ointment base.',
    applications: ['Ointment Base & Emulsions', 'Capsule Lubrication', 'Dermatological Barrier Creams', 'Oral Laxative Suspensions'],
    specifications: {
      'Kinematic Viscosity @ 40°C': '64 - 70 cSt (Heavy) / 15 - 25 cSt (Light)',
      'Density @ 20°C': '0.860 - 0.890 g/cm³',
      'Solid Paraffins': 'Passes pharmacopoeia test',
      'Sulfur Compounds': 'Absent / Negative',
      'Readily Carbonizable Substances': 'Passes test',
      'Acidity / Alkalinity': 'Neutral to litmus',
      'Odor & Color': 'Odorless, water-white transparent'
    }
  },

  // 2. Agriculture & Fertilizers (8 products)
  {
    id: 'agri-1',
    name: 'Zinc Sulphate Heptahydrate 21% Zn',
    cas: '7446-20-0',
    formula: 'ZnSO4·7H2O',
    grade: 'Fertilizer & Feed Grade / FCO',
    category: 'Agriculture & Fertilizers',
    packaging: '25 kg HDPE Laminated Bags',
    packOptions: ['25 kg HDPE Bags', '50 kg Woven Bags', '1000 kg Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80',
    description: 'Premium crystalline fertilizer grade Zinc Sulphate containing 21% elemental Zinc. Fast-dissolving micronutrient providing rapid correction of zinc deficiency in cereal, paddy, and horticultural crops.',
    applications: ['Soil Basal Application', 'Foliar Nutrient Sprays', 'Fertigation & Drip Systems', 'Animal Feed Mineral Premix'],
    specifications: {
      'Elemental Zinc (Zn)': '≥ 21.0% min',
      'Sulfur (S)': '≥ 10.0%',
      'Lead (Pb)': '< 15 ppm',
      'Cadmium (Cd)': '< 5 ppm',
      'Arsenic (As)': '< 10 ppm',
      'pH of 5% Solution': '4.0 - 5.5',
      'Matter Insoluble in Water': '≤ 0.05%',
      'Appearance': 'Sparkling white crystalline granules'
    }
  },
  {
    id: 'agri-2',
    name: 'Copper Sulphate Pentahydrate 24.5% Cu',
    cas: '7758-99-8',
    formula: 'CuSO4·5H2O',
    grade: 'Agri Grade / Technical 99%',
    category: 'Agriculture & Fertilizers',
    packaging: '25 kg HDPE Bags with inner PE',
    packOptions: ['25 kg Woven Bags', '50 kg Bags', '1000 kg Bulk Sacks'],
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    description: 'Vibrant blue crystalline copper sulphate pentahydrate with 24.5% copper. Critical active ingredient for Bordeaux mixture, agricultural fungicides, algicide, and animal feed mineral premixes.',
    applications: ['Bordeaux Mixture Fungicide', 'Algicide for Irrigation Ponds', 'Correction of Cu Deficiencies', 'Feed Grade Trace Mineral'],
    specifications: {
      'Copper (Cu)': '≥ 24.5% min',
      'Assay (CuSO4·5H2O)': '≥ 98.5% min',
      'Iron (Fe)': '≤ 0.15%',
      'Insoluble Matter': '≤ 0.1%',
      'Lead (Pb)': '< 20 ppm',
      'Arsenic (As)': '< 10 ppm',
      'pH (5% aq)': '3.5 - 4.5',
      'Appearance': 'Bright blue crystals'
    }
  },
  {
    id: 'agri-3',
    name: 'Magnesium Sulphate Epsom Salt',
    cas: '10034-99-8',
    formula: 'MgSO4·7H2O',
    grade: 'FCO Agri & Horticultural Grade',
    category: 'Agriculture & Fertilizers',
    packaging: '50 kg PP Bags',
    packOptions: ['25 kg Bags', '50 kg PP Woven Bags', '1200 kg Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    description: 'High-solubility magnesium sulphate heptahydrate providing 9.6% Mg and 12% S. Directly strengthens chlorophyll synthesis and enzymatic activation in high-yield crops.',
    applications: ['Drip Fertigation', 'Chlorophyll Boosting Sprays', 'Hydroponics Formulations', 'Specialty NPK Blends'],
    specifications: {
      'Magnesium (as Mg)': '≥ 9.6% min',
      'Magnesium Oxide (MgO)': '≥ 16.0% min',
      'Sulfur (S)': '≥ 12.0%',
      'Water Insoluble': '≤ 0.05%',
      'pH (5% solution)': '6.0 - 7.5',
      'Heavy Metals (Pb)': '< 10 ppm',
      'Appearance': 'Small clear needle-like crystals'
    }
  },
  {
    id: 'agri-4',
    name: 'Potassium Humate 85% Flakes',
    cas: '68514-28-3',
    formula: 'Humic Acid Potassium Salt',
    grade: 'Bio-Stimulant Grade 100% Soluble',
    category: 'Agriculture & Fertilizers',
    packaging: '25 kg Kraft Paper Bags',
    packOptions: ['25 kg Kraft Bags with foil liner', '1 kg Consumer Pouches (in master carton)'],
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    description: '100% water-soluble shiny black potassium humate flakes extracted from top-grade leonardite. Enhances soil cation exchange capacity (CEC), stimulates root growth, and increases fertilizer uptake efficiency.',
    applications: ['Soil Conditioner & CEC Enhancer', 'Root Growth Bio-Stimulant', 'Drip Fertigation Mixes', 'Foliar Fertilizer Carrier'],
    specifications: {
      'Humic Acid (dry basis)': '≥ 65.0%',
      'Fulvic Acid': '≥ 15.0%',
      'Potassium (as K2O)': '≥ 10.0%',
      'Water Solubility': '≥ 99.5% (Non-clogging)',
      'Moisture': '≤ 15.0%',
      'pH Range': '9.0 - 10.5',
      'Appearance': 'Shiny black crystal flakes'
    }
  },
  {
    id: 'agri-5',
    name: 'Ferrous Sulphate Heptahydrate 19% Fe',
    cas: '7782-63-0',
    formula: 'FeSO4·7H2O',
    grade: 'Agri / Technical / FCO Grade',
    category: 'Agriculture & Fertilizers',
    packaging: '50 kg HDPE Bags with inner PE',
    packOptions: ['50 kg HDPE Woven Bags', '1000 kg FIBC Bags'],
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    description: 'Green crystalline copperas compound supplying 19% bio-available ferrous iron. Prevents iron chlorosis in acidic/alkaline soils, lawn moss management, and animal nutrition.',
    applications: ['Iron Chlorosis Correction', 'Soil pH Neutralization', 'Lawn Turf Moss Treatment', 'Industrial Trace Element Premix'],
    specifications: {
      'Iron (as Fe)': '≥ 19.0% min',
      'Sulfur (S)': '≥ 10.5%',
      'Lead (Pb)': '< 25 ppm',
      'Insoluble Matter': '≤ 0.2%',
      'Free Acid': '≤ 0.5%',
      'Appearance': 'Bluish-green crystalline granules'
    }
  },
  {
    id: 'agri-6',
    name: 'Borax Decahydrate 11% B',
    cas: '1303-96-4',
    formula: 'Na2B4O7·10H2O',
    grade: 'Agri Micronutrient Grade',
    category: 'Agriculture & Fertilizers',
    packaging: '25 kg Bags',
    packOptions: ['25 kg Kraft Bags', '50 kg Bags', '1000 kg Bulk Sacks'],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    description: 'Standard sodium tetraborate decahydrate with 11% boron. Critical for flowering, pollen germination, cell wall development, and fruit setting in cotton, pulses, and oilseed crops.',
    applications: ['Soil Boron Basal Treatment', 'Fruit Set Optimization', 'Foliar Boron Nutrition', 'Liquid Micronutrient Complexes'],
    specifications: {
      'Boron (as B)': '≥ 10.5% - 11.3%',
      'B2O3 Content': '≥ 36.5%',
      'Purity': '≥ 99.5%',
      'Sulfate (SO4)': '≤ 50 ppm',
      'Chloride': '≤ 35 ppm',
      'Iron (Fe)': '≤ 10 ppm',
      'Appearance': 'White granular crystalline powder'
    }
  },
  {
    id: 'agri-7',
    name: 'Manganese Sulphate Monohydrate 31.8% Mn',
    cas: '10034-96-5',
    formula: 'MnSO4·H2O',
    grade: 'Agri Micronutrient / Feed Grade',
    category: 'Agriculture & Fertilizers',
    packaging: '25 kg Woven Bags',
    packOptions: ['25 kg HDPE Bags', '50 kg Bags', '1000 kg Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    description: 'High-grade pale pink powder delivering 31.8% manganese. Essential catalyst for chlorophyll synthesis, nitrate assimilation, and oxidation-reduction reactions in crop physiology.',
    applications: ['Soil Micronutrient Blend', 'Foliar Spray for Cereals & Citrus', 'Fertigation Formulations', 'Animal Mineral Premix'],
    specifications: {
      'Manganese (as Mn)': '≥ 31.8% min',
      'Purity (MnSO4·H2O)': '≥ 98.0%',
      'Insoluble Matter': '≤ 0.05%',
      'Heavy Metals (Pb)': '< 10 ppm',
      'Arsenic (As)': '< 5 ppm',
      'Chloride': '≤ 0.01%',
      'Appearance': 'Light pink free-flowing powder'
    }
  },
  {
    id: 'agri-8',
    name: 'Chelated Micronutrient EDTA Mix',
    cas: 'Chelate-Mix',
    formula: 'EDTA (Zn, Fe, Cu, Mn, B, Mo)',
    grade: 'Agri High Efficiency 100% Chelated',
    category: 'Agriculture & Fertilizers',
    packaging: '25 kg Fibre Drums',
    packOptions: ['25 kg Fibre Drums', '5 kg HDPE Poly Jars', '1 kg Aluminum Foil Bags'],
    image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=800&q=80',
    description: 'Multi-element balanced micronutrient complex 100% chelated with EDTA. Prevents and rectifies multiple micronutrient deficiencies simultaneously across diverse pH ranges without soil lockup.',
    applications: ['Hi-Tech Drip Irrigation', 'Greenhouse Hydroponics', 'Commercial Foliar Feeding', 'Orchard Nutrition Sprays'],
    specifications: {
      'Chelated Zinc (Zn)': '3.0%',
      'Chelated Iron (Fe)': '4.0%',
      'Chelated Manganese (Mn)': '2.0%',
      'Chelated Copper (Cu)': '0.5%',
      'Boron (B)': '0.5%',
      'Molybdenum (Mo)': '0.05%',
      'Chelating Agent': 'EDTA Di-Sodium Salt',
      'Water Solubility': '100% instant solubility'
    }
  },

  // 3. Paints, Coatings & Inks (8 products)
  {
    id: 'paints-1',
    name: 'Titanium Dioxide Rutile TiO2 R-996',
    cas: '13463-67-7',
    formula: 'TiO2',
    grade: 'Industrial Rutile Grade',
    category: 'Paints, Coatings & Inks',
    packaging: '25 kg Valve Paper Bags',
    packOptions: ['25 kg Multi-wall Paper Bags', '500 kg Bags', '1000 kg Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    description: 'Sulfate-process rutile pigment treated with zirconia and alumina. Exhibits outstanding opacity, high tinting strength, superior weatherability, and easy dispersion in architectural and industrial coatings.',
    applications: ['Architectural Exterior Paints', 'Automotive OEM Coatings', 'Masterbatches & Plastics', 'Printing Inks & Coil Coatings'],
    specifications: {
      'TiO2 Content': '≥ 94.0%',
      'Rutile Crystal Content': '≥ 98.0%',
      'Color (L*)': '≥ 95.0',
      'Tinting Strength (Reynolds)': '≥ 1850',
      'Oil Absorption': '18 - 21 g/100g',
      'Resistivity (30°C)': '≥ 8000 Ω·cm',
      'pH of Aqueous Suspension': '6.5 - 8.5',
      'Residue on 45µm Sieve': '≤ 0.02%'
    }
  },
  {
    id: 'paints-2',
    name: 'Epoxy Resin E-51 Bisphenol-A',
    cas: '25068-38-6',
    formula: 'C21H24O4',
    grade: 'Liquid Standard Resin',
    category: 'Paints, Coatings & Inks',
    packaging: '240 kg Steel Drums',
    packOptions: ['20 kg Jerry Cans', '240 kg Steel Drums', '1200 kg IBC'],
    image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80',
    description: 'Standard unmodified liquid Bisphenol-A / Epichlorohydrin epoxy resin (EEW 184-194). Exceptional chemical resistance, mechanical strength, and electrical insulation for high-performance protective coatings.',
    applications: ['Industrial Heavy-Duty Flooring', 'Marine Anti-Corrosion Paints', 'Electrical Potting & Encapsulation', 'Structural Adhesives & Composites'],
    specifications: {
      'Epoxide Equivalent Weight (EEW)': '184 - 194 g/eq',
      'Epoxy Value': '0.51 - 0.54 eq/100g',
      'Viscosity @ 25°C': '11,000 - 14,000 mPa·s',
      'Color (Gardner)': '≤ 1.0 max',
      'Hydrolyzable Chlorine': '≤ 0.05%',
      'Volatile Matter': '≤ 0.2%',
      'Appearance': 'Clear transparent liquid'
    }
  },
  {
    id: 'paints-3',
    name: 'Mixed Xylene Solvent',
    cas: '1330-20-7',
    formula: 'C8H10',
    grade: 'Industrial / Pure Grade',
    category: 'Paints, Coatings & Inks',
    packaging: '180 kg Steel Drums',
    packOptions: ['180 kg MS Drums', 'ISO Tank Containers', 'Road Tankers'],
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    description: 'High-purity aromatic solvent blend of ortho-, meta-, and para-xylene with ethylbenzene. Provides balanced evaporation rates, high solvency power, and superior flow in polyurethane and alkyd paints.',
    applications: ['Paint Thinners & Reducers', 'Alkyd Resin Synthesis Solvent', 'Rubber Adhesives Formulation', 'Agrochemical Emulsifiable Concentrates'],
    specifications: {
      'Total Xylene Isomers + Ethylbenzene': '≥ 99.0% min',
      'Benzene Content': '≤ 0.01%',
      'Toluene Content': '≤ 0.5%',
      'Distillation Range': '137°C - 143°C',
      'Specific Gravity @ 20°C': '0.860 - 0.870',
      'Flash Point': '27°C (Closed Cup)',
      'Water Content': '≤ 0.03%',
      'Appearance': 'Clear colorless mobile liquid'
    }
  },
  {
    id: 'paints-4',
    name: 'Methyl Ethyl Ketone MEK',
    cas: '78-93-3',
    formula: 'C4H8O',
    grade: 'Pure Solvent Grade',
    category: 'Paints, Coatings & Inks',
    packaging: '165 kg Steel Drums',
    packOptions: ['165 kg Mild Steel Drums', 'ISO Tanks', 'Tanker Loads'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    description: 'Fast-evaporating oxygenated ketone solvent with high solvency for vinyl, acrylic, epoxy, and nitrocellulose resins. Widely used in flexographic inks, leather finishes, and contact adhesives.',
    applications: ['Printing Inks & Solvents', 'Polyurethane & Vinyl Coatings', 'Industrial Adhesives & Cements', 'Degreasing & Cleaning Agents'],
    specifications: {
      'Purity (GC)': '≥ 99.5% min',
      'Water Content': '≤ 0.05%',
      'Acidity (as Acetic)': '≤ 0.003%',
      'Non-Volatile Residue': '≤ 2 mg/100mL',
      'Density @ 20°C': '0.804 - 0.807 g/cm³',
      'Boiling Point': '79.6°C',
      'Color (Pt-Co)': '≤ 10'
    }
  },
  {
    id: 'paints-5',
    name: 'Short Oil Alkyd Resin 60%',
    cas: '63148-69-6',
    formula: 'Synthetic Polymer Solution',
    grade: 'Industrial Stoving Grade',
    category: 'Paints, Coatings & Inks',
    packaging: '200 kg Steel Drums',
    packOptions: ['200 kg MS Drums', 'Road Tankers'],
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    description: 'DCO / Coconut oil based short oil alkyd resin dissolved at 60% solids in Xylene. Yields extraordinary gloss, color retention, hardness, and chemical resistance in stoving and 2K polyurethane finishes.',
    applications: ['Baking Industrial Enamels', 'Automotive Refinish Topcoats', 'Metal Can & Coil Coatings', 'Two-Component PU Systems'],
    specifications: {
      'Non-Volatile Matter (Solids)': '60.0% ± 2.0%',
      'Viscosity @ 25°C': '60 - 100 sec (Ford Cup 4)',
      'Acid Value (on solids)': '≤ 15 mg KOH/g',
      'Solvent': 'Xylene',
      'Color (Gardner)': '≤ 4',
      'Oil Content': '32% - 35%'
    }
  },
  {
    id: 'paints-6',
    name: 'Silicone-Free Defoaming Agent',
    cas: 'Defoamer-SF',
    formula: 'Polymer Compound Blend',
    grade: 'High Shear Paint Additive',
    category: 'Paints, Coatings & Inks',
    packaging: '25 kg Plastic Carboys',
    packOptions: ['25 kg Carboys', '190 kg Plastic Drums', '950 kg IBC'],
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered non-silicone defoamer for aqueous industrial coatings and inks. Eliminates macro and micro-foam under high shear grinding without causing fish eyes, craters, or intercoat adhesion loss.',
    applications: ['Waterborne Architectural Paints', 'Emulsion Polymerization', 'Pigment Grinding Pastes', 'Flexo & Gravure Inks'],
    specifications: {
      'Active Content': '100% solvent-free',
      'Appearance': 'Opaque yellowish viscous liquid',
      'Density @ 20°C': '0.88 - 0.92 g/cm³',
      'Viscosity @ 25°C': '400 - 900 mPa·s',
      'Flash Point': '> 100°C',
      'Ionicity': 'Non-ionic'
    }
  },
  {
    id: 'paints-7',
    name: 'Synthetic Red Iron Oxide 130',
    cas: '1309-37-1',
    formula: 'Fe2O3',
    grade: 'Inorganic Pigment Grade',
    category: 'Paints, Coatings & Inks',
    packaging: '25 kg Valve Paper Bags',
    packOptions: ['25 kg Valve Paper Bags', '1000 kg Bulk Sacks'],
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    description: 'High-purity micronized synthetic red iron oxide 130. Demonstrates brilliant redness, unmatched hiding power, chemical inertness, and light-fastness in paints, primers, pavers, and plastics.',
    applications: ['Anti-Corrosive Metal Primers', 'Concrete & Paver Coloration', 'Decorative Enamels', 'Plastics Masterbatches'],
    specifications: {
      'Fe2O3 Content': '≥ 96.0% min',
      'Matter Volatile @ 105°C': '≤ 0.8%',
      'Water-Soluble Matter': '≤ 0.3%',
      'Oil Absorption': '15 - 25 g/100g',
      'Residue on 325 Mesh': '≤ 0.05%',
      'pH Value': '5.0 - 8.0',
      'Tinting Strength': '98% - 102%'
    }
  },
  {
    id: 'paints-8',
    name: 'Micronized Calcium Carbonate GCC',
    cas: '471-34-1',
    formula: 'CaCO3',
    grade: 'Ultra-Fine 2 Micron',
    category: 'Paints, Coatings & Inks',
    packaging: '25 kg Laminated Paper Bags',
    packOptions: ['25 kg Bags', '50 kg Bags', '1000 kg Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    description: 'High-brightness ground calcium carbonate derived from select pure calcite marble. Treated for rapid wet-in, gloss retention, and cost-effective titanium dioxide spacing in latex paints.',
    applications: ['Architectural Matt & Sheen Emulsions', 'Powder Coatings Extender', 'Plastics & PVC Compounding', 'Adhesives & Sealants'],
    specifications: {
      'CaCO3 Assay': '≥ 98.5%',
      'Whiteness (Brightness)': '≥ 96.0%',
      'Top Cut (d98)': '≤ 10 µm',
      'Mean Particle Size (d50)': '1.8 - 2.2 µm',
      'Moisture Content': '≤ 0.2%',
      'Oil Absorption': '19 - 22 g/100g',
      'Specific Gravity': '2.7 g/cm³'
    }
  },

  // 4. Water Treatment & Environmental (8 products)
  {
    id: 'water-1',
    name: 'Polyaluminium Chloride PAC 30%',
    cas: '1327-41-9',
    formula: '[Al2(OH)nCl6-n]m',
    grade: 'Drinking Water & Industrial Grade',
    category: 'Water Treatment & Environmental',
    packaging: '25 kg PP Bags with inner PE',
    packOptions: ['25 kg Laminated Bags', '50 kg Bags', '1000 kg Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    description: 'Spray-dried yellow powder polyaluminium chloride with 30% Al2O3. Superior inorganic macromolecular coagulant for municipal drinking water purification and industrial wastewater treatment across wide pH levels.',
    applications: ['Municipal Potable Water Treatment', 'Textile & Paper Effluent Coagulation', 'River Water Clarification', 'Oily Wastewater Treatment'],
    specifications: {
      'Alumina (Al2O3) Content': '≥ 30.0%',
      'Basicity': '45.0% - 85.0%',
      'Insoluble Matter': '≤ 0.5%',
      'pH (1% aqueous solution)': '3.5 - 5.0',
      'Arsenic (As)': '≤ 0.0002%',
      'Lead (Pb)': '≤ 0.001%',
      'Cadmium (Cd)': '≤ 0.0002%',
      'Appearance': 'Fine yellow crystalline powder'
    }
  },
  {
    id: 'water-2',
    name: 'Sodium Hypochlorite 10-12%',
    cas: '7681-52-9',
    formula: 'NaOCl',
    grade: 'Technical / Disinfectant Grade',
    category: 'Water Treatment & Environmental',
    packaging: '35 kg / 50 kg HDPE Carboys',
    packOptions: ['35 kg Carboys', '50 kg Carboys', '250 kg Drums', '1200 kg IBC'],
    image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=800&q=80',
    description: 'High-stability liquid sodium hypochlorite containing 10-12% available chlorine. Potent broad-spectrum disinfectant, bleaching agent, and chlorinating biocide for raw water disinfection and odor control.',
    applications: ['Municipal Water Chlorination', 'Cooling Tower Biocide', 'Swimming Pool Sanitization', 'Industrial Odor Neutralization'],
    specifications: {
      'Available Chlorine (as Cl2)': '10.0% - 12.0% w/w',
      'Free Alkali (as NaOH)': '0.5% - 1.2%',
      'Specific Gravity @ 20°C': '1.16 - 1.20',
      'Iron (Fe)': '≤ 2 ppm',
      'Heavy Metals': '< 5 ppm',
      'Appearance': 'Clear pale yellowish greenish liquid'
    }
  },
  {
    id: 'water-3',
    name: 'Ferric Chloride Liquid 40%',
    cas: '7705-08-0',
    formula: 'FeCl3',
    grade: 'Industrial Grade Solution',
    category: 'Water Treatment & Environmental',
    packaging: '50 kg HDPE Carboys',
    packOptions: ['50 kg Carboys', '250 kg Drums', '1250 kg IBC', 'Dedicated Tankers'],
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy brown aqueous solution of ferric chloride 40%. Exceptionally effective primary coagulant for sewage sludge conditioning, heavy metal precipitation, and phosphorus removal.',
    applications: ['Sewage Sludge Dewatering', 'Phosphorus Precipitation', 'Hydrogen Sulfide Odor Control', 'PCB Etching Chemical'],
    specifications: {
      'Ferric Chloride (FeCl3)': '≥ 40.0% w/w',
      'Ferrous Chloride (FeCl2)': '≤ 0.5%',
      'Free Acidity (as HCl)': '≤ 1.0%',
      'Specific Gravity @ 20°C': '1.42 - 1.45',
      'Heavy Metals (Pb)': '≤ 20 ppm',
      'Appearance': 'Dark reddish-brown liquid'
    }
  },
  {
    id: 'water-4',
    name: 'Activated Carbon Granular 8x30 Mesh',
    cas: '7440-44-0',
    formula: 'C (Porous Matrix)',
    grade: 'Iodine Number 1000+ mg/g',
    category: 'Water Treatment & Environmental',
    packaging: '25 kg PP Bags with inner liner',
    packOptions: ['25 kg Bags', '500 kg Bulk Sacks'],
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    description: 'Steam-activated granular carbon manufactured from select coconut shell. Offers supreme microporosity, mechanical attrition resistance, and high adsorption capacity for organic compounds and chlorine removal.',
    applications: ['Drinking Water Dechlorination', 'VOC & Organics Adsorption', 'RO System Pre-filtration', 'Wastewater Tertiary Polishing'],
    specifications: {
      'Iodine Number': '≥ 1000 mg/g min',
      'Mesh Size': '8 x 30 US Mesh (≥ 90%)',
      'Moisture Content': '≤ 5.0%',
      'Ash Content': '≤ 4.0%',
      'Hardness Number': '≥ 95%',
      'Apparent Density': '0.48 - 0.53 g/cm³',
      'CTC Activity': '≥ 55%'
    }
  },
  {
    id: 'water-5',
    name: 'Non-Ferric Aluminium Sulphate Alum',
    cas: '10043-01-3',
    formula: 'Al2(SO4)3·18H2O',
    grade: 'Technical Non-Ferric Grade',
    category: 'Water Treatment & Environmental',
    packaging: '50 kg HDPE Laminated Bags',
    packOptions: ['50 kg Woven Bags', '1000 kg Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=800&q=80',
    description: 'Solid white kibbled or powder non-ferric aluminium sulphate with Fe < 100 ppm. Traditional, economical coagulant providing rapid flocculation in papermaking sizing and potable water clarification.',
    applications: ['Potable Water Flocculation', 'Paper Sizing Agent', 'Lake Restoration Phosphorus Binder', 'Textile Dye Fixing Auxiliary'],
    specifications: {
      'Water Soluble Alumina (Al2O3)': '≥ 17.0%',
      'Iron (as Fe)': '≤ 0.01% (100 ppm max)',
      'Water Insoluble Matter': '≤ 0.2%',
      'pH (5% aqueous solution)': '≥ 2.8',
      'Appearance': 'White lumps / kibbled / powder'
    }
  },
  {
    id: 'water-6',
    name: 'Hydrated Lime 90% High Calcium',
    cas: '1305-62-0',
    formula: 'Ca(OH)2',
    grade: 'Water & Flue Gas Grade',
    category: 'Water Treatment & Environmental',
    packaging: '25 kg Paper Bags',
    packOptions: ['25 kg Bags', '50 kg Bags', '1000 kg Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=800&q=80',
    description: 'High calcium hydrated lime containing 90% available Ca(OH)2. Widely utilized for acid wastewater neutralization, heavy metal precipitation, water softening, and flue gas desulfurization (FGD).',
    applications: ['Acid Mine & Effluent Neutralization', 'Water Hardness Precipitation', 'Flue Gas SO2 Scrubbing', 'Sludge Stabilization'],
    specifications: {
      'Available Ca(OH)2': '≥ 90.0%',
      'Calcium Oxide (CaO)': '≥ 68.0%',
      'Magnesium (MgO)': '≤ 1.5%',
      'Residue on 200 Mesh (75µm)': '≤ 2.0%',
      'Silica (SiO2)': '≤ 1.0%',
      'Iron (Fe2O3)': '≤ 0.2%'
    }
  },
  {
    id: 'water-7',
    name: 'RO Membrane Anti-Scalant Compound',
    cas: 'Polycarb-AS',
    formula: 'Phosphonate-Polymer Blend',
    grade: 'High Silica & Sulfate Control',
    category: 'Water Treatment & Environmental',
    packaging: '25 kg Poly Carboys',
    packOptions: ['25 kg Carboys', '200 kg Drums', '1000 kg IBC'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    description: 'Proprietary liquid threshold scale inhibitor formulated for high-salinity reverse osmosis and NF desalination systems. Inhibits calcium carbonate, calcium sulfate, and silica scaling.',
    applications: ['Industrial RO Desalination', 'Effluent Recycling Plants', 'Boiler Feed Pre-treatment', 'High Recovery Membrane Systems'],
    specifications: {
      'Specific Gravity @ 20°C': '1.14 - 1.18',
      'pH (neat)': '2.0 - 3.5',
      'Appearance': 'Clear amber to colorless liquid',
      'Compatibility': 'Compatible with all polyamide membranes',
      'Maximum LSI Limit': 'Up to +2.8 without acid feed'
    }
  },
  {
    id: 'water-8',
    name: 'Sodium Metabisulphite Food/Water Grade',
    cas: '7681-57-4',
    formula: 'Na2S2O5',
    grade: 'Dechlorination / Food Grade',
    category: 'Water Treatment & Environmental',
    packaging: '25 kg Kraft Bags with inner PE',
    packOptions: ['25 kg Bags', '50 lb Bags', '1000 kg Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    description: 'High-purity sodium metabisulphite with 65% minimum SO2 content. Rapid reducing agent for chemical dechlorination prior to RO membranes and hexavalent chromium reduction in plating wastewater.',
    applications: ['RO Membrane Dechlorination', 'Hexavalent Chromium Reduction (Cr VI to Cr III)', 'Oxygen Scavenging in Boilers', 'Food & Starch Preservation'],
    specifications: {
      'Assay (Na2S2O5)': '≥ 97.0%',
      'SO2 Content': '≥ 65.4%',
      'Iron (Fe)': '≤ 10 ppm',
      'Heavy Metals (Pb)': '≤ 10 ppm',
      'Arsenic (As)': '≤ 2 ppm',
      'pH of 5% Solution': '4.0 - 4.8',
      'Appearance': 'White crystalline free-flowing powder'
    }
  },

  // 5. Textiles & Detergents (8 products)
  {
    id: 'textile-1',
    name: 'Sodium Lauryl Ether Sulfate SLES 70%',
    cas: '68585-34-2',
    formula: 'CH3(CH2)11(OCH2CH2)nOSO3Na',
    grade: 'Cosmetic / Detergent Grade 2EO',
    category: 'Textiles & Detergents',
    packaging: '170 kg / 220 kg HDPE Drums',
    packOptions: ['170 kg HDPE Drums', '220 kg Drums', '1050 kg IBC Tote'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    description: 'Anionic surfactant paste with 70% active substance. Remarkable flash foaming, detergency, wetting, and high salt tolerance for liquid soaps, shampoos, body washes, and heavy-duty laundry liquids.',
    applications: ['Dishwash Liquids & Gels', 'Shampoos & Body Washes', 'Industrial Textile Scouring', 'Liquid Laundry Detergents'],
    specifications: {
      'Active Matter': '70.0% ± 2.0%',
      'Unsulfated Matter': '≤ 2.0%',
      'Sodium Sulfate': '≤ 1.2%',
      '1,4-Dioxane': '≤ 30 ppm (or low dioxane grade < 10 ppm)',
      'pH (1% aqueous solution)': '7.0 - 9.0',
      'Color (Hazen 5% active)': '≤ 15',
      'Appearance': 'White to light yellowish transparent paste'
    }
  },
  {
    id: 'textile-2',
    name: 'Linear Alkylbenzene Sulphonic Acid LABSA 90%',
    cas: '27176-87-0',
    formula: 'C18H30O3S',
    grade: 'Commercial 90% / 96% Detergent Grade',
    category: 'Textiles & Detergents',
    packaging: '210 kg / 225 kg HDPE Drums',
    packOptions: ['210 kg HDPE Drums', '225 kg Drums', '1000 kg IBC Tote', 'Road Tankers'],
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80',
    description: 'Biodegradable synthetic anionic surfactant with 90% active acid. Primary workhorse raw material for laundry detergent powders, dishwashers, and multipurpose industrial cleansers.',
    applications: ['Washing Powder Manufacture', 'Liquid Detergents & Cleaners', 'Textile Mercerizing & Wetting', 'Agricultural Emulsifiers'],
    specifications: {
      'Active Matter (LABSA)': '≥ 90.0% (also available 96% Grade)',
      'Free Sulfuric Acid': '≤ 5.0%',
      'Free Oil': '≤ 2.0%',
      'Water Content': '≤ 4.0%',
      'Color (Klett)': '≤ 50',
      'Appearance': 'Brown viscous liquid'
    }
  },
  {
    id: 'textile-3',
    name: 'Caustic Soda Flakes 99% NaOH',
    cas: '1310-73-2',
    formula: 'NaOH',
    grade: 'Rayon / Technical 99.5% Grade',
    category: 'Textiles & Detergents',
    packaging: '25 kg PP Bags with PE liner',
    packOptions: ['25 kg Bags with PE liner', '50 kg Bags', '1000 kg Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-pure white deliquescent sodium hydroxide flakes with 99.5% assay. Strong alkaline chemical for cotton textile mercerization, saponification in soap making, and chemical manufacturing.',
    applications: ['Cotton Fabric Mercerization', 'Soap & Saponification Processing', 'Alumina Refining & Paper Pulping', 'Industrial Clean-In-Place (CIP)'],
    specifications: {
      'Sodium Hydroxide (NaOH)': '≥ 99.5% min',
      'Sodium Carbonate (Na2CO3)': '≤ 0.4%',
      'Sodium Chloride (NaCl)': '≤ 0.02%',
      'Iron (Fe)': '≤ 10 ppm',
      'Nickel (Ni)': '≤ 3 ppm',
      'Appearance': 'Pure white crystalline flakes'
    }
  },
  {
    id: 'textile-4',
    name: 'Hydrogen Peroxide 50% Stabilized',
    cas: '7722-84-1',
    formula: 'H2O2',
    grade: 'Textile / Bleaching Grade',
    category: 'Textiles & Detergents',
    packaging: '30 kg / 50 kg HDPE Carboys',
    packOptions: ['30 kg Carboys', '50 kg Carboys', '1000 kg IBC Tote', 'SS ISO Tanker'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    description: 'High-stability aqueous solution containing 50% hydrogen peroxide. Eco-friendly, chlorine-free bleaching agent breaking down harmlessly into water and oxygen, essential for cotton and cellulose fabric whitening.',
    applications: ['Textile Bleaching & Desizing', 'Pulp & Paper Eco-Friendly Bleach', 'Effluent Detoxification', 'Chemical Synthesis & Epoxidation'],
    specifications: {
      'Concentration (H2O2)': '≥ 50.0% w/w',
      'Stability (Gas Evolution @ 100°C)': '≥ 97%',
      'Specific Gravity @ 20°C': '1.19 - 1.20',
      'Free Acidity (as H2SO4)': '≤ 0.03%',
      'Residue on Evaporation': '≤ 0.05%',
      'Appearance': 'Clear, water-like liquid'
    }
  },
  {
    id: 'textile-5',
    name: 'Sodium Tripolyphosphate STPP',
    cas: '7758-29-4',
    formula: 'Na5P3O10',
    grade: 'Detergent / Technical Grade',
    category: 'Textiles & Detergents',
    packaging: '25 kg Kraft Paper Bags',
    packOptions: ['25 kg Valve Paper Bags', '1000 kg Jumbo Bags'],
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80',
    description: 'Premium detergent builder with 57% P2O5 content. Sequesters calcium and magnesium water hardness ions, peptizes soil particles, prevents redeposition, and buffers alkaline washing liquors.',
    applications: ['Heavy Duty Powder Detergent Builder', 'Ceramic Deflocculant', 'Textile Processing Auxiliary', 'Water Softening Additive'],
    specifications: {
      'Assay (Na5P3O10)': '≥ 94.0%',
      'Phosphorus Pentoxide (P2O5)': '≥ 57.0%',
      'Phase I Content': '20% - 30%',
      'Water Insoluble Matter': '≤ 0.1%',
      'Iron (Fe)': '≤ 50 ppm',
      'pH of 1% Solution': '9.2 - 10.0',
      'Bulk Density': '0.70 - 0.85 g/cm³'
    }
  },
  {
    id: 'textile-6',
    name: 'Soda Ash Dense 99.2%',
    cas: '497-19-8',
    formula: 'Na2CO3',
    grade: 'Dense Technical 99.2% Grade',
    category: 'Textiles & Detergents',
    packaging: '50 kg HDPE Woven Bags',
    packOptions: ['50 kg Bags', '1000 kg Jumbo Bulk Bags', 'Bulk Hopper Trucks'],
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    description: 'High-density anhydrous sodium carbonate 99.2%. Fundamental industrial chemical providing alkalinity and buffering capacity in reactive textile dyeing, glass manufacturing, and detergent formulations.',
    applications: ['Reactive Dyeing Alkali Fixation', 'Detergent Powder Saponifier', 'Container & Float Glass Making', 'Sodium Salt Synthesis'],
    specifications: {
      'Total Alkalinity (as Na2CO3)': '≥ 99.2% min',
      'Sodium Chloride (NaCl)': '≤ 0.7%',
      'Iron (as Fe2O3)': '≤ 0.004%',
      'Sulfate (as Na2SO4)': '≤ 0.08%',
      'Water Insoluble Matter': '≤ 0.04%',
      'Bulk Density': '0.90 - 1.15 g/cm³',
      'Appearance': 'White granular free-flowing powder'
    }
  },
  {
    id: 'textile-7',
    name: 'Acetic Acid Glacial 99.85%',
    cas: '64-19-7',
    formula: 'CH3COOH',
    grade: 'Industrial / Pure Glacial Grade',
    category: 'Textiles & Detergents',
    packaging: '30 kg / 35 kg Poly Carboys',
    packOptions: ['30 kg Carboys', '210 kg HDPE Drums', '1050 kg IBC', 'ISO Tankers'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    description: 'Glacial acetic acid with 99.85% min purity. Regulates dyebath acidity in wool, silk, and synthetic fiber processing, acts as a neutralizing agent after caustic scouring, and precursor to acetates.',
    applications: ['Textile Dyebath pH Buffer', 'Neutralization After Caustic Scouring', 'Acetate & Chemical Intermediate', 'Leather Deliming & Tanning'],
    specifications: {
      'Purity (CH3COOH)': '≥ 99.85%',
      'Freezing Point': '≥ 16.35°C',
      'Water Content': '≤ 0.15%',
      'Formic Acid / Reducing Substances': 'Passes permanganate test > 2 hrs',
      'Heavy Metals (Pb)': '≤ 1 ppm',
      'Color (Pt-Co)': '≤ 10'
    }
  },
  {
    id: 'textile-8',
    name: 'Optical Brightener CBS-X Tinopal Type',
    cas: '27344-41-8',
    formula: 'C28H20S2O6Na2',
    grade: 'High Soluble Distyrylbiphenyl',
    category: 'Textiles & Detergents',
    packaging: '25 kg Fibre Drums with PE liner',
    packOptions: ['25 kg Fibre Drums', '25 kg Kraft Bags with foil liner'],
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=800&q=80',
    description: 'Fluorescent whitening agent of the distyryl biphenyl class. Imparts brilliant optical whiteness and bluish hue to cellulose and synthetic fibers even at low wash temperatures with superior chlorine stability.',
    applications: ['Synthetic Laundry Detergents', 'Fabric Softeners & Conditioners', 'Textile Finishing & Bleaching', 'Paper Surface Fluorescent Coating'],
    specifications: {
      'Active Substance': '≥ 90.0%',
      'Extinction Coefficient (1%, 1cm @ 348-350nm)': '≥ 1120',
      'Moisture Content': '≤ 5.0%',
      'Appearance': 'Bright greenish-yellow free flowing granules',
      'Water Solubility @ 25°C': '≥ 25 g/L',
      'Light Fastness': 'Grade 4 - 5'
    }
  }
];

// 5 Industrial Categories with Icons
const CATEGORIES = [
  { name: 'Pharmaceuticals & Healthcare', icon: FlaskConical },
  { name: 'Agriculture & Fertilizers', icon: Sprout },
  { name: 'Paints, Coatings & Inks', icon: Paintbrush },
  { name: 'Water Treatment & Environmental', icon: Droplets },
  { name: 'Textiles & Detergents', icon: Sparkles },
];

// 7-Step Workflow Process Data
const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Understanding Your Requirement',
    desc: 'We start by listening — mapping your specifications, industry, and compliance needs.',
    icon: Search
  },
  {
    step: '02',
    title: 'Product Selection',
    desc: 'We identify the right product from our trusted manufacturing partners.',
    icon: FlaskConical
  },
  {
    step: '03',
    title: 'Quality Verification',
    desc: 'Every item is checked against quality, performance, and compliance criteria.',
    icon: ShieldCheck
  },
  {
    step: '04',
    title: 'Order Processing',
    desc: 'Fast, transparent order handling with clear communication throughout.',
    icon: ClipboardCheck
  },
  {
    step: '05',
    title: 'Safe Packaging',
    desc: 'Products packaged to preserve sterility and integrity in transit.',
    icon: Package
  },
  {
    step: '06',
    title: 'Timely Delivery',
    desc: 'A reliable distribution network delivers on schedule, across India.',
    icon: Truck
  },
  {
    step: '07',
    title: 'Customer Support',
    desc: 'Dedicated after-sales support keeps your operations running smoothly.',
    icon: Headphones
  }
];

// Principals & Partner Brands
const PRINCIPAL_BRANDS = [
  'AquaTest',
  'BioSecure',
  'MediPack',
  'PureFlow',
  'SterileTech',
  'LabTrust',
  'PharmaSteril',
  'CleanLab Systems'
];

// Regulatory Credentials
const CREDENTIALS = [
  {
    title: 'Drug License',
    desc: 'Valid Drug License for regulated distribution',
    icon: Building2
  },
  {
    title: 'GST Registered',
    desc: 'GST Registered Business Entity',
    icon: FileText
  },
  {
    title: 'ISO 9001:2015',
    desc: 'Quality Management aligned processes',
    icon: Award
  },
  {
    title: 'Compliance Assured',
    desc: 'Products meeting regulatory expectations',
    icon: ShieldCheck
  }
];

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // RFQ Cart state
  const [cart, setCart] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Modal states
  const [activeSpecProduct, setActiveSpecProduct] = useState(null);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [rfqTargetProduct, setRfqTargetProduct] = useState(null);
  const [rfqSuccessRef, setRfqSuccessRef] = useState(null);

  // RFQ Checkout form fields
  const [rfqForm, setRfqForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    destination: '',
    taxId: '',
    incoterm: 'FOB India Port (Nhava Sheva / Mundra)',
    instructions: ''
  });

  // Toggle Dark Mode class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Cart Helper functions
  const isInCart = (productId) => cart.some(item => item.product.id === productId);

  const toggleCartItem = (product) => {
    if (isInCart(product.id)) {
      setCart(cart.filter(item => item.product.id !== product.id));
    } else {
      setCart([...cart, {
        product,
        quantity: '1 Metric Ton (MT)',
        packaging: product.packaging || product.packOptions[0]
      }]);
    }
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCart(cart.map(item => item.product.id === productId ? { ...item, quantity: newQuantity } : item));
  };

  const updateCartItemPackaging = (productId, newPackaging) => {
    setCart(cart.map(item => item.product.id === productId ? { ...item, packaging: newPackaging } : item));
  };

  const removeCartItem = (productId) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Live filtered products calculation
  const filteredProducts = useMemo(() => {
    return CHEMICAL_PRODUCTS.filter(product => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(query);
        const matchCas = product.cas.toLowerCase().includes(query);
        const matchFormula = product.formula.toLowerCase().includes(query);
        const matchGrade = product.grade.toLowerCase().includes(query);
        const matchApps = product.applications.some(app => app.toLowerCase().includes(query));
        return matchName || matchCas || matchFormula || matchGrade || matchApps;
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const openSingleProductRfq = (product) => {
    setRfqTargetProduct(product);
    setIsRfqModalOpen(true);
  };

  const openBatchCartRfq = () => {
    setRfqTargetProduct(null);
    setIsCartDrawerOpen(false);
    setIsRfqModalOpen(true);
  };

  const handleRfqSubmit = (e) => {
    e.preventDefault();
    const generatedRef = `MC-RFQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqSuccessRef(generatedRef);
  };

  const closeRfqSuccess = () => {
    setRfqSuccessRef(null);
    setIsRfqModalOpen(false);
    if (!rfqTargetProduct) {
      clearCart();
    }
  };

  const getCategoryCartCount = (catName) => {
    return cart.filter(item => item.product.category === catName).length;
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${
      darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#faf9f6] text-slate-900'
    }`}>
      
      {/* ========================================================
          1. STICKY GLOBAL HEADER (Distinctive Brand + Search + Only 1 Contact Us)
         ======================================================== */}
      <header className={`sticky top-0 z-40 w-full h-20 backdrop-blur-md border-b transition-colors duration-200 ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/95 border-sky-100 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group transition-transform duration-200 hover:scale-[1.02]"
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-tr from-[#0284c7] to-[#4fc3f7] text-white group-hover:shadow-sky-500/30 transition-all duration-300">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-xl sm:text-2xl text-[#0284c7] dark:text-[#4fc3f7]">
                  MARUTI
                </span>
                <span className="font-light tracking-wider text-xl sm:text-2xl text-slate-900 dark:text-white">
                  CHEMICALS
                </span>
              </div>
              <p className="text-[10px] font-medium tracking-wide uppercase text-slate-500 dark:text-slate-400">
                B2B Chemical Supply & Export
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
            <a
              href="#products"
              className="relative text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#4fc3f7] transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0284c7] dark:after:bg-[#4fc3f7] hover:after:w-full after:transition-all after:duration-300"
            >
              Products
            </a>
            <a
              href="#sectors"
              className="relative text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#4fc3f7] transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0284c7] dark:after:bg-[#4fc3f7] hover:after:w-full after:transition-all after:duration-300"
            >
              Industries
            </a>
            <a
              href="#process"
              className="relative text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#4fc3f7] transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0284c7] dark:after:bg-[#4fc3f7] hover:after:w-full after:transition-all after:duration-300"
            >
              Our Process
            </a>
            <a
              href="#principals"
              className="relative text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#4fc3f7] transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0284c7] dark:after:bg-[#4fc3f7] hover:after:w-full after:transition-all after:duration-300"
            >
              Principals & Credentials
            </a>
            <a
              href="#specs-info"
              className="relative text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#4fc3f7] transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0284c7] dark:after:bg-[#4fc3f7] hover:after:w-full after:transition-all after:duration-300"
            >
              Quality & COA
            </a>
          </nav>

          {/* Live Global Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-sm relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Chemical, CAS (e.g. 56-81-5), Formula..."
              className={`w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-[#0284c7] transition ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400'
                  : 'bg-slate-100/80 border-slate-200 text-slate-900 placeholder-slate-500'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action Controls: Dark Mode Toggle, RFQ Cart & ONE Contact Us Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Dark/Light Mode Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
              className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-sky-600 hover:bg-slate-100'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* RFQ Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm bg-[#4fc3f7] hover:bg-[#38bdf8] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-slate-900"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">RFQ Cart</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold bg-slate-950 text-white">
                {cart.length}
              </span>
            </button>

            {/* ONLY ONE Contact Us Button in header */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </a>
          </div>
        </div>

        {/* Mobile Search Bar beneath header */}
        <div className={`md:hidden px-4 pb-3 pt-1 border-t ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}`}>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chemicals, CAS numbers..."
              className={`w-full pl-9 pr-8 py-2 rounded-lg text-xs border focus:outline-none focus:ring-2 focus:ring-[#0284c7] ${
                darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================
          2. HIGH-IMPACT CHEMICAL HERO (Distinctive Prompt Layout with Hover Effects)
         ======================================================== */}
      <section className={`relative overflow-hidden border-b transition-colors duration-200 ${
        darkMode ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800' : 'bg-gradient-to-b from-sky-50 via-white to-[#faf9f6] border-sky-100'
      }`}>
        <div className="absolute inset-0 opacity-15 dark:opacity-5 pointer-events-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:18px_18px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-5 bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] border border-sky-200 dark:border-sky-800 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#0284c7]" /> ISO 9001:2015 & REACH Compliant Manufacturer & Exporter
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-950 dark:text-white">
              Precision Chemical Distribution &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#4fc3f7]">
                Global Export Portal
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              Serving industrial procurement teams worldwide. Explore certified chemical raw materials across 5 core industries, review technical specification sheets, and compile multi-product commercial RFQs with verified delivery guarantees.
            </p>

            {/* Quick Hero CTAs with Hover Lift */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="px-7 py-3.5 rounded-xl font-bold text-sm bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>

              <a
                href="#contact"
                className={`px-7 py-3.5 rounded-xl font-bold text-sm border hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ${
                  darkMode
                    ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800 hover:border-sky-500 hover:shadow-lg'
                    : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50 hover:border-sky-400 hover:text-[#0284c7] hover:shadow-lg shadow-sm'
                }`}
              >
                Contact Procurement Desk
              </a>
            </div>
          </div>

          {/* 4 Quick Stats Grid with Interactive Hover Lift */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-sky-100 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-mono">50+</div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Export Countries</div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-sky-100 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-mono">15,000+</div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">MT Shipped Annually</div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-sky-100 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-mono">4-Hour</div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">RFQ Quote SLA</div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-sky-100 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-mono">100%</div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Batch COA Assured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. INDUSTRIAL CATALOG & MULTI-PRODUCT RFQ ENGINE (#products)
         ======================================================== */}
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Industry Filter Tabs with dynamic cart badges */}
        <div id="sectors" className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2.5">
                <Layers className="w-7 h-7 text-[#0284c7] dark:text-[#4fc3f7]" />
                Industrial Chemical Catalog
              </h2>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                Filter by sector or search by chemical name, molecular formula, or CAS registry number.
              </p>
            </div>

            <div className="text-xs font-semibold text-slate-500">
              Showing <span className="font-bold text-[#0284c7] dark:text-[#4fc3f7]">{filteredProducts.length}</span> verified chemical products
            </div>
          </div>

          {/* Category Tabs Scrollable on Mobile with Hover Effects */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 ${
                selectedCategory === 'All'
                  ? 'bg-[#0284c7] text-white shadow-md'
                  : darkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>All Sectors</span>
            </button>

            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const cartCountInCat = getCategoryCartCount(cat.name);
              const isSelected = selectedCategory === cat.name;

              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 ${
                    isSelected
                      ? 'bg-[#0284c7] text-white shadow-md'
                      : darkMode
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                  {cartCountInCat > 0 && (
                    <span className="bg-[#4fc3f7] text-slate-900 text-[10px] px-1.5 py-0.2 rounded-full font-bold animate-pulse">
                      {cartCountInCat} in cart
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Filter Badges */}
          {(selectedCategory !== 'All' || searchQuery !== '') && (
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="text-slate-500">Active filters:</span>
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  Sector: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')}><X className="w-3 h-3 hover:text-red-500" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}><X className="w-3 h-3 hover:text-red-500" /></button>
                </span>
              )}
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="text-[#0284c7] dark:text-[#4fc3f7] font-semibold hover:underline ml-2"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* ========================================================
            4-COLUMN RESPONSIVE PRODUCT GRID WITH RICH HOVER EFFECTS
           ======================================================== */}
        {filteredProducts.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Chemicals Matched Your Criteria</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find any products matching "{searchQuery}". Try searching by CAS number (e.g., 56-81-5), common name, or reset the filters.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#0284c7] text-white hover:bg-[#0369a1]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inCart = isInCart(product.id);

              return (
                <div
                  key={product.id}
                  className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-sky-300 dark:hover:border-sky-700 ${
                    inCart
                      ? 'ring-2 ring-[#0284c7] shadow-lg dark:ring-[#4fc3f7]'
                      : 'hover:shadow-xl'
                  } ${
                    darkMode
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-sky-100'
                  }`}
                >
                  {/* In Cart Top-Right Badge */}
                  {inCart && (
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-md bg-emerald-600 text-white animate-fade-in">
                      <Check className="w-3.5 h-3.5" /> Added to RFQ
                    </div>
                  )}

                  {/* Top Image Container with Zoom Effect */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'; }}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Sector pill overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="px-2.5 py-0.5 rounded-md font-medium backdrop-blur-md bg-slate-900/70 border border-white/10 truncate max-w-[170px]">
                        {product.category}
                      </span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/60 text-[#4fc3f7] font-semibold">
                        CAS: {product.cas}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-base text-slate-950 dark:text-white line-clamp-1 group-hover:text-[#0284c7] dark:group-hover:text-[#4fc3f7] transition-colors">
                      {product.name}
                    </h3>

                    {/* Formula & Grade Metadata */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="font-mono px-2 py-0.5 rounded font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {product.formula}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] border border-sky-100 dark:border-sky-900 truncate max-w-[140px] font-medium">
                        {product.grade}
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {product.applications.slice(0, 2).map((app, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
                        >
                          • {app}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-slate-400" />
                        Pack: <strong className="text-slate-700 dark:text-slate-300 font-medium">{product.packaging}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Card Actions: Spec, Enquire, Add/Remove Cart with Hover Lift */}
                  <div className="p-4 pt-0 flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setActiveSpecProduct(product)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                          darkMode
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5 text-[#0284c7] dark:text-[#4fc3f7]" /> Specs
                      </button>
                      <button
                        onClick={() => openSingleProductRfq(product)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                          darkMode
                            ? 'bg-sky-950/60 hover:bg-sky-900/60 text-[#4fc3f7] border border-sky-800'
                            : 'bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" /> Enquire
                      </button>
                    </div>

                    <button
                      onClick={() => toggleCartItem(product)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-md hover:brightness-105 active:scale-95 ${
                        inCart
                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                          : 'bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Trash2 className="w-3.5 h-3.5" /> Remove from Cart
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" /> Add to RFQ Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ========================================================
          4. OUR PROCESS: 7-STEP WORKFLOW (#process)
         ======================================================== */}
      <section id="process" className={`py-16 sm:py-24 border-t transition-colors duration-200 ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-gradient-to-b from-[#faf9f6] via-white to-sky-50/40 border-sky-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] border border-sky-200 dark:border-sky-800">
              <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse"></span>
              OUR PROCESS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              From requirement to <span className="text-[#0284c7] dark:text-[#4fc3f7]">reliable delivery</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A transparent, seven-step workflow designed around your compliance and timelines.
            </p>
          </div>

          {/* Staggered Vertical Timeline Workflow with Rich Hover Effects */}
          <div className="max-w-3xl mx-auto relative">
            {/* Center/Left connecting vertical line */}
            <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#0284c7] via-[#4fc3f7] to-slate-200 dark:to-slate-800 -z-0"></div>

            <div className="space-y-5 relative z-10">
              {PROCESS_STEPS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="flex items-start gap-4 sm:gap-6 group"
                  >
                    {/* Step Number Circle / Badge */}
                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-black text-sm sm:text-base shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-sky-500/30 bg-slate-950 text-white dark:bg-slate-800 dark:text-[#4fc3f7] border-2 border-slate-800 dark:border-sky-500/40 group-hover:bg-[#0284c7] group-hover:border-[#0284c7]">
                      <span>{item.step}</span>
                      <Icon className="w-3.5 h-3.5 mt-0.5 opacity-80 group-hover:opacity-100" />
                    </div>

                    {/* Step Description Card with Hover Elevation */}
                    <div className={`flex-1 p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer ${
                      darkMode
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-white border-slate-200 shadow-xs hover:shadow-md'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-[#4fc3f7] transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full w-fit">
                          Step {idx + 1} of 7
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. OUR PRINCIPALS & REGULATORY CREDENTIALS (#principals)
         ======================================================== */}
      <section id="principals" className={`py-16 sm:py-20 border-t transition-colors duration-200 ${
        darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-sky-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Part A: OUR PRINCIPALS */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] border border-sky-200 dark:border-sky-800">
              OUR PRINCIPALS
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
              Representing <span className="text-[#0284c7] dark:text-[#4fc3f7]">globally trusted</span> manufacturers
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              We partner with reputed brands to bring authentic, compliant products to Indian industry.
            </p>
          </div>

          {/* Principal Brand Pills Grid with Hover Lift */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl mx-auto mb-16">
            {PRINCIPAL_BRANDS.map((brand) => (
              <div
                key={brand}
                className={`p-4 rounded-xl border flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-sky-400 dark:hover:border-sky-600 cursor-pointer group ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:text-white'
                    : 'bg-slate-50/80 border-slate-200 text-slate-800 hover:text-[#0284c7] hover:bg-white shadow-xs'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#0284c7] dark:text-[#4fc3f7] group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xs sm:text-sm tracking-wide">{brand}</span>
              </div>
            ))}
          </div>

          {/* Part B: CERTIFICATIONS & CREDENTIALS */}
          <div className="pt-10 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">
                CERTIFICATIONS & CREDENTIALS
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Regulatory credentials you can rely on
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {CREDENTIALS.map((cred) => {
                const Icon = cred.icon;
                return (
                  <div
                    key={cred.title}
                    className={`p-6 rounded-2xl border text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#faf9f6] border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-black text-sm sm:text-base text-slate-950 dark:text-white mb-1.5">
                      {cred.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {cred.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 text-center text-[11px] text-slate-500 dark:text-slate-400 italic max-w-2xl mx-auto">
              * Credentials shown are indicative. Final certificate numbers and compliance dossiers can be shared upon commercial request during onboarding.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================
          6. QUALITY & COA HIGHLIGHTS (#specs-info)
         ======================================================== */}
      <section id="specs-info" className={`py-14 border-t ${
        darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-sky-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7] dark:text-[#4fc3f7]">
              TECHNICAL ASSURANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mt-1">
              Guaranteed Pharmacopoeial & Industrial Standards
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every shipment is backed by manufacturer Certificate of Analysis (COA), safety data sheets (SDS/MSDS), and strict batch compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#faf9f6] border-slate-200'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300 shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">Monograph Compliance</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Tested against USP, BP, EP, and Indian Pharmacopoeia standards with verified purity thresholds, heavy metals limits, and solubility tests.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#faf9f6] border-slate-200'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300 shadow-sm">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">Export Grade Packaging</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Tamper-evident packaging in UN-certified HDPE drums, multi-wall paper bags with barrier liners, and fumigated wooden pallets for international transit.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#faf9f6] border-slate-200'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300 shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">4-Hour SLA Delivery</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Guaranteed commercial quotation response, proforma invoicing, and freight dispatch estimations within 4 business hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. DIRECT PROCUREMENT & CONTACT SECTION (#contact)
         ======================================================== */}
      <section id="contact" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0284c7] dark:text-[#4fc3f7]">
                <span className="w-6 h-0.5 bg-[#0284c7] dark:bg-[#4fc3f7]"></span>
                CONTACT PROCUREMENT DESK
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                Connect Directly with Maruti Chemicals
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect with our commercial export and distribution desk for bulk orders, contract pricing, or customized packaging specifications.
              </p>

              <div className="space-y-4 pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-[#0284c7] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Commercial Office & Facility</div>
                    <div className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      Pankaj Gupta, II-C/199, Nehru Nagar, Ghaziabad (U.P.) — 201001, India
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-[#0284c7] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Direct Calling & WhatsApp</div>
                    <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                      +91 98102 65053 · 0120-4557740
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-[#0284c7] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Official Correspondence</div>
                    <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                      maruti_chemicals@yahoo.com
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-[#0284c7] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Working Hours</div>
                    <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                      Monday – Saturday · 9:00 AM – 6:00 PM (IST)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Instant Inquiry Form */}
            <div className="lg:col-span-7">
              <div className={`p-8 rounded-3xl border shadow-sm ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Submit Direct Commercial Inquiry
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Our commercial team will review your requirement and dispatch pricing details within 4 hours.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const genRef = `MC-RFQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
                    setRfqSuccessRef(genRef);
                    setIsRfqModalOpen(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Contact Person <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.fullName}
                        onChange={(e) => setRfqForm({ ...rfqForm, fullName: e.target.value })}
                        placeholder="Your Name"
                        className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-[#0284c7] ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Company Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.companyName}
                        onChange={(e) => setRfqForm({ ...rfqForm, companyName: e.target.value })}
                        placeholder="Company Ltd."
                        className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-[#0284c7] ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={rfqForm.email}
                        onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                        placeholder="procurement@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-[#0284c7] ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Phone / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={rfqForm.phone}
                        onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                        placeholder="+91 98102 XXXXX"
                        className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-[#0284c7] ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Required Chemicals & Target Volume
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={rfqForm.instructions}
                      onChange={(e) => setRfqForm({ ...rfqForm, instructions: e.target.value })}
                      placeholder="Specify chemicals, grades, packaging type, required volume, and delivery destination..."
                      className={`w-full p-3.5 rounded-xl border outline-none focus:ring-2 focus:ring-[#0284c7] ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                      }`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#0284c7] hover:bg-[#0369a1] hover:shadow-xl hover:shadow-sky-500/25 hover:-translate-y-0.5 active:translate-y-0 text-white shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Commercial RFQ</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          6. FLOATING BOTTOM RFQ BAR
         ======================================================== */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-30 animate-bounce-slow">
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl bg-gradient-to-r from-[#0284c7] to-[#4fc3f7] text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-slate-950" />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-slate-950 text-white text-[10px] font-black flex items-center justify-center">
                {cart.length}
              </span>
            </div>
            <span>View RFQ & Checkout ({cart.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================
          7. SLIDEOUT RFQ CART DRAWER
         ======================================================== */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartDrawerOpen(false)}
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className={`w-screen max-w-md shadow-2xl flex flex-col justify-between ${
              darkMode ? 'bg-slate-900 text-slate-100 border-l border-slate-800' : 'bg-white text-slate-900 border-l border-slate-200'
            }`}>
              
              {/* Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7]">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">Commercial RFQ Cart</h3>
                    <p className="text-xs text-slate-500">
                      {cart.length} chemical item{cart.length !== 1 ? 's' : ''} in quotation queue
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                    <ShoppingCart className="w-10 h-10 mb-2 stroke-[1.5] text-slate-300 dark:text-slate-700" />
                    <p className="font-medium text-xs text-slate-600 dark:text-slate-400">Your RFQ cart is empty</p>
                    <p className="text-[11px] text-slate-400 mt-1">Browse our chemicals and add items to request a quote.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className={`p-4 rounded-xl border flex flex-col gap-3 ${
                        darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-[#faf9f6] border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-500">
                            <span>CAS: {item.product.cas}</span>
                            <span>•</span>
                            <span className="text-[#0284c7] dark:text-[#4fc3f7] font-semibold">{item.product.formula}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeCartItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 mb-1">
                            Target Quantity
                          </label>
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) => updateCartItemQuantity(item.product.id, e.target.value)}
                            placeholder="e.g. 2 MT, 500 kg"
                            className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                              darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 mb-1">
                            Packaging Choice
                          </label>
                          <select
                            value={item.packaging}
                            onChange={(e) => updateCartItemPackaging(item.product.id, e.target.value)}
                            className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                              darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                            }`}
                          >
                            {item.product.packOptions.map((opt, oIdx) => (
                              <option key={oIdx} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                  <button
                    onClick={openBatchCartRfq}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-[#0284c7] to-[#4fc3f7] text-slate-950 shadow-md hover:brightness-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Request Quotation for All ({cart.length}) Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full py-1 text-xs text-slate-400 hover:text-rose-500 text-center"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          8. TECHNICAL SPECIFICATIONS MODAL
         ======================================================== */}
      {activeSpecProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActiveSpecProduct(null)}></div>

          <div className={`relative max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden border z-10 flex flex-col max-h-[90vh] ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <img
                src={activeSpecProduct.image}
                alt={activeSpecProduct.name}
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'; }}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

              <button
                onClick={() => setActiveSpecProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4fc3f7] text-slate-950">
                  {activeSpecProduct.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 leading-tight">
                  {activeSpecProduct.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs font-mono text-sky-200">
                  <span>CAS: {activeSpecProduct.cas}</span>
                  <span>•</span>
                  <span>{activeSpecProduct.formula}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Overview</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeSpecProduct.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Standard Certificate of Analysis (COA) Specifications
                </h4>
                <div className="rounded-xl border overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className={darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                      <tr>
                        <th className="py-2 px-3 font-semibold border-b border-slate-200 dark:border-slate-700">Test Parameter</th>
                        <th className="py-2 px-3 font-semibold border-b border-slate-200 dark:border-slate-700">Monograph Standard</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {Object.entries(activeSpecProduct.specifications).map(([key, val], idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? (darkMode ? 'bg-slate-900/40' : 'bg-white') : (darkMode ? 'bg-slate-800/20' : 'bg-slate-50/60')}>
                          <td className="py-2 px-3 font-medium text-slate-600 dark:text-slate-400">{key}</td>
                          <td className="py-2 px-3 font-mono font-semibold text-slate-900 dark:text-white">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Applications</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {activeSpecProduct.applications.map((app, aIdx) => (
                    <div key={aIdx} className="p-2 rounded-xl border flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-slate-700 dark:text-slate-200">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900">
              <button
                onClick={() => toggleCartItem(activeSpecProduct)}
                className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                  isInCart(activeSpecProduct.id)
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                    : 'bg-[#4fc3f7] text-slate-900 hover:bg-[#38bdf8]'
                }`}
              >
                {isInCart(activeSpecProduct.id) ? (
                  <>
                    <Trash2 className="w-3.5 h-3.5" /> Remove from RFQ
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" /> Add to RFQ Cart
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveSpecProduct(null);
                  openSingleProductRfq(activeSpecProduct);
                }}
                className="py-2 px-4 rounded-xl font-bold text-xs bg-[#0284c7] hover:bg-[#0369a1] text-white flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Instant Quotation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          9. UNIFIED COMMERCIAL RFQ CHECKOUT MODAL
         ======================================================== */}
      {isRfqModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => !rfqSuccessRef && setIsRfqModalOpen(false)}></div>

          <div className={`relative max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden border z-10 flex flex-col max-h-[92vh] ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] dark:text-[#4fc3f7]">
                  MARUTI CHEMICALS COMMERCIAL DESK
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {rfqTargetProduct ? `Request Quotation: ${rfqTargetProduct.name}` : `Multi-Product RFQ Engine (${cart.length} Items)`}
                </h3>
              </div>
              <button
                onClick={() => setIsRfqModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {rfqSuccessRef ? (
              <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Quotation Request Dispatched!
                </h4>

                <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 text-xs max-w-md w-full">
                  <div className="text-slate-500 mb-1">Your RFQ Reference Code:</div>
                  <div className="text-lg font-mono font-black text-[#0284c7] dark:text-[#4fc3f7]">
                    {rfqSuccessRef}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                  Thank you for your commercial inquiry. Our commercial desk will dispatch your proforma quote, COA, and freight timeline to <strong className="text-slate-900 dark:text-white">{rfqForm.email || 'your email'}</strong> within <strong>4 working hours</strong>.
                </p>

                <div className="pt-2">
                  <button
                    onClick={closeRfqSuccess}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#0284c7] text-white hover:bg-[#0369a1]"
                  >
                    Done & Return to Catalog
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Chemical Items in this Quotation
                  </h4>
                  <div className="rounded-xl border divide-y overflow-hidden text-xs max-h-36 overflow-y-auto border-slate-200 dark:border-slate-800">
                    {rfqTargetProduct ? (
                      <div className="p-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white">{rfqTargetProduct.name}</span>
                          <span className="ml-2 font-mono text-slate-500">CAS: {rfqTargetProduct.cas}</span>
                        </div>
                        <span className="font-medium text-slate-600 dark:text-slate-300">{rfqTargetProduct.packaging}</span>
                      </div>
                    ) : (
                      cart.map(item => (
                        <div key={item.product.id} className="p-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white">{item.product.name}</span>
                            <span className="ml-2 font-mono text-slate-500">({item.quantity})</span>
                          </div>
                          <span className="font-medium text-slate-600 dark:text-slate-300">{item.packaging}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Corporate Procurement Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Contact Person Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.fullName}
                        onChange={(e) => setRfqForm({ ...rfqForm, fullName: e.target.value })}
                        placeholder="e.g. Rajesh Mehta"
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Company Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.companyName}
                        onChange={(e) => setRfqForm({ ...rfqForm, companyName: e.target.value })}
                        placeholder="e.g. Apex Pharma Solutions Ltd."
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Corporate Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={rfqForm.email}
                        onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                        placeholder="procurement@company.com"
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Phone / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={rfqForm.phone}
                        onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                        placeholder="+91 98102 XXXXX"
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Delivery City / Discharge Port <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.destination}
                        onChange={(e) => setRfqForm({ ...rfqForm, destination: e.target.value })}
                        placeholder="e.g. Baddi / Delhi-NCR / Mumbai"
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Commercial Terms
                      </label>
                      <select
                        value={rfqForm.incoterm}
                        onChange={(e) => setRfqForm({ ...rfqForm, incoterm: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="Door Delivery (FOR Destination)">Door Delivery (FOR Destination)</option>
                        <option value="FOB India Port (Nhava Sheva / Mundra)">FOB India Port</option>
                        <option value="CIF Destination Port">CIF Destination Port</option>
                        <option value="Ex-Warehouse Ghaziabad">Ex-Warehouse Ghaziabad</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1 text-xs">
                      Custom Purity / Palletization / Special Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={rfqForm.instructions}
                      onChange={(e) => setRfqForm({ ...rfqForm, instructions: e.target.value })}
                      placeholder="Specify requested assay limits, cleanroom bagging, wooden pallets, or required delivery date..."
                      className={`w-full p-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                      }`}
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Valid Drug License & 4-Hour Proforma SLA</span>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl font-bold text-xs bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit RFQ</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          10. CORPORATE B2B FOOTER
         ======================================================== */}
      <footer className="bg-[#0b1723] text-slate-400 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-tr from-[#0284c7] to-[#4fc3f7] text-white shadow-sm">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div className="text-xl font-bold text-white">
                  MARUTI <span className="font-light text-[#4fc3f7]">CHEMICALS</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Maruti Chemicals is a premier manufacturer, distributor, and export enterprise delivering high-purity industrial, specialty, and pharmacopoeial chemicals across global trading destinations.
              </p>
              <div className="text-xs text-slate-400">
                Director: <strong className="text-white">Pankaj Gupta</strong> · 10+ Years of Distribution Excellence
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">5 Core Industries</h4>
              <ul className="space-y-2">
                {CATEGORIES.map(cat => (
                  <li key={cat.name}>
                    <button
                      onClick={() => { setSelectedCategory(cat.name); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                      className="hover:text-[#4fc3f7] transition"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Corporate Desk</h4>
              <div className="space-y-2">
                <p>+91 98102 65053</p>
                <p>0120-4557740</p>
                <p>maruti_chemicals@yahoo.com</p>
                <p className="text-slate-400">
                  II-C/199, Nehru Nagar, Ghaziabad (U.P.) — 201001, India
                </p>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-slate-800 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <p>© {new Date().getFullYear()} Maruti Chemicals. All Rights Reserved.</p>
            <p>ISO 9001:2015, WHO-cGMP & REACH Compliant Distribution.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
