// src/components/ThemeCustomizer/ThemeCustomizer.jsx
import {
  Drawer,
  Slider,
  Select,
  Divider,
  Space,
  ColorPicker,
  Row,
  Col,
  Typography,
  Segmented,
  Collapse,
  Card,
  Skeleton,
  InputNumber,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useMemo, useState } from "react";
import useGoogleFonts from "../../../hooks/useGoogleFonts";
import {
  CompressOutlined,
  ExpandOutlined,
  MoonFilled,
  SunFilled,
} from "@ant-design/icons";
import {
  setAdvancedMode,
  setBorderRadius,
  setFontFamily,
  setFontSize,
  setColorPrimary,
  setThemeMode,
  setColorPrimaryBg,
  setColorPrimaryBgHover,
  setColorPrimaryBorder,
  setColorPrimaryBorderHover,
  setColorPrimaryHover,
  setColorPrimaryActive,
  setColorPrimaryTextHover,
  setColorPrimaryText,
  setColorPrimaryTextActive,
  setColorSuccessBg,
  setColorSuccessBgHover,
  setColorSuccessBorder,
  setColorSuccessBorderHover,
  setColorSuccessHover,
  setColorSuccess,
  setColorSuccessActive,
  setColorSuccessTextHover,
  setColorSuccessText,
  setColorSuccessTextActive,
  setColorWarningBg,
  setColorWarningBgHover,
  setColorWarningBorder,
  setColorWarningBorderHover,
  setColorWarningHover,
  setColorWarning,
  setColorWarningActive,
  setColorWarningTextHover,
  setColorWarningText,
  setColorWarningTextActive,
  setColorErrorTextActive,
  setColorErrorText,
  setColorErrorTextHover,
  setColorErrorActive,
  setColorError,
  setColorErrorHover,
  setColorErrorBorderHover,
  setColorErrorBorder,
  setColorErrorBgHover,
  setColorErrorBg,
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
  setColorBgContainer,
  setColorBgElevated,
  setColorBgLayout,
  setColorBgSpotlight,
  setColorBgMask,
  setColorBorder,
  setColorBorderSecondary,
  setColorFill,
  setColorFillSecondary,
  setColorFillTertiary,
  setColorFillQuaternary,
  setSizeMode,
  initTheme,
  setColorInfoBg,
  setColorInfoBgHover,
  setColorInfoBorder,
  setColorInfoBorderHover,
  setColorInfoHover,
  setColorInfoActive,
  setColorInfoTextHover,
  setColorInfoText,
  setColorInfoTextActive,
} from "../../../redux/slices/themeSlice";
import { availableLanguages } from "../../../i18n";
import { useTranslation } from "react-i18next";
import { theme } from "antd";
import "flag-icon-css/css/flag-icons.min.css";
import { changeLanguage } from "../../../redux/slices/languageSlice";
import Link from "antd/es/typography/Link";
import ColorSettingRow from "./ColorSettingRow";
import MainColorPickerRow from "./MainColorPickerRow";
import CustomerSegmented from "./CustomSegmented";
import ThemeColorGroup from "./group/ThemeColorGroup";

const { Title, Text } = Typography;

const ThemeCustomizer = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { token } = theme.useToken();

  const { ...themeState } = useSelector((state) => state.theme);

  const language = useSelector((state) => state.language.currentLang);

  const [loading, setLoading] = useState(true);

  const [tempColorTextBase, setTempColorTextBase] = useState(null);
  const [tempColorBgBase, setTempColorBgBase] = useState(null);
  const [tempColorText, setTempColorText] = useState(null);
  const [tempColorTextSecondary, setTempColorTextSecondary] = useState(null);
  const [tempColorTextTertiary, setTempColorTextTertiary] = useState(null);
  const [tempColorTextQuaternary, setTempColorTextQuaternary] = useState(null);
  const [tempColorBorder, setTempColorBorder] = useState(null);
  const [tempColorBorderSecondary, setTempColorBorderSecondary] =
    useState(null);
  const [tempColorFill, setTempColorFill] = useState(null);
  const [tempColorFillSecondary, setTempColorFillSecondary] = useState(null);
  const [tempColorFillTertiary, setTempColorFillTertiary] = useState(null);
  const [tempColorFillQuaternary, setTempColorFillQuaternary] = useState(null);
  const [tempColorBgContainer, setTempColorBgContainer] = useState(null);
  const [tempColorBgElevated, setTempColorBgElevated] = useState(null);
  const [tempColorBgLayout, setTempColorBgLayout] = useState(null);
  const [tempColorBgSpotlight, setTempColorBgSpotlight] = useState(null);
  const [tempColorBgMask, setTempColorBgMask] = useState(null);
  const [tempFontSize, setTempFontSize] = useState(null);
  const [tempFontSizeSM, setTempFontSizeSM] = useState(null);
  const [tempFontSizeLG, setTempFontSizeLG] = useState(null);
  const [tempFontSizeXL, setTempFontSizeXL] = useState(null);
  const [tempFontSizeHeading1, setTempFontSizeHeading1] = useState(null);
  const [tempFontSizeHeading2, setTempFontSizeHeading2] = useState(null);
  const [tempFontSizeHeading3, setTempFontSizeHeading3] = useState(null);
  const [tempFontSizeHeading4, setTempFontSizeHeading4] = useState(null);
  const [tempFontSizeHeading5, setTempFontSizeHeading5] = useState(null);
  const [tempLineHeight, setTempLineHeight] = useState(null);
  const [tempLineHeightSM, setTempLineHeightSM] = useState(null);
  const [tempLineHeightLG, setTempLineHeightLG] = useState(null);
  const [tempLineHeightHeading1, setTempLineHeightHeading1] = useState(null);
  const [tempLineHeightHeading2, setTempLineHeightHeading2] = useState(null);
  const [tempLineHeightHeading3, setTempLineHeightHeading3] = useState(null);
  const [tempLineHeightHeading4, setTempLineHeightHeading4] = useState(null);
  const [tempLineHeightHeading5, setTempLineHeightHeading5] = useState(null);
  const [tempSizeStep, setTempSizeStep] = useState(null);
  const [tempSizeUnit, setTempSizeUnit] = useState(null);
  const [tempMarginXXS, setTempMarginXXS] = useState(null);
  const [tempMarginXS, setTempMarginXS] = useState(null);
  const [tempMarginSM, setTempMarginSM] = useState(null);
  const [tempMargin, setTempMargin] = useState(null);
  const [tempMarginMD, setTempMarginMD] = useState(null);
  const [tempMarginLG, setTempMarginLG] = useState(null);
  const [tempMarginXL, setTempMarginXL] = useState(null);
  const [tempMarginXXL, setTempMarginXXL] = useState(null);
  const [tempPaddingXXS, setTempPaddingXXS] = useState(null);
  const [tempPaddingXS, setTempPaddingXS] = useState(null);
  const [tempPaddingSM, setTempPaddingSM] = useState(null);
  const [tempPadding, setTempPadding] = useState(null);
  const [tempPaddingMD, setTempPaddingMD] = useState(null);
  const [tempPaddingLG, setTempPaddingLG] = useState(null);
  const [tempPaddingXL, setTempPaddingXL] = useState(null);
  const [tempBorderRadius, setTempBorderRadius] = useState(null);
  const [tempBorderRadiusXS, setTempBorderRadiusXS] = useState(null);
  const [tempBorderRadiusSM, setTempBorderRadiusSM] = useState(null);
  const [tempBorderRadiusLG, setTempBorderRadiusLG] = useState(null);
  const [tempBoxShadow, setTempBoxShadow] = useState(null);
  const [tempBoxShadowSecondary, setTempBoxShadowSecondary] = useState(null);
  const [tempWireframe, setTempWireframe] = useState(null);
  const [tempFontFamily, setTempFontFamily] = useState(null);

  const preserColor = [
    {
      label: t("theme.presetColors"),
      colors: [
        "#1677ff",
        "#722ed1",
        "#13c2c2",
        "#52c41a",
        "#eb2f96",
        "#f5222d",
        "#fa8c16",
        "#fadb14",
        "#fa541c",
        "#2f54eb",
        "#faad14",
        "#a0d911",
        "#000000",
      ],
    },
  ];

  const [fontSearch, setFontSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubset, setSelectedSubset] = useState(null);
  const {
    fonts: googleFonts,
    fontsLoading: fontsLoading,
    error,
  } = useGoogleFonts({
    searchTerm: fontSearch,
    category: selectedCategory,
    subset: selectedSubset,
  });

  useEffect(() => {
    if (open) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, [open]);

  if (loading) {
    return (
      <Drawer
        title={t("theme.loading")}
        placement="right"
        onClose={onClose}
        open={open}
        width={500}
      >
        <Skeleton active />
      </Drawer>
    );
  }

  return (
    <Drawer
      title={
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={5} style={{ margin: 0 }}>
              {t("theme.customizer")}
            </Title>
          </Col>
          <Col>
            <CustomerSegmented
              size="normal"
              value={themeState.advancedMode}
              onChange={(val) => dispatch(setAdvancedMode(val))}
              options={[
                {
                  label: t("theme.basic"),
                  value: false,
                },
                {
                  label: t("theme.advanced"),
                  value: true,
                },
              ]}
            />
          </Col>
        </Row>
      }
      placement="right"
      onClose={onClose}
      open={open}
      destroyOnClose={true}
      width={500}
    >
      <Space direction="vertical" className="w-full" size="large">
        {/* Language & Theme Selector */}

        {themeState.advancedMode && (
          <Card
            size="small"
            variant="borderless"
            style={{ boxShadow: token.boxShadow }}
          >
            <Title level={4} type="warning">
              {t("theme.advancedModeWarning")}
            </Title>
          </Card>
        )}

        <Divider
          style={{
            borderColor: token.colorBorderSecondary,
            margin: 0,
          }}
          orientation="left"
        >
          <Text strong>{t("theme.themeAndLanguage")}</Text>
        </Divider>

        <Card size="small" style={{ boxShadow: token.boxShadow }}>
          <Row align="middle" justify="space-between">
            <Col>
              <Title level={5} style={{ margin: 0 }}>
                {t("theme.language")}
              </Title>
            </Col>
            <Col>
              <Select
                value={language}
                onChange={(val) => dispatch(changeLanguage(val))}
                showSearch
                style={{ width: 200 }}
                options={availableLanguages.map((lang) => ({
                  label: (
                    <span>
                      <span style={{ marginRight: 8 }}>{lang.flag}</span>
                      {lang.label}
                    </span>
                  ),
                  value: lang.folder,
                }))}
              />
            </Col>
          </Row>

          <Row align="middle" justify="space-between" style={{ marginTop: 24 }}>
            <Col>
              <Title level={5} style={{ margin: 0 }}>
                {t("theme.mode")}
              </Title>
            </Col>
            <Col>
              <Segmented
                size="normal"
                value={themeState.themeMode}
                onChange={(val) => {
                  dispatch(setThemeMode(val));
                }}
                options={[
                  {
                    label: <SunFilled />,
                    value: "light",
                  },
                  {
                    label: <MoonFilled />,
                    value: "dark",
                  },
                ]}
              />
            </Col>
          </Row>

          <Row align="middle" justify="space-between" style={{ marginTop: 24 }}>
            <Col>
              <Title level={5} style={{ margin: 0 }}>
                {t("theme.sizeMode")}
              </Title>
            </Col>
            <Col>
              <Segmented
                size="normal"
                value={themeState.sizeMode}
                onChange={(val) => dispatch(setSizeMode(val))}
                options={[
                  {
                    label: <ExpandOutlined />,
                    value: true,
                  },
                  {
                    label: <CompressOutlined />,
                    value: false,
                  },
                ]}
              />
            </Col>
          </Row>
        </Card>

        <Divider
          style={{
            borderColor: token.colorBorderSecondary,
            margin: 0,
          }}
          orientation="left"
        >
          <Text strong>{t("theme.color")}</Text>
        </Divider>

        {/* Brand Color */}
        <ThemeColorGroup
          title={t("theme.brandColor")}
          mainColor={{
            label: "theme.colorPrimary",
            stateValue: themeState.colorPrimary,
            tokenValue: token.colorPrimary,
            setValue: (hex) => dispatch(setColorPrimary(hex)),
          }}
          advancedItems={[
            {
              label: "theme.colorPrimaryBg",
              stateValue: themeState.colorPrimaryBg,
              tokenValue: token.colorPrimaryBg,
              setValue: (hex) => dispatch(setColorPrimaryBg(hex)),
            },
            {
              label: "theme.colorPrimaryBgHover",
              stateValue: themeState.colorPrimaryBgHover,
              tokenValue: token.colorPrimaryBgHover,
              setValue: (hex) => dispatch(setColorPrimaryBgHover(hex)),
            },
            {
              label: "theme.colorPrimaryBorder",
              stateValue: themeState.colorPrimaryBorder,
              tokenValue: token.colorPrimaryBorder,
              setValue: (hex) => dispatch(setColorPrimaryBorder(hex)),
            },
            {
              label: "theme.colorPrimaryBorderHover",
              stateValue: themeState.colorPrimaryBorderHover,
              tokenValue: token.colorPrimaryBorderHover,
              setValue: (hex) => dispatch(setColorPrimaryBorderHover(hex)),
            },
            {
              label: "theme.colorPrimaryHover",
              stateValue: themeState.colorPrimaryHover,
              tokenValue: token.colorPrimaryHover,
              setValue: (hex) => dispatch(setColorPrimaryHover(hex)),
            },
            {
              label: "theme.colorPrimary",
              stateValue: themeState.colorPrimary,
              tokenValue: token.colorPrimary,
              setValue: (hex) => dispatch(setColorPrimary(hex)),
            },
            {
              label: "theme.colorPrimaryActive",
              stateValue: themeState.colorPrimaryActive,
              tokenValue: token.colorPrimaryActive,
              setValue: (hex) => dispatch(setColorPrimaryActive(hex)),
            },
            {
              label: "theme.colorPrimaryTextHover",
              stateValue: themeState.colorPrimaryTextHover,
              tokenValue: token.colorPrimaryTextHover,
              setValue: (hex) => dispatch(setColorPrimaryTextHover(hex)),
            },
            {
              label: "theme.colorPrimaryText",
              stateValue: themeState.colorPrimaryText,
              tokenValue: token.colorPrimaryText,
              setValue: (hex) => dispatch(setColorPrimaryText(hex)),
            },
            {
              label: "theme.colorPrimaryTextActive",
              stateValue: themeState.colorPrimaryTextActive,
              tokenValue: token.colorPrimaryTextActive,
              setValue: (hex) => dispatch(setColorPrimaryTextActive(hex)),
            },
          ]}
          advancedMode={themeState.advancedMode}
          token={token}
          presets={preserColor}
          t={t}
        />

        {/* Success Color */}
        <ThemeColorGroup
          title={t("theme.successColor")}
          mainColor={{
            label: "theme.colorSuccess",
            stateValue: themeState.colorSuccess,
            tokenValue: token.colorSuccess,
            setValue: (hex) => dispatch(setColorSuccess(hex)),
          }}
          advancedItems={[
            {
              label: "theme.colorSuccessBg",
              stateValue: themeState.colorSuccessBg,
              tokenValue: token.colorSuccessBg,
              setValue: (hex) => dispatch(setColorSuccessBg(hex)),
            },
            {
              label: "theme.colorSuccessBgHover",
              stateValue: themeState.colorSuccessBgHover,
              tokenValue: token.colorSuccessBgHover,
              setValue: (hex) => dispatch(setColorSuccessBgHover(hex)),
            },
            {
              label: "theme.colorSuccessBorder",
              stateValue: themeState.colorSuccessBorder,
              tokenValue: token.colorSuccessBorder,
              setValue: (hex) => dispatch(setColorSuccessBorder(hex)),
            },
            {
              label: "theme.colorSuccessBorderHover",
              stateValue: themeState.colorSuccessBorderHover,
              tokenValue: token.colorSuccessBorderHover,
              setValue: (hex) => dispatch(setColorSuccessBorderHover(hex)),
            },
            {
              label: "theme.colorSuccessHover",
              stateValue: themeState.colorSuccessHover,
              tokenValue: token.colorSuccessHover,
              setValue: (hex) => dispatch(setColorSuccessHover(hex)),
            },
            {
              label: "theme.colorSuccess",
              stateValue: themeState.colorSuccess,
              tokenValue: token.colorSuccess,
              setValue: (hex) => dispatch(setColorSuccess(hex)),
            },
            {
              label: "theme.colorSuccessActive",
              stateValue: themeState.colorSuccessActive,
              tokenValue: token.colorSuccessActive,
              setValue: (hex) => dispatch(setColorSuccessActive(hex)),
            },
            {
              label: "theme.colorSuccessTextHover",
              stateValue: themeState.colorSuccessTextHover,
              tokenValue: token.colorSuccessTextHover,
              setValue: (hex) => dispatch(setColorSuccessTextHover(hex)),
            },
            {
              label: "theme.colorSuccessText",
              stateValue: themeState.colorSuccessText,
              tokenValue: token.colorSuccessText,
              setValue: (hex) => dispatch(setColorSuccessText(hex)),
            },
            {
              label: "theme.colorSuccessTextActive",
              stateValue: themeState.colorSuccessTextActive,
              tokenValue: token.colorSuccessTextActive,
              setValue: (hex) => dispatch(setColorSuccessTextActive(hex)),
            },
          ]}
          advancedMode={themeState.advancedMode}
          token={token}
          presets={preserColor}
          t={t}
        />
        {/* Warning Color */}
        <ThemeColorGroup
          title={t("theme.warningColor")}
          mainColor={{
            label: "theme.colorWarning",
            stateValue: themeState.colorWarning,
            tokenValue: token.colorWarning,
            setValue: (hex) => dispatch(setColorWarning(hex)),
          }}
          advancedItems={[
            {
              label: "theme.colorWarningBg",
              stateValue: themeState.colorWarningBg,
              tokenValue: token.colorWarningBg,
              setValue: (hex) => dispatch(setColorWarningBg(hex)),
            },
            {
              label: "theme.colorWarningBgHover",
              stateValue: themeState.colorWarningBgHover,
              tokenValue: token.colorWarningBgHover,
              setValue: (hex) => dispatch(setColorWarningBgHover(hex)),
            },
            {
              label: "theme.colorWarningBorder",
              stateValue: themeState.colorWarningBorder,
              tokenValue: token.colorWarningBorder,
              setValue: (hex) => dispatch(setColorWarningBorder(hex)),
            },
            {
              label: "theme.colorWarningBorderHover",
              stateValue: themeState.colorWarningBorderHover,
              tokenValue: token.colorWarningBorderHover,
              setValue: (hex) => dispatch(setColorWarningBorderHover(hex)),
            },
            {
              label: "theme.colorWarningHover",
              stateValue: themeState.colorWarningHover,
              tokenValue: token.colorWarningHover,
              setValue: (hex) => dispatch(setColorWarningHover(hex)),
            },
            {
              label: "theme.colorWarning",
              stateValue: themeState.colorWarning,
              tokenValue: token.colorWarning,
              setValue: (hex) => dispatch(setColorWarning(hex)),
            },
            {
              label: "theme.colorWarningActive",
              stateValue: themeState.colorWarningActive,
              tokenValue: token.colorWarningActive,
              setValue: (hex) => dispatch(setColorWarningActive(hex)),
            },
            {
              label: "theme.colorWarningTextHover",
              stateValue: themeState.colorWarningTextHover,
              tokenValue: token.colorWarningTextHover,
              setValue: (hex) => dispatch(setColorWarningTextHover(hex)),
            },
            {
              label: "theme.colorWarningText",
              stateValue: themeState.colorWarningText,
              tokenValue: token.colorWarningText,
              setValue: (hex) => dispatch(setColorWarningText(hex)),
            },
            {
              label: "theme.colorWarningTextActive",
              stateValue: themeState.colorWarningTextActive,
              tokenValue: token.colorWarningTextActive,
              setValue: (hex) => dispatch(setColorWarningTextActive(hex)),
            },
          ]}
          advancedMode={themeState.advancedMode}
          token={token}
          presets={preserColor}
          t={t}
        />

        {/* Error Color */}
        <ThemeColorGroup
          title={t("theme.successColor")}
          mainColor={{
            label: "theme.colorSuccess",
            stateValue: themeState.colorSuccess,
            tokenValue: token.colorSuccess,
            setValue: (hex) => dispatch(setColorSuccess(hex)),
          }}
          advancedItems={[
            {
              label: "theme.colorSuccessBg",
              stateValue: themeState.colorSuccessBg,
              tokenValue: token.colorSuccessBg,
              setValue: (hex) => dispatch(setColorSuccessBg(hex)),
            },
            {
              label: "theme.colorSuccessBgHover",
              stateValue: themeState.colorSuccessBgHover,
              tokenValue: token.colorSuccessBgHover,
              setValue: (hex) => dispatch(setColorSuccessBgHover(hex)),
            },
            {
              label: "theme.colorSuccessBorder",
              stateValue: themeState.colorSuccessBorder,
              tokenValue: token.colorSuccessBorder,
              setValue: (hex) => dispatch(setColorSuccessBorder(hex)),
            },
            {
              label: "theme.colorSuccessBorderHover",
              stateValue: themeState.colorSuccessBorderHover,
              tokenValue: token.colorSuccessBorderHover,
              setValue: (hex) => dispatch(setColorSuccessBorderHover(hex)),
            },
            {
              label: "theme.colorSuccessHover",
              stateValue: themeState.colorSuccessHover,
              tokenValue: token.colorSuccessHover,
              setValue: (hex) => dispatch(setColorSuccessHover(hex)),
            },
            {
              label: "theme.colorSuccess",
              stateValue: themeState.colorSuccess,
              tokenValue: token.colorSuccess,
              setValue: (hex) => dispatch(setColorSuccess(hex)),
            },
            {
              label: "theme.colorSuccessActive",
              stateValue: themeState.colorSuccessActive,
              tokenValue: token.colorSuccessActive,
              setValue: (hex) => dispatch(setColorSuccessActive(hex)),
            },
            {
              label: "theme.colorSuccessTextHover",
              stateValue: themeState.colorSuccessTextHover,
              tokenValue: token.colorSuccessTextHover,
              setValue: (hex) => dispatch(setColorSuccessTextHover(hex)),
            },
            {
              label: "theme.colorSuccessText",
              stateValue: themeState.colorSuccessText,
              tokenValue: token.colorSuccessText,
              setValue: (hex) => dispatch(setColorSuccessText(hex)),
            },
            {
              label: "theme.colorSuccessTextActive",
              stateValue: themeState.colorSuccessTextActive,
              tokenValue: token.colorSuccessTextActive,
              setValue: (hex) => dispatch(setColorSuccessTextActive(hex)),
            },
          ]}
          advancedMode={themeState.advancedMode}
          token={token}
          presets={preserColor}
          t={t}
        />
        {/* Warning Color */}
        <ThemeColorGroup
          title={t("theme.errorColor")}
          mainColor={{
            label: "theme.colorError",
            stateValue: themeState.colorError,
            tokenValue: token.colorError,
            setValue: (hex) => dispatch(setColorError(hex)),
          }}
          advancedItems={[
            {
              label: "theme.colorErrorBg",
              stateValue: themeState.colorErrorBg,
              tokenValue: token.colorErrorBg,
              setValue: (hex) => dispatch(setColorErrorBg(hex)),
            },
            {
              label: "theme.colorErrorBgHover",
              stateValue: themeState.colorErrorBgHover,
              tokenValue: token.colorErrorBgHover,
              setValue: (hex) => dispatch(setColorErrorBgHover(hex)),
            },
            {
              label: "theme.colorErrorBorder",
              stateValue: themeState.colorErrorBorder,
              tokenValue: token.colorErrorBorder,
              setValue: (hex) => dispatch(setColorErrorBorder(hex)),
            },
            {
              label: "theme.colorErrorBorderHover",
              stateValue: themeState.colorErrorBorderHover,
              tokenValue: token.colorErrorBorderHover,
              setValue: (hex) => dispatch(setColorErrorBorderHover(hex)),
            },
            {
              label: "theme.colorErrorHover",
              stateValue: themeState.colorErrorHover,
              tokenValue: token.colorErrorHover,
              setValue: (hex) => dispatch(setColorErrorHover(hex)),
            },
            {
              label: "theme.colorError",
              stateValue: themeState.colorError,
              tokenValue: token.colorError,
              setValue: (hex) => dispatch(setColorError(hex)),
            },
            {
              label: "theme.colorErrorActive",
              stateValue: themeState.colorErrorActive,
              tokenValue: token.colorErrorActive,
              setValue: (hex) => dispatch(setColorErrorActive(hex)),
            },
            {
              label: "theme.colorErrorTextHover",
              stateValue: themeState.colorErrorTextHover,
              tokenValue: token.colorErrorTextHover,
              setValue: (hex) => dispatch(setColorErrorTextHover(hex)),
            },
            {
              label: "theme.colorErrorText",
              stateValue: themeState.colorErrorText,
              tokenValue: token.colorErrorText,
              setValue: (hex) => dispatch(setColorErrorText(hex)),
            },
            {
              label: "theme.colorErrorTextActive",
              stateValue: themeState.colorErrorTextActive,
              tokenValue: token.colorErrorTextActive,
              setValue: (hex) => dispatch(setColorErrorTextActive(hex)),
            },
          ]}
          advancedMode={themeState.advancedMode}
          token={token}
          presets={preserColor}
          t={t}
        />
        {/* Info Color */}
        <ThemeColorGroup
          title={t("theme.infoColor")}
          mainColor={{
            label: "theme.colorInfo",
            stateValue: themeState.colorInfo,
            tokenValue: token.colorInfo,
            setValue: (hex) => dispatch(setColorInfo(hex)),
          }}
          advancedItems={[
            {
              label: "theme.colorInfoBg",
              stateValue: themeState.colorInfoBg,
              tokenValue: token.colorInfoBg,
              setValue: (hex) => dispatch(setColorInfoBg(hex)),
            },
            {
              label: "theme.colorInfoBgHover",
              stateValue: themeState.colorInfoBgHover,
              tokenValue: token.colorInfoBgHover,
              setValue: (hex) => dispatch(setColorInfoBgHover(hex)),
            },
            {
              label: "theme.colorInfoBorder",
              stateValue: themeState.colorInfoBorder,
              tokenValue: token.colorInfoBorder,
              setValue: (hex) => dispatch(setColorInfoBorder(hex)),
            },
            {
              label: "theme.colorInfoBorderHover",
              stateValue: themeState.colorInfoBorderHover,
              tokenValue: token.colorInfoBorderHover,
              setValue: (hex) => dispatch(setColorInfoBorderHover(hex)),
            },
            {
              label: "theme.colorInfoHover",
              stateValue: themeState.colorInfoHover,
              tokenValue: token.colorInfoHover,
              setValue: (hex) => dispatch(setColorInfoHover(hex)),
            },
            {
              label: "theme.colorInfo",
              stateValue: themeState.colorInfo,
              tokenValue: token.colorInfo,
              setValue: (hex) => dispatch(setColorInfo(hex)),
            },
            {
              label: "theme.colorInfoActive",
              stateValue: themeState.colorInfoActive,
              tokenValue: token.colorInfoActive,
              setValue: (hex) => dispatch(setColorInfoActive(hex)),
            },
            {
              label: "theme.colorInfoTextHover",
              stateValue: themeState.colorInfoTextHover,
              tokenValue: token.colorInfoTextHover,
              setValue: (hex) => dispatch(setColorInfoTextHover(hex)),
            },
            {
              label: "theme.colorInfoText",
              stateValue: themeState.colorInfoText,
              tokenValue: token.colorInfoText,
              setValue: (hex) => dispatch(setColorInfoText(hex)),
            },
            {
              label: "theme.colorInfoTextActive",
              stateValue: themeState.colorInfoTextActive,
              tokenValue: token.colorInfoTextActive,
              setValue: (hex) => dispatch(setColorInfoTextActive(hex)),
            },
          ]}
          advancedMode={themeState.advancedMode}
          token={token}
          presets={preserColor}
          t={t}
        />

        {/* Link Color */}
        <ThemeColorGroup 
          title={t("theme.linkColor")}
          mainColor={{
            label: "theme.colorLink",
            stateValue: themeState.colorLink,
            tokenValue: token.colorLink,
            setValue: (hex) => dispatch(setColorLink(hex)),
          }}
          advancedItems={[
            {
              label: "theme.colorLinkHover",
              stateValue: themeState.colorLinkHover,
              tokenValue: token.colorLinkHover,
              setValue: (hex) => dispatch(setColorLinkHover(hex)),
            },
            {
              label: "theme.colorLinkActive",
              stateValue: themeState.colorLinkActive,
              tokenValue: token.colorLinkActive,
              setValue: (hex) => dispatch(setColorLinkActive(hex)),
            },
          ]}
          advancedMode={themeState.advancedMode}
          token={token}
          presets={preserColor}
          t={t}
        />

        {/* Neutral Color */}
        <Card
          size="small"
          title={t("theme.neutralColor")}
          variant="borderless"
          style={{ boxShadow: token.boxShadow }}
        >
          <Row align="middle" justify="space-between" className="mb-2">
            <Col>
              <Text strong>
                {t("theme.colorTextBase")}
                {themeState.colorTextBase && (
                  <Link
                    className="ml-2"
                    onClick={() => {
                      dispatch(setColorTextBase(null));
                      setTempColorTextBase(null);
                    }}
                  >
                    {t("theme.reset")}
                  </Link>
                )}
              </Text>
            </Col>
            <Col>
              <ColorPicker
                style={{ padding: "4px" }}
                defaultValue={token.colorTextBase}
                value={tempColorTextBase || token.colorTextBase}
                presets={preserColor}
                color={token.colorTextBase}
                onChange={(color) => {
                  setTempColorTextBase(color.toHexString());
                }}
                onChangeComplete={(color) => {
                  const hexColor = color.toHexString();
                  dispatch(setColorTextBase(hexColor));
                  setTempColorTextBase(hexColor);
                }}
                showText
              />
            </Col>
          </Row>
          <Row align="middle" justify="space-between" className="mb-2">
            <Col>
              <Text strong>
                {t("theme.colorBgBase")}
                {themeState.colorBgBase && (
                  <Link
                    className="ml-2"
                    onClick={() => {
                      dispatch(setColorBgBase(null));
                      setTempColorBgBase(null);
                    }}
                  >
                    {t("theme.reset")}
                  </Link>
                )}
              </Text>
            </Col>
            <Col>
              <ColorPicker
                style={{ padding: "4px" }}
                defaultValue={token.colorBgBase}
                value={tempColorBgBase || token.colorBgBase}
                presets={preserColor}
                color={token.colorBgBase}
                onChange={(color) => {
                  setTempColorBgBase(color.toHexString());
                }}
                onChangeComplete={(color) => {
                  const hexColor = color.toHexString();
                  dispatch(setColorBgBase(hexColor));
                  setTempColorBgBase(hexColor);
                }}
                showText
              />
            </Col>
          </Row>
          {themeState.advancedMode && (
            <Collapse
              bordered={false}
              style={{
                background: "transparent",
                boxShadow: token.boxShadowSecondary,
              }}
              items={[
                {
                  key: "1",
                  label: <Text strong>{t("theme.mapToken")}</Text>,
                  children: (
                    <Card
                      size="small"
                      variant="borderless"
                      style={{
                        body: { padding: 0 },
                        backgroundColor: token.colorFillQuaternary,
                      }}
                    >
                      <Divider orientation="left">
                        <Text strong>{t("theme.text")}</Text>
                      </Divider>
                      <ColorSettingRow
                        label="theme.colorText"
                        value={themeState.colorText}
                        tempValue={tempColorText}
                        defaultValue={token.colorText}
                        setTempValue={setTempColorText}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorText(hexColor))
                        }
                        onReset={() => dispatch(setColorText(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorTextSecondary"
                        value={themeState.colorTextSecondary}
                        tempValue={tempColorTextSecondary}
                        defaultValue={token.colorTextSecondary}
                        setTempValue={setTempColorTextSecondary}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorTextSecondary(hexColor))
                        }
                        onReset={() => dispatch(setColorTextSecondary(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorTextTertiary"
                        value={themeState.colorTextTertiary}
                        tempValue={tempColorTextTertiary}
                        defaultValue={token.colorTextTertiary}
                        setTempValue={setTempColorTextTertiary}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorTextTertiary(hexColor))
                        }
                        onReset={() => dispatch(setColorTextTertiary(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorTextQuaternary"
                        value={themeState.colorTextQuaternary}
                        tempValue={tempColorTextQuaternary}
                        defaultValue={token.colorTextQuaternary}
                        setTempValue={setTempColorTextQuaternary}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorTextQuaternary(hexColor))
                        }
                        onReset={() => dispatch(setColorTextQuaternary(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <Divider orientation="left">
                        <Text strong>{t("theme.background")}</Text>
                      </Divider>
                      <ColorSettingRow
                        label="theme.colorBgContainer"
                        value={themeState.colorBgContainer}
                        tempValue={tempColorBgContainer}
                        defaultValue={token.colorBgContainer}
                        setTempValue={setTempColorBgContainer}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorBgContainer(hexColor))
                        }
                        onReset={() => dispatch(setColorBgContainer(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorBgElevated"
                        value={themeState.colorBgElevated}
                        tempValue={tempColorBgElevated}
                        defaultValue={token.colorBgElevated}
                        setTempValue={setTempColorBgElevated}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorBgElevated(hexColor))
                        }
                        onReset={() => dispatch(setColorBgElevated(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorBgLayout"
                        value={themeState.colorBgLayout}
                        tempValue={tempColorBgLayout}
                        defaultValue={token.colorBgLayout}
                        setTempValue={setTempColorBgLayout}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorBgLayout(hexColor))
                        }
                        onReset={() => dispatch(setColorBgLayout(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorBgSpotlight"
                        value={themeState.colorBgSpotlight}
                        tempValue={tempColorBgSpotlight}
                        defaultValue={token.colorBgSpotlight}
                        setTempValue={setTempColorBgSpotlight}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorBgSpotlight(hexColor))
                        }
                        onReset={() => dispatch(setColorBgSpotlight(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorBgMask"
                        value={themeState.colorBgMask}
                        tempValue={tempColorBgMask}
                        defaultValue={token.colorBgMask}
                        setTempValue={setTempColorBgMask}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorBgMask(hexColor))
                        }
                        onReset={() => dispatch(setColorBgMask(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <Divider orientation="left">
                        <Text strong>{t("theme.border")}</Text>
                      </Divider>
                      <ColorSettingRow
                        label="theme.colorBorder"
                        value={themeState.colorBorder}
                        tempValue={tempColorBorder}
                        defaultValue={token.colorBorder}
                        setTempValue={setTempColorBorder}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorBorder(hexColor))
                        }
                        onReset={() => dispatch(setColorBorder(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorBorderSecondary"
                        value={themeState.colorBorderSecondary}
                        tempValue={tempColorBorderSecondary}
                        defaultValue={token.colorBorderSecondary}
                        setTempValue={setTempColorBorderSecondary}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorBorderSecondary(hexColor))
                        }
                        onReset={() => dispatch(setColorBorderSecondary(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <Divider orientation="left">
                        <Text strong>{t("theme.fill")}</Text>
                      </Divider>
                      <ColorSettingRow
                        label="theme.colorFill"
                        value={themeState.colorFill}
                        tempValue={tempColorFill}
                        defaultValue={token.colorFill}
                        setTempValue={setTempColorFill}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorFill(hexColor))
                        }
                        onReset={() => dispatch(setColorFill(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorFillSecondary"
                        value={themeState.colorFillSecondary}
                        tempValue={tempColorFillSecondary}
                        defaultValue={token.colorFillSecondary}
                        setTempValue={setTempColorFillSecondary}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorFillSecondary(hexColor))
                        }
                        onReset={() => dispatch(setColorFillSecondary(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorFillTertiary"
                        value={themeState.colorFillTertiary}
                        tempValue={tempColorFillTertiary}
                        defaultValue={token.colorFillTertiary}
                        setTempValue={setTempColorFillTertiary}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorFillTertiary(hexColor))
                        }
                        onReset={() => dispatch(setColorFillTertiary(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorFillQuaternary"
                        value={themeState.colorFillQuaternary}
                        tempValue={tempColorFillQuaternary}
                        defaultValue={token.colorFillQuaternary}
                        setTempValue={setTempColorFillQuaternary}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorFillQuaternary(hexColor))
                        }
                        onReset={() => dispatch(setColorFillQuaternary(null))}
                        presets={preserColor}
                        t={t}
                      />
                    </Card>
                  ),
                },
              ]}
            />
          )}
        </Card>

        {/* Font */}
        <Card
          size="small"
          title={t("theme.size")}
          variant="borderless"
          style={{ boxShadow: token.boxShadow }}
        >
          <Row
            align="middle"
            justify="space-between"
            className="mb-2"
            gutter={16}
          >
            <Col span={10}>
              <Text strong>
                {t("theme.fontSize")}
                {tempFontSize != 14 && (
                  <Link
                    className="ml-2"
                    onClick={() => {
                      setTempFontSize(14);
                      dispatch(setFontSize(14));
                    }}
                  >
                    {t("theme.reset")}
                  </Link>
                )}
              </Text>
            </Col>
            <Col span={10}>
              <Slider
                min={12}
                max={32}
                step={1}
                value={tempFontSize || token.fontSize}
                onChange={(value) => {
                  console.log("slider", value);
                  setTempFontSize(value);
                }}
                onChangeComplete={(value) => {
                  dispatch(setFontSize(value));
                  setTempFontSize(value);
                }}
              />
            </Col>
            <Col span={4}>
              <Text code>{tempFontSize || token.fontSize}</Text>
            </Col>
          </Row>
        </Card>

        {/* Font Size */}
        {/* <Row justify="space-between" align="middle">
          <Col span={10}>
            <Text strong>Cỡ chữ</Text>
          </Col>
          <Col span={14}>
            <Slider
              min={12}
              max={32}
              step={1}
              value={tempFontSize}
              onChange={setTempFontSize}
              onChangeComplete={(value) => {
                dispatch(setFontSize(value));
              }}
            />
          </Col>
        </Row> */}
        <Divider />

        {/* Font Family */}
        <Row>
          <Row>
            <Text strong>Font chữ</Text>
          </Row>
          <Row>
            <Select
              loading={fontsLoading}
              showSearch
              placeholder="Chọn font chữ"
              onSearch={(value) => setFontSearch(value)}
              filterOption={false}
              style={{ width: "100%" }}
              value={themeState.fontFamily}
              onChange={(value) => dispatch(setFontFamily(value))}
              options={googleFonts.map((font) => ({
                label: font.family,
                value: font.family,
              }))}
            />
          </Row>
        </Row>

        <Divider />
        <div>
          <div className="flex justify-between mb-1">
            <span>Bo góc (border radius)</span>
            <span>{themeState.borderRadius}px</span>
          </div>
          <Slider
            min={0}
            max={24}
            step={1}
            value={themeState.borderRadius}
            onChange={(v) => dispatch(setBorderRadius(v))}
          />
        </div>
      </Space>
    </Drawer>
  );
};

export default memo(ThemeCustomizer);
