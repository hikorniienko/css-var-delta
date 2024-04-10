import { Config } from './Config'

/**
 * CSS Variable Delta
 * @description Library for calculating the delta of the screen size and setting it as a CSS variable.
 * Extremely useful for web games and responsive design.
 */
export default class CssVarDelta extends Config {
  /**
   * Constructor
   * @param config - Config screen sizes for delta calculation in format ['orientation@widthxheight'].
   * Where orientation is 'portrait' or 'landscape'.
   * Default value is ['portrait@360x540', 'landscape@960x540']
   */
  constructor (config: string[]) {
    super(config)

    // Create a resize event listener and calculate the delta
    window.addEventListener('resize', this._onResize)
    this._onResize()
  }

  /**
   * Resize event listener
   * @description Calculate the delta and set it as a CSS variable
   * @private
   * @readonly
   */
  private readonly _onResize = (): void => {
    const width = window.innerWidth
    const height = window.innerHeight
    const orientation = width > height ? 'landscape' : 'portrait'
    const orientationConfig = this.config[orientation]
    const orientationConfigFilter = orientationConfig.filter((item) => item.width <= width)
    const currentConfig = orientationConfigFilter.length === 0
      ? orientationConfig[0]
      : orientationConfigFilter[orientationConfigFilter.length - 1]

    const delta = Math.min(width / currentConfig.width, height / currentConfig.height)

    document.documentElement.style.setProperty('--delta', delta.toString())

    // TODO: Fix open keyboard on mobile
    // TODO: Fix change orientation on mobile
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

const cssVarDelta = new CssVarDelta(['portrait@360x540', 'landscape@960x540', 'portrait@500x540'])
console.log(cssVarDelta)
// cssVarDelta.destroy()
