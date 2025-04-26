// src/redux/slices/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loadGoogleFont } from "../../utils/loadGoogleFont";

const savedTheme = JSON.parse(localStorage.getItem("theme")) || {};

const initialState = {
  // che do nang cao
  advancedMode:  false,
  customPresets:  [],
  themeMode: "light",

  colorPrimary: null,
  colorPrimaryBg:  null,
  colorPrimaryBgHover:  null,
  colorPrimaryBorder:  null,
  colorPrimaryBorderHover: null,
  colorPrimaryHover: null,
  colorPrimaryActive: null,
  colorPrimaryTextHover: null,
  colorPrimaryText: null,
  colorPrimaryTextActive: null,

  colorSuccess: null,
  colorSuccessBg: null,
  colorSuccessBgHover: null,
  colorSuccessBorder: null,
  colorSuccessBorderHover: null,
  colorSuccessHover: null,
  colorSuccessActive: null,
  colorSuccessTextHover: null,
  colorSuccessText: null,
  colorSuccessTextActive: null,

  colorWarning: null,
  colorWarningBg: null,
  colorWarningBgHover: null,
  colorWarningBorder: null,
  colorWarningBorderHover: null,
  colorWarningHover: null,
  colorWarningActive: null,
  colorWarningTextHover: null,
  colorWarningText: null,
  colorWarningTextActive: null,

  colorError: null,
  colorErrorBg: null,
  colorErrorBgHover: null,
  colorErrorBorder: null,
  colorErrorBorderHover: null,
  colorErrorHover: null,
  colorErrorActive: null,
  colorErrorTextHover: null,
  colorErrorText: null,
  colorErrorTextActive: null,

  colorInfo: null,
  colorInfoBg: null,
  colorInfoBgHover: null,
  colorInfoBorder: null,
  colorInfoBorderHover: null,
  colorInfoHover: null,
  colorInfoActive: null,
  colorInfoTextHover: null,
  colorInfoText: null,
  colorInfoTextActive: null,


  colorLink: null,
  colorLinkHover: null,
  colorLinkActive: null,

  colorTextBase: null,
  colorBgBase: null,

  colorText: null,
  colorTextSecondary: null,
  colorTextTertiary: null,
  colorTextQuaternary: null,

  colorBorder: null,
  colorBorderSecondary: null,

  colorFill: null,
  colorFillSecondary: null,
  colorFillTertiary: null,
  colorFillQuaternary: null,

  colorBgContainer: null,
  colorBgElevated: null,
  colorBgLayout: null,
  colorBgSpotlight: null,
  colorBgMask: null,

  sizeMode: null,
  fontSizeSM: null,
  fontSizeLG: null,
  fontSizeXL: null,
  fontSizeHeading1: null,
  fontSizeHeading2: null,
  fontSizeHeading3: null,
  fontSizeHeading4: null,
  fontSizeHeading5: null,
  lineHeight: null,
  lineHeightSM: null,
  lineHeightLG: null,
  lineHeightHeading1: null,
  lineHeightHeading2: null,
  lineHeightHeading3: null,
  lineHeightHeading4: null,
  lineHeightHeading5: null,

  sizeStep: null,
  sizeUnit: null,

  marginXXS: null,
  marginXS: null,
  marginSM: null,
  margin: null,
  marginMD: null,
  marginLG: null,
  marginXL: null,
  marginXXL: null,

  paddingXXS: null,
  paddingXS: null,
  paddingSM: null,
  padding: null,
  paddingMD: null,
  paddingLG: null,
  paddingXL: null,

  borderRadius: null,
  borderRadiusXS: null,
  borderRadiusSM: null,
  borderRadiusLG: null,

  boxShadow: null,
  boxShadowSecondary: null,

  wireframe: false,

  fontSize: null,
  fontFamily: "Roboto",
  isChange: false,
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("theme", JSON.stringify(state));
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    initTheme: (state, action) => {
      Object.assign(state, action.payload);
    },
    setAdvancedMode: (state, action) => {
      state.advancedMode = action.payload;
    },
    saveCustomPresets: (state, action) => {
      const { name } = action.payload;
      const existingPreset = state.customPresets.find(
        (preset) => preset.name === name
      );
      if (existingPreset) {
        // Update the existing preset
        existingPreset.theme = action.payload.theme;
      } else {
        // Add a new preset
        state.customPresets.push(action.payload);
      }
    },
    removeCustomPreset: (state, action) => {
      const { name } = action.payload;
      state.customPresets = state.customPresets.filter(
        (preset) => preset.name !== name
      );
    },
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
    setColorPrimary: (state, action) => {
      state.colorPrimary = action.payload;
    },
    setColorPrimaryBg: (state, action) => {
      state.colorPrimaryBg = action.payload;
    },
    setColorPrimaryBgHover: (state, action) => {
      state.colorPrimaryBgHover = action.payload;
    },
    setColorPrimaryBorder: (state, action) => {
      state.colorPrimaryBorder = action.payload;
    },
    setColorPrimaryBorderHover: (state, action) => {
      state.colorPrimaryBorderHover = action.payload;
    },
    setColorPrimaryHover: (state, action) => {
      state.colorPrimaryHover = action.payload;
    },
    setColorPrimaryActive: (state, action) => {
      state.colorPrimaryActive = action.payload;
    },
    setColorPrimaryTextHover: (state, action) => {
      state.colorPrimaryTextHover = action.payload;
    },
    setColorPrimaryText: (state, action) => {
      state.colorPrimaryText = action.payload;
    },
    setColorPrimaryTextActive: (state, action) => {
      state.colorPrimaryTextActive = action.payload;
    },
    setColorSuccess: (state, action) => {
      state.colorSuccess = action.payload;
    },
    setColorSuccessBg: (state, action) => {
      state.colorSuccessBg = action.payload;
    },
    setColorSuccessBgHover: (state, action) => {
      state.colorSuccessBgHover = action.payload;
    },
    setColorSuccessBorder: (state, action) => {
      state.colorSuccessBorder = action.payload;
    },
    setColorSuccessBorderHover: (state, action) => {
      state.colorSuccessBorderHover = action.payload;
    },
    setColorSuccessHover: (state, action) => {
      state.colorSuccessHover = action.payload;
    },
    setColorSuccessActive: (state, action) => {
      state.colorSuccessActive = action.payload;
    },
    setColorSuccessTextHover: (state, action) => {
      state.colorSuccessTextHover = action.payload;
    },
    setColorSuccessText: (state, action) => {
      state.colorSuccessText = action.payload;
    },
    setColorSuccessTextActive: (state, action) => {
      state.colorSuccessTextActive = action.payload;
    },
    setColorWarning: (state, action) => {
      state.colorWarning = action.payload;
    },
    setColorWarningBg: (state, action) => {
      state.colorWarningBg = action.payload;
    },
    setColorWarningBgHover: (state, action) => {
      state.colorWarningBgHover = action.payload;
    },
    setColorWarningBorder: (state, action) => {
      state.colorWarningBorder = action.payload;
    },
    setColorWarningBorderHover: (state, action) => {
      state.colorWarningBorderHover = action.payload;
    },
    setColorWarningHover: (state, action) => {
      state.colorWarningHover = action.payload;
    },
    setColorWarningActive: (state, action) => {
      state.colorWarningActive = action.payload;
    },
    setColorWarningTextHover: (state, action) => {
      state.colorWarningTextHover = action.payload;
    },
    setColorWarningText: (state, action) => {
      state.colorWarningText = action.payload;
    },
    setColorWarningTextActive: (state, action) => {
      state.colorWarningTextActive = action.payload;
    },
    setColorError: (state, action) => {
      state.colorError = action.payload;
    },
    setColorErrorBg: (state, action) => {
      state.colorErrorBg = action.payload;
    },
    setColorErrorBgHover: (state, action) => {
      state.colorErrorBgHover = action.payload;
    },
    setColorErrorBorder: (state, action) => {
      state.colorErrorBorder = action.payload;
    },
    setColorErrorBorderHover: (state, action) => {
      state.colorErrorBorderHover = action.payload;
    },
    setColorErrorHover: (state, action) => {
      state.colorErrorHover = action.payload;
    },
    setColorErrorActive: (state, action) => {
      state.colorErrorActive = action.payload;
    },
    setColorErrorTextHover: (state, action) => {
      state.colorErrorTextHover = action.payload;
    },
    setColorErrorText: (state, action) => {
      state.colorErrorText = action.payload;
    },
    setColorErrorTextActive: (state, action) => {
      state.colorErrorTextActive = action.payload;
    },
    setColorInfo: (state, action) => {
      state.colorInfo = action.payload;
    },
    setColorInfoBg: (state, action) => {
      state.colorInfoBg = action.payload;
    },
    setColorInfoBgHover: (state, action) => {
      state.colorInfoBgHover = action.payload;
    },
    setColorInfoBorder: (state, action) => {
      state.colorInfoBorder = action.payload;
    },
    setColorInfoBorderHover: (state, action) => {
      state.colorInfoBorderHover = action.payload;
    },
    setColorInfoHover: (state, action) => {
      state.colorInfoHover = action.payload;
    },
    setColorInfoActive: (state, action) => {
      state.colorInfoActive = action.payload;
    },
    setColorInfoTextHover: (state, action) => {
      state.colorInfoTextHover = action.payload;
    },
    setColorInfoText: (state, action) => {
      state.colorInfoText = action.payload;
    },
    setColorInfoTextActive: (state, action) => {
      state.colorInfoTextActive = action.payload;
    },
    setColorLink: (state, action) => {
      state.colorLink = action.payload;
    },
    setColorLinkHover: (state, action) => {
      state.colorLinkHover = action.payload;
    },
    setColorLinkActive: (state, action) => {
      state.colorLinkActive = action.payload;
    },
    setColorTextBase: (state, action) => {
      state.colorTextBase = action.payload;
    },
    setColorBgBase: (state, action) => {
      state.colorBgBase = action.payload;
    },
    setColorText: (state, action) => {
      state.colorText = action.payload;
    },
    setColorTextSecondary: (state, action) => {
      state.colorTextSecondary = action.payload;
    },
    setColorTextTertiary: (state, action) => {
      state.colorTextTertiary = action.payload;
    },
    setColorTextQuaternary: (state, action) => {
      state.colorTextQuaternary = action.payload;
    },
    setColorBorder: (state, action) => {
      state.colorBorder = action.payload;
    },
    setColorBorderSecondary: (state, action) => {
      state.colorBorderSecondary = action.payload;
    },
    setColorFill: (state, action) => {
      state.colorFill = action.payload;
    },
    setColorFillSecondary: (state, action) => {
      state.colorFillSecondary = action.payload;
    },
    setColorFillTertiary: (state, action) => {
      state.colorFillTertiary = action.payload;
    },
    setColorFillQuaternary: (state, action) => {
      state.colorFillQuaternary = action.payload;
    },
    setColorBgContainer: (state, action) => {
      state.colorBgContainer = action.payload;
    },
    setColorBgElevated: (state, action) => {
      state.colorBgElevated = action.payload;
    },
    setColorBgLayout: (state, action) => {
      state.colorBgLayout = action.payload;
    },
    setColorBgSpotlight: (state, action) => {
      state.colorBgSpotlight = action.payload;
    },
    setColorBgMask: (state, action) => {
      state.colorBgMask = action.payload;
    },
    setSizeMode: (state, action) => {
      state.sizeMode = action.payload;
    },
    setFontSizeSM: (state, action) => {
      state.fontSizeSM = action.payload;
    },
    setFontSizeLG: (state, action) => {
      state.fontSizeLG = action.payload;
    },
    setFontSizeXL: (state, action) => {
      state.fontSizeXL = action.payload;
    },
    setFontSizeHeading1: (state, action) => {
      state.fontSizeHeading1 = action.payload;
    },
    setFontSizeHeading2: (state, action) => {
      state.fontSizeHeading2 = action.payload;
    },
    setFontSizeHeading3: (state, action) => {
      state.fontSizeHeading3 = action.payload;
    },
    setFontSizeHeading4: (state, action) => {
      state.fontSizeHeading4 = action.payload;
    },
    setFontSizeHeading5: (state, action) => {
      state.fontSizeHeading5 = action.payload;
    },
    setLineHeight: (state, action) => {
      state.lineHeight = action.payload;
    },
    setLineHeightSM: (state, action) => {
      state.lineHeightSM = action.payload;
    },
    setLineHeightLG: (state, action) => {
      state.lineHeightLG = action.payload;
    },
    setLineHeightHeading1: (state, action) => {
      state.lineHeightHeading1 = action.payload;
    },
    setLineHeightHeading2: (state, action) => {
      state.lineHeightHeading2 = action.payload;
    },
    setLineHeightHeading3: (state, action) => {
      state.lineHeightHeading3 = action.payload;
    },
    setLineHeightHeading4: (state, action) => {
      state.lineHeightHeading4 = action.payload;
    },
    setLineHeightHeading5: (state, action) => {
      state.lineHeightHeading5 = action.payload;
    },
    setSizeStep: (state, action) => {
      state.sizeStep = action.payload;
    },
    setSizeUnit: (state, action) => {
      state.sizeUnit = action.payload;
    },
    setMarginXXS: (state, action) => {
      state.marginXXS = action.payload;
    },
    setMarginXS: (state, action) => {
      state.marginXS = action.payload;
    },
    setMarginSM: (state, action) => {
      state.marginSM = action.payload;
    },
    setMargin: (state, action) => {
      state.margin = action.payload;
    },
    setMarginMD: (state, action) => {
      state.marginMD = action.payload;
    },
    setMarginLG: (state, action) => {
      state.marginLG = action.payload;
    },
    setMarginXL: (state, action) => {
      state.marginXL = action.payload;
    },
    setMarginXXL: (state, action) => {
      state.marginXXL = action.payload;
    },
    setPaddingXXS: (state, action) => {
      state.paddingXXS = action.payload;
    },
    setPaddingXS: (state, action) => {
      state.paddingXS = action.payload;
    },
    setPaddingSM: (state, action) => {
      state.paddingSM = action.payload;
    },
    setPadding: (state, action) => {
      state.padding = action.payload;
    },
    setPaddingMD: (state, action) => {
      state.paddingMD = action.payload;
    },
    setPaddingLG: (state, action) => {
      state.paddingLG = action.payload;
    },
    setPaddingXL: (state, action) => {
      state.paddingXL = action.payload;
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
    },
    setBorderRadiusXS: (state, action) => {
      state.borderRadiusXS = action.payload;
    },
    setBorderRadiusSM: (state, action) => {
      state.borderRadiusSM = action.payload;
    },
    setBorderRadiusLG: (state, action) => {
      state.borderRadiusLG = action.payload;
    },
    setBoxShadow: (state, action) => {
      state.boxShadow = action.payload;
    },
    setBoxShadowSecondary: (state, action) => {
      state.boxShadowSecondary = action.payload;
    },
    setWireframe: (state, action) => {
      state.wireframe = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
      loadGoogleFont(action.payload);
    },
    setChange: (state, action) => {
      state.isChange = action.payload;
    },
  },
});

export const {
  initTheme,
  setAdvancedMode,
  saveCustomPresets,
  removeCustomPreset,
  setThemeMode,
  setColorPrimary,
  setColorPrimaryBg,
  setColorPrimaryBgHover,
  setColorPrimaryBorder,
  setColorPrimaryBorderHover,
  setColorPrimaryHover,
  setColorPrimaryActive,
  setColorPrimaryTextHover,
  setColorPrimaryText,
  setColorPrimaryTextActive,
  setColorSuccess,
  setColorSuccessBg,
  setColorSuccessBgHover,
  setColorSuccessBorder,
  setColorSuccessBorderHover,
  setColorSuccessHover,
  setColorSuccessActive,
  setColorSuccessTextHover,
  setColorSuccessText,
  setColorSuccessTextActive,
  setColorWarning,
  setColorWarningBg,
  setColorWarningBgHover,
  setColorWarningBorder,
  setColorWarningBorderHover,
  setColorWarningHover,
  setColorWarningActive,
  setColorWarningTextHover,
  setColorWarningText,
  setColorWarningTextActive,
  setColorError,
  setColorErrorBg,
  setColorErrorBgHover,
  setColorErrorBorder,
  setColorErrorBorderHover,
  setColorErrorHover,
  setColorErrorActive,
  setColorErrorTextHover,
  setColorErrorText,
  setColorErrorTextActive,
  setColorInfo,
  setColorInfoBg,
  setColorInfoBgHover,
  setColorInfoBorder,
  setColorInfoBorderHover,
  setColorInfoHover,
  setColorInfoActive,
  setColorInfoTextHover,
  setColorInfoText,
  setColorInfoTextActive,
  setColorLink,
  setColorLinkHover,
  setColorLinkActive,
  setColorTextBase,
  setColorBgBase,
  setColorText,
  setColorTextSecondary,
  setColorTextTertiary,
  setColorTextQuaternary,
  setColorBorder,
  setColorBorderSecondary,
  setColorFill,
  setColorFillSecondary,
  setColorFillTertiary,
  setColorFillQuaternary,
  setColorBgContainer,
  setColorBgElevated,
  setColorBgLayout,
  setColorBgSpotlight,
  setColorBgMask,
  setSizeMode,
  setFontSizeSM,
  setFontSizeLG,
  setFontSizeXL,
  setFontSizeHeading1,
  setFontSizeHeading2,
  setFontSizeHeading3,
  setFontSizeHeading4,
  setFontSizeHeading5,
  setLineHeight,
  setLineHeightSM,
  setLineHeightLG,
  setLineHeightHeading1,
  setLineHeightHeading2,
  setLineHeightHeading3,
  setLineHeightHeading4,
  setLineHeightHeading5,
  setSizeStep,
  setSizeUnit,
  setMarginXXS,
  setMarginXS,
  setMarginSM,
  setMargin,
  setMarginMD,
  setMarginLG,
  setMarginXL,
  setMarginXXL,
  setPaddingXXS,
  setPaddingXS,
  setPaddingSM,
  setPadding,
  setPaddingMD,
  setPaddingLG,
  setPaddingXL,
  setBorderRadius,
  setBorderRadiusXS,
  setBorderRadiusSM,
  setBorderRadiusLG,
  setBoxShadow,
  setBoxShadowSecondary,
  setWireframe,
  setFontSize,
  setFontFamily,
  setChange,
} = themeSlice.actions;

export default themeSlice.reducer;
