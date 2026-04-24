import '@testing-library/jest-dom'

// CONFIGURACIÓN GLOBAL DE TESTS
// ==========================================
// Este archivo se ejecuta antes de cada test.
// Es el lugar ideal para configurar mocks globales y extensiones.

// Note for students:
// Para mockear 'next/navigation' en futuros tests de componentes
// (necesario cuando usas useRouter, usePathname, etc.):
//
// vi.mock('next/navigation', () => ({
//   useRouter: () => ({ 
//     push: vi.fn(), 
//     replace: vi.fn(), 
//     back: vi.fn(),
//     prefetch: vi.fn() 
//   }),
//   usePathname: () => '/',
//   useSearchParams: () => new URLSearchParams(),
// }))
