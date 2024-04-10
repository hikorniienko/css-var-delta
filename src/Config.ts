type ConfigType = Record<'portrait' | 'landscape', Array<{ width: number, height: number }>>

export class Config {
  /**
  * Config screen sizes for delta calculation
  */
  protected readonly config: ConfigType

  /**
  * Constructor
  * @param config - Config screen sizes for delta calculation in format ['orientation@widthxheight'].
  *  Where orientation is 'portrait' or 'landscape'.
  *  Default value is ['portrait@360x540', 'landscape@960x540']
  */
  constructor (config: string[] = ['portrait@360x540', 'landscape@960x540']) {
    // Verify the existence of the window object
    if (typeof window === 'undefined') {
      throw new Error('CssVarDelta: window is not defined')
    }

    // Verify the existence of the config
    if (!Array.isArray(config) || config.length === 0) {
      throw new Error('CssVarDelta: Config is not defined')
    }

    // Parse the config
    const parseConfig: ConfigType = {
      portrait: [],
      landscape: []
    }

    Object.keys(parseConfig).forEach((orientation) => {
      const orientationConfig = config.filter((item) => item.split('@')[0] === orientation)
      if (orientationConfig.length === 0) {
        throw new Error(`CssVarDelta: Config for ${orientation} orientation not found`)
      }

      orientationConfig.sort((a, b) => {
        const [, sizeA] = a.split('@')
        const [, sizeB] = b.split('@')
        const [widthA] = sizeA.split('x')
        const [widthB] = sizeB.split('x')
        return +widthA - +widthB
      })

      parseConfig[orientation as keyof typeof parseConfig] = orientationConfig.map((item) => {
        const [, size] = item.split('@')
        const [width, height] = size.split('x')
        return { width: +width, height: +height }
      })
    })

    this.config = parseConfig
  }
}
