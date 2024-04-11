import { Config } from './Config'

/**
 * CSS Variable Delta
 * @description Library for calculating the delta of the screen size and setting it as a CSS variable.
 * Extremely useful for web games and responsive design.
 */
export default class CssVarDelta extends Config {
  /**
   * Debug mode, display delta, orientation, and current config in the console
   */
  debug: boolean

  /**
   * Constructor
   * @param config - Config screen sizes for delta calculation in format ['orientation@widthxheight'].
   * Where orientation is 'portrait' or 'landscape'.
   * Default value is ['portrait@360x540', 'landscape@960x540']
   * @param debug - Debug mode, display delta, orientation, and current config in the console
   * @throws {Error} Config is not defined
   * @throws {Error} Config item is not valid
   * @throws {Error} Config for orientation not found
   * @throws {Error} window is not defined
   */
  constructor (config: string[], debug = false) {
    super(config)
    this.debug = debug

    // Create a resize event listener and calculate the delta
    window.addEventListener('resize', this._onResize)
    this._onResize()
  }

  // Resize event listener
  private readonly _onResize = (): void => {
    const width = window.innerWidth
    const height = window.innerHeight
    const orientation = width > height ? 'landscape' : 'portrait'
    const orientationConfig = this.config[orientation]

    // Filter the config by width
    const orientationConfigFilter = orientationConfig.filter((item) => item.width <= width)

    // Find the current config
    const currentConfig = orientationConfigFilter.length === 0
      ? orientationConfig[0]
      : orientationConfigFilter[orientationConfigFilter.length - 1]

    // Calculate the delta
    const delta = Math.min(width / currentConfig.width, height / currentConfig.height)

    // Set the delta as a CSS variable
    document.documentElement.style.setProperty('--delta', delta.toString())

    // Display debug information in the console
    if (this.debug) {
      console.log('%c CssVarDelta: Debug ', 'color: green; font-weight: bold', { delta, orientation, currentConfig })
    }
  }

  /**
   * Destroy
   * @description Remove resize event listener and delta CSS variable
   */
  public destroy = (): void => {
    window.removeEventListener('resize', this._onResize)
    document.documentElement.style.removeProperty('--delta')
  }
}
