export namespace Types {
  export type PluginName = string | false;
  export type PluginParameters =
    | false
    | {
        [key: string]: any;
      }
    | Record<parameterId, any>
    | any;

  export const PARAMETER_KEYS = ["Default Choice Position"];

  export type parameterId = typeof PARAMETER_KEYS[number];

  export interface SystemFontSetting {
    languageCode: string;
    fontName: string;
  }

  export interface SystemFonts {
    settings: Array<SystemFontSetting>;
  }
}
