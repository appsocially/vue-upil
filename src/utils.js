import linkifyHtml from 'linkifyjs/html'
import dot from 'dot-object'

/**
 * If a node with text is passed in, replacement text tokens are searched for (${key}),
 * and those tokens are replaced with data stored in the data parameter.
 *
 * @param {Object} inputState - A dictionary of key:values of variable state
 * @param {string} text - text to update if necessary
 * @param {boolean} searchForLinks - Finds links in text and makes them links if necessary
 * @returns {string} - Text that was updated if necessary
 */
export function substituteNodeText(
  inputState,
  text,
  searchForLinks,
  transformTextVariables
) {
  if (text) {
    // Regex used to parse for tokens in nodes' text
    const nodeTextRegex = /\$\{([^}]+)\}/gm
    const matches = []
    let tempMatch
    while ((tempMatch = nodeTextRegex.exec(text)) !== null) {
      matches.push(tempMatch)
    }

    const newText = matches.reduce((memo, match) => {
      const [originalText, dataKey] = match
      const stateValue = dot.pick(dataKey, inputState)
      if (stateValue) {
        const transformedValue = transformTextVariables(stateValue)
        return memo.replace(originalText, transformedValue)
      } else {
        // eslint-disable-next-line
        console.error(
          `Couldn't find inputState to replace custom variable ${dataKey}`
        )
        return memo
      }
    }, text)

    if (searchForLinks) {
      return linkifyHtml(newText)
    } else {
      return newText
    }
  } else {
    return text
  }
}

export function setupListeners({ listeners, upil }) {
  const unsubscribeArray = Object.keys(listeners).map((event) => {
    const handler = listeners[event]
    return upil.on(event, handler)
  })

  return unsubscribeArray
}
