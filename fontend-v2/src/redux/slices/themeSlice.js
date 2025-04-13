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
  fontFamily: "Roboto"
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("theme", JSON.stringify(state));
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    //
    initTheme: (state, action) => {
      Object.assign(state, action.payload);
      saveToLocalStorage(state);
    },
    setAdvancedMode: (state, action) => {
      state.advancedMode = action.payload;
      saveToLocalStorage(state);
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
      saveToLocalStorage(state);
    },
    removeCustomPreset: (state, action) => {
      const { name } = action.payload;
      state.customPresets = state.customPresets.filter(
        (preset) => preset.name !== name
      );
      saveToLocalStorage(state);
    },
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
      saveToLocalStorage(state);
    },
    setColorPrimary: (state, action) => {
      state.colorPrimary = action.payload;
      saveToLocalStorage(state);
    },
    setColorPrimaryBg: (state, action) => {
      state.colorPrimaryBg = action.payload;
      saveToLocalStorage(state);
    },
    setColorPrimaryBgHover: (state, action) => {
      state.colorPrimaryBgHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorPrimaryBorder: (state, action) => {
      state.colorPrimaryBorder = action.payload;
      saveToLocalStorage(state);
    },
    setColorPrimaryBorderHover: (state, action) => {
      state.colorPrimaryBorderHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorPrimaryHover: (state, action) => {
      state.colorPrimaryHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorPrimaryActive: (state, action) => {
      state.colorPrimaryActive = action.payload;
      saveToLocalStorage(state);
    },
    setColorPrimaryTextHover: (state, action) => {
      state.colorPrimaryTextHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorPrimaryText: (state, action) => {
      state.colorPrimaryText = action.payload;
      saveToLocalStorage(state);
    },
    setColorPrimaryTextActive: (state, action) => {
      state.colorPrimaryTextActive = action.payload;
      saveToLocalStorage(state);
    },
    setColorSuccess: (state, action) => {
      state.colorSuccess = action.payload;
      saveToLocalStorage(state);
    },
    setColorSuccessBg: (state, action) => {
      state.colorSuccessBg = action.payload;
      saveToLocalStorage(state);
    },
    setColorSuccessBgHover: (state, action) => {
      state.colorSuccessBgHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorSuccessBorder: (state, action) => {
      state.colorSuccessBorder = action.payload;
      saveToLocalStorage(state);
    },
    setColorSuccessBorderHover: (state, action) => {
      state.colorSuccessBorderHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorSuccessHover: (state, action) => {
      state.colorSuccessHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorSuccessActive: (state, action) => {
      state.colorSuccessActive = action.payload;
      saveToLocalStorage(state);
    },
    setColorSuccessTextHover: (state, action) => {
      state.colorSuccessTextHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorSuccessText: (state, action) => {
      state.colorSuccessText = action.payload;
      saveToLocalStorage(state);
    },
    setColorSuccessTextActive: (state, action) => {
      state.colorSuccessTextActive = action.payload;
      saveToLocalStorage(state);
    },
    setColorWarning: (state, action) => {
      state.colorWarning = action.payload;
      saveToLocalStorage(state);
    },
    setColorWarningBg: (state, action) => {
      state.colorWarningBg = action.payload;
      saveToLocalStorage(state);
    },
    setColorWarningBgHover: (state, action) => {
      state.colorWarningBgHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorWarningBorder: (state, action) => {
      state.colorWarningBorder = action.payload;
      saveToLocalStorage(state);
    },
    setColorWarningBorderHover: (state, action) => {
      state.colorWarningBorderHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorWarningHover: (state, action) => {
      state.colorWarningHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorWarningActive: (state, action) => {
      state.colorWarningActive = action.payload;
      saveToLocalStorage(state);
    },
    setColorWarningTextHover: (state, action) => {
      state.colorWarningTextHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorWarningText: (state, action) => {
      state.colorWarningText = action.payload;
      saveToLocalStorage(state);
    },
    setColorWarningTextActive: (state, action) => {
      state.colorWarningTextActive = action.payload;
      saveToLocalStorage(state);
    },
    setColorError: (state, action) => {
      state.colorError = action.payload;
      saveToLocalStorage(state);
    },
    setColorErrorBg: (state, action) => {
      state.colorErrorBg = action.payload;
      saveToLocalStorage(state);
    },
    setColorErrorBgHover: (state, action) => {
      state.colorErrorBgHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorErrorBorder: (state, action) => {
      state.colorErrorBorder = action.payload;
      saveToLocalStorage(state);
    },
    setColorErrorBorderHover: (state, action) => {
      state.colorErrorBorderHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorErrorHover: (state, action) => {
      state.colorErrorHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorErrorActive: (state, action) => {
      state.colorErrorActive = action.payload;
      saveToLocalStorage(state);
    },
    setColorErrorTextHover: (state, action) => {
      state.colorErrorTextHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorErrorText: (state, action) => {
      state.colorErrorText = action.payload;
      saveToLocalStorage(state);
    },
    setColorErrorTextActive: (state, action) => {
      state.colorErrorTextActive = action.payload;
      saveToLocalStorage(state);
    },
    setColorInfo: (state, action) => {
      state.colorInfo = action.payload;
      saveToLocalStorage(state);
    },
    setColorLink: (state, action) => {
      state.colorLink = action.payload;
      saveToLocalStorage(state);
    },
    setColorLinkHover: (state, action) => {
      state.colorLinkHover = action.payload;
      saveToLocalStorage(state);
    },
    setColorLinkActive: (state, action) => {
      state.colorLinkActive = action.payload;
      saveToLocalStorage(state);
    },
    setColorTextBase: (state, action) => {
      state.colorTextBase = action.payload;
      saveToLocalStorage(state);
    },
    setColorBgBase: (state, action) => {
      state.colorBgBase = action.payload;
      saveToLocalStorage(state);
    },
    setColorText: (state, action) => {
      state.colorText = action.payload;
      saveToLocalStorage(state);
    },
    setColorTextSecondary: (state, action) => {
      state.colorTextSecondary = action.payload;
      saveToLocalStorage(state);
    },
    setColorTextTertiary: (state, action) => {
      state.colorTextTertiary = action.payload;
      saveToLocalStorage(state);
    },
    setColorTextQuaternary: (state, action) => {
      state.colorTextQuaternary = action.payload;
      saveToLocalStorage(state);
    },
    setColorBorder: (state, action) => {
      state.colorBorder = action.payload;
      saveToLocalStorage(state);
    },
    setColorBorderSecondary: (state, action) => {
      state.colorBorderSecondary = action.payload;
      saveToLocalStorage(state);
    },
    setColorFill: (state, action) => {
      state.colorFill = action.payload;
      saveToLocalStorage(state);
    },
    setColorFillSecondary: (state, action) => {
      state.colorFillSecondary = action.payload;
      saveToLocalStorage(state);
    },
    setColorFillTertiary: (state, action) => {
      state.colorFillTertiary = action.payload;
      saveToLocalStorage(state);
    },
    setColorFillQuaternary: (state, action) => {
      state.colorFillQuaternary = action.payload;
      saveToLocalStorage(state);
    },
    setColorBgContainer: (state, action) => {
      state.colorBgContainer = action.payload;
      saveToLocalStorage(state);
    },
    setColorBgElevated: (state, action) => {
      state.colorBgElevated = action.payload;
      saveToLocalStorage(state);
    },
    setColorBgLayout: (state, action) => {
      state.colorBgLayout = action.payload;
      saveToLocalStorage(state);
    },
    setColorBgSpotlight: (state, action) => {
      state.colorBgSpotlight = action.payload;
      saveToLocalStorage(state);
    },
    setColorBgMask: (state, action) => {
      state.colorBgMask = action.payload;
      saveToLocalStorage(state);
    },
    setSizeMode: (state, action) => {
      state.sizeMode = action.payload;
      saveToLocalStorage(state);
    },
    setFontSizeSM: (state, action) => {
      state.fontSizeSM = action.payload;
      saveToLocalStorage(state);
    },
    setFontSizeLG: (state, action) => {
      state.fontSizeLG = action.payload;
      saveToLocalStorage(state);
    },
    setFontSizeXL: (state, action) => {
      state.fontSizeXL = action.payload;
      saveToLocalStorage(state);
    },
    setFontSizeHeading1: (state, action) => {
      state.fontSizeHeading1 = action.payload;
      saveToLocalStorage(state);
    },
    setFontSizeHeading2: (state, action) => {
      state.fontSizeHeading2 = action.payload;
      saveToLocalStorage(state);
    },
    setFontSizeHeading3: (state, action) => {
      state.fontSizeHeading3 = action.payload;
      saveToLocalStorage(state);
    },
    setFontSizeHeading4: (state, action) => {
      state.fontSizeHeading4 = action.payload;
      saveToLocalStorage(state);
    },
    setFontSizeHeading5: (state, action) => {
      state.fontSizeHeading5 = action.payload;
      saveToLocalStorage(state);
    },
    setLineHeight: (state, action) => {
      state.lineHeight = action.payload;
      saveToLocalStorage(state);
    },
    setLineHeightSM: (state, action) => {
      state.lineHeightSM = action.payload;
      saveToLocalStorage(state);
    },
    setLineHeightLG: (state, action) => {
      state.lineHeightLG = action.payload;
      saveToLocalStorage(state);
    },
    setLineHeightHeading1: (state, action) => {
      state.lineHeightHeading1 = action.payload;
      saveToLocalStorage(state);
    },
    setLineHeightHeading2: (state, action) => {
      state.lineHeightHeading2 = action.payload;
      saveToLocalStorage(state);
    },
    setLineHeightHeading3: (state, action) => {
      state.lineHeightHeading3 = action.payload;
      saveToLocalStorage(state);
    },
    setLineHeightHeading4: (state, action) => {
      state.lineHeightHeading4 = action.payload;
      saveToLocalStorage(state);
    },
    setLineHeightHeading5: (state, action) => {
      state.lineHeightHeading5 = action.payload;
      saveToLocalStorage(state);
    },
    setSizeStep: (state, action) => {
      state.sizeStep = action.payload;
      saveToLocalStorage(state);
    },
    setSizeUnit: (state, action) => {
      state.sizeUnit = action.payload;
      saveToLocalStorage(state);
    },
    setMarginXXS: (state, action) => {
      state.marginXXS = action.payload;
      saveToLocalStorage(state);
    },
    setMarginXS: (state, action) => {
      state.marginXS = action.payload;
      saveToLocalStorage(state);
    },
    setMarginSM: (state, action) => {
      state.marginSM = action.payload;
      saveToLocalStorage(state);
    },
    setMargin: (state, action) => {
      state.margin = action.payload;
      saveToLocalStorage(state);
    },
    setMarginMD: (state, action) => {
      state.marginMD = action.payload;
      saveToLocalStorage(state);
    },
    setMarginLG: (state, action) => {
      state.marginLG = action.payload;
      saveToLocalStorage(state);
    },
    setMarginXL: (state, action) => {
      state.marginXL = action.payload;
      saveToLocalStorage(state);
    },
    setMarginXXL: (state, action) => {
      state.marginXXL = action.payload;
      saveToLocalStorage(state);
    },
    setPaddingXXS: (state, action) => {
      state.paddingXXS = action.payload;
      saveToLocalStorage(state);
    },
    setPaddingXS: (state, action) => {
      state.paddingXS = action.payload;
      saveToLocalStorage(state);
    },
    setPaddingSM: (state, action) => {
      state.paddingSM = action.payload;
      saveToLocalStorage(state);
    },
    setPadding: (state, action) => {
      state.padding = action.payload;
      saveToLocalStorage(state);
    },
    setPaddingMD: (state, action) => {
      state.paddingMD = action.payload;
      saveToLocalStorage(state);
    },
    setPaddingLG: (state, action) => {
      state.paddingLG = action.payload;
      saveToLocalStorage(state);
    },
    setPaddingXL: (state, action) => {
      state.paddingXL = action.payload;
      saveToLocalStorage(state);
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
      saveToLocalStorage(state);
    },
    setBorderRadiusXS: (state, action) => {
      state.borderRadiusXS = action.payload;
      saveToLocalStorage(state);
    },
    setBorderRadiusSM: (state, action) => {
      state.borderRadiusSM = action.payload;
      saveToLocalStorage(state);
    },
    setBorderRadiusLG: (state, action) => {
      state.borderRadiusLG = action.payload;
      saveToLocalStorage(state);
    },
    setBoxShadow: (state, action) => {
      state.boxShadow = action.payload;
      saveToLocalStorage(state);
    },
    setBoxShadowSecondary: (state, action) => {
      state.boxShadowSecondary = action.payload;
      saveToLocalStorage(state);
    },
    setWireframe: (state, action) => {
      state.wireframe = action.payload;
      saveToLocalStorage(state);
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
      saveToLocalStorage(state);
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
      loadGoogleFont(action.payload);
      saveToLocalStorage(state);
    }
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
  setFontFamily
} = themeSlice.actions;

export default themeSlice.reducer;
