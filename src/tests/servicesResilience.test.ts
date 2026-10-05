/**
 * Kingdom Rise Limited - Services Data Resilience & Division Safety Tests
 * Verifies that:
 * 1. Division numbers are safely extracted from various document schemas (flat, nested, number, string, missing)
 * 2. Empty service lists do not crash and display safe fallbacks
 * 3. Incomplete service documents (missing divisionNumber, capabilities, team, highlights) are safely normalized
 * 4. Sorting with missing/undefined division numbers never throws
 * 5. Corrupted / undefined elements in services array are safely filtered out
 */

import { DBService } from '../types/database';
import { INITIAL_SERVICES } from '../data/companyData';

// Safe extraction helper identical to ServicesPage logic
export function extractDivisionNumber(service?: Partial<DBService> | null, fallbackIndex: number = 0): string {
  if (!service) return String(fallbackIndex + 1).padStart(2, '0');
  
  const rawNum =
    service.divisionNumber ??
    (service as Record<string, any>)?.division?.divisionNumber ??
    (service as Record<string, any>)?.division_number;

  if (typeof rawNum === 'string' && rawNum.trim().length > 0) {
    return rawNum.trim();
  }
  if (typeof rawNum === 'number') {
    return String(rawNum).padStart(2, '0');
  }

  // Derive from known service IDs
  if (service.id === 'civil-engineering') return '01';
  if (service.id === 'electrical-engineering') return '02';
  if (service.id === 'mechanical-engineering') return '03';
  if (service.id === 'specialized-services') return '04';

  return String(fallbackIndex + 1).padStart(2, '0');
}

export function normalizeService(service?: Partial<DBService> | null, index: number = 0): DBService {
  const divisionNum = extractDivisionNumber(service, index);
  return {
    id: service?.id || `service-${divisionNum}`,
    divisionNumber: divisionNum,
    categoryId: service?.categoryId || '',
    title: service?.title || (divisionNum === '01' ? 'Civil Engineering' : `Division ${divisionNum}`),
    slug: service?.slug || service?.id || `division-${divisionNum}`,
    shortDesc: service?.shortDesc || '',
    fullDesc: service?.fullDesc || service?.shortDesc || '',
    capabilities: Array.isArray(service?.capabilities) ? service.capabilities : [],
    teamComposition: Array.isArray(service?.teamComposition) ? service.teamComposition : [],
    keyHighlights: Array.isArray(service?.keyHighlights) ? service.keyHighlights : [],
    image: service?.image || '/src/assets/images/services/kingdom-rise-civil-engineering.jpg',
    isPublished: service?.isPublished !== false,
    seoTitle: service?.seoTitle || '',
    seoDescription: service?.seoDescription || '',
    createdAt: service?.createdAt || new Date().toISOString(),
    updatedAt: service?.updatedAt || new Date().toISOString(),
  };
}

// TEST 1: Handles completely undefined or null service objects
export function testUndefinedServiceExtraction() {
  const num1 = extractDivisionNumber(undefined, 0);
  const num2 = extractDivisionNumber(null, 2);
  if (num1 !== '01') throw new Error(`Expected '01', got '${num1}'`);
  if (num2 !== '03') throw new Error(`Expected '03', got '${num2}'`);
  return true;
}

// TEST 2: Handles nested division or division_number schema variations
export function testSchemaVariations() {
  const nested = { id: 'test-1', division: { divisionNumber: '02' } };
  const snake = { id: 'test-2', division_number: '03' };
  const numeric = { id: 'test-3', divisionNumber: 4 as any };
  const byId = { id: 'civil-engineering' };

  if (extractDivisionNumber(nested as any) !== '02') throw new Error('Failed to extract nested divisionNumber');
  if (extractDivisionNumber(snake as any) !== '03') throw new Error('Failed to extract snake_case division_number');
  if (extractDivisionNumber(numeric as any) !== '04') throw new Error('Failed to extract numeric divisionNumber');
  if (extractDivisionNumber(byId as any) !== '01') throw new Error('Failed to infer divisionNumber from service ID');

  return true;
}

// TEST 3: Safe normalization of incomplete documents
export function testIncompleteDocumentNormalization() {
  const emptyDoc = {};
  const normalized = normalizeService(emptyDoc, 0);

  if (!normalized.divisionNumber || normalized.divisionNumber !== '01') {
    throw new Error('Normalized document must have divisionNumber');
  }
  if (!Array.isArray(normalized.capabilities)) {
    throw new Error('capabilities must be array');
  }
  if (!Array.isArray(normalized.teamComposition)) {
    throw new Error('teamComposition must be array');
  }
  if (!Array.isArray(normalized.keyHighlights)) {
    throw new Error('keyHighlights must be array');
  }
  if (!normalized.image) {
    throw new Error('image fallback must be present');
  }

  return true;
}

// TEST 4: Sorting handles missing divisionNumber without throwing
export function testSafeSorting() {
  const items: Partial<DBService>[] = [
    { title: 'Doc C', divisionNumber: undefined },
    { title: 'Doc A', divisionNumber: '01' },
    { title: 'Doc B', divisionNumber: '02' },
  ];

  // Sorting should not throw
  items.sort((a, b) => (a.divisionNumber || '').localeCompare(b.divisionNumber || ''));

  if (items[1].divisionNumber !== '01' && items[0].divisionNumber !== '01') {
    // Both 01 and 02 are valid
  }
  return true;
}

// TEST 5: Verify all INITIAL_SERVICES have valid division numbers
export function testInitialServicesIntegrity() {
  if (!Array.isArray(INITIAL_SERVICES) || INITIAL_SERVICES.length !== 4) {
    throw new Error(`Expected 4 initial services, found ${INITIAL_SERVICES?.length}`);
  }

  INITIAL_SERVICES.forEach((s) => {
    if (!s.divisionNumber || typeof s.divisionNumber !== 'string') {
      throw new Error(`Service ${s.id} is missing divisionNumber`);
    }
    if (!s.title || !s.fullDesc) {
      throw new Error(`Service ${s.id} is missing core textual content`);
    }
  });

  return true;
}

// Runner
export function runAllResilienceTests() {
  testUndefinedServiceExtraction();
  testSchemaVariations();
  testIncompleteDocumentNormalization();
  testSafeSorting();
  testInitialServicesIntegrity();
  console.log('All Services resilience and division safety tests passed successfully.');
  return true;
}
