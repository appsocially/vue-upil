export const defaultListeners = (providerState) => ({
  'scenario-end': () => {
    return new Promise((resolve) => {
      providerState.scenarioEnded = true
      resolve()
    })
  },
})
