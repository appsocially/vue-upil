function componentByLabel({ label }, component) {
  switch (label) {
    case 'date':
      return () => import('./date')
    case 'date-time':
      return () => import('./date-time')
    case 'range':
      return () => import('./range')
    default:
      return component
  }
}

function componentByType({ type }, component) {
  switch (type) {
    case 'select':
      return () => import('./select')
    case 'multi-select':
      return () => import('./multi-select')
    case 'template':
      return () => import('./text-input')
    default:
      return component
  }
}

export function calculateComponent({ type, label }) {
  const byTypeComponent = componentByType({ type }, null)
  return componentByLabel({ label }, byTypeComponent)
}
