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
} from "../../../redux/slices/themeSlice";
import { availableLanguages } from "../../../i18n";
import { useTranslation } from "react-i18next";
import { theme } from "antd";
import "flag-icon-css/css/flag-icons.min.css";
import { changeLanguage } from "../../../redux/slices/languageSlice";
import Link from "antd/es/typography/Link";
import ColorSettingRow from "./ColorSettingRow";
import MainColorPickerRow from "./MainColorPickerRow";
import { setTempByKey } from "../../../redux/slices/tempThemeSlice";
import CustomerSegmented from "./CustomSegmented";
import ThemeChangePopup from "./ThemeChangePopup";


const { Title, Text } = Typography;

const ThemeCustomizer = ({ open, onClose }) => {
  const dispatch = useDispatch();


  const { t } = useTranslation();

  const { token } = theme.useToken();

  const { ...themeState } = useSelector((state) => state.theme);

  const language = useSelector((state) => state.language.currentLang);

  const [loading, setLoading] = useState(true);

  const [tempColorPrimary, setTempColorPrimary] = useState(null);
  const [tempColorPrimaryBg, setTempColorPrimaryBg] = useState(null);
  const [tempColorPrimaryBgHover, setTempColorPrimaryBgHover] = useState(null);
  const [tempColorPrimaryBorder, setTempColorPrimaryBorder] = useState(null);
  const [tempColorPrimaryBorderHover, setTempColorPrimaryBorderHover] =
    useState(null);
  const [tempColorPrimaryHover, setTempColorPrimaryHover] = useState(null);
  const [tempColorPrimaryActive, setTempColorPrimaryActive] = useState(null);
  const [tempColorPrimaryTextHover, setTempColorPrimaryTextHover] =
    useState(null);
  const [tempColorPrimaryText, setTempColorPrimaryText] = useState(null);
  const [tempColorPrimaryTextActive, setTempColorPrimaryTextActive] =
    useState(null);
  const [tempColorSuccess, setTempColorSuccess] = useState(null);
  const [tempColorSuccessBg, setTempColorSuccessBg] = useState(null);
  const [tempColorSuccessBgHover, setTempColorSuccessBgHover] = useState(null);
  const [tempColorSuccessBorder, setTempColorSuccessBorder] = useState(null);
  const [tempColorSuccessBorderHover, setTempColorSuccessBorderHover] =
    useState(null);
  const [tempColorSuccessHover, setTempColorSuccessHover] = useState(null);
  const [tempColorSuccessActive, setTempColorSuccessActive] = useState(null);
  const [tempColorSuccessTextHover, setTempColorSuccessTextHover] =
    useState(null);
  const [tempColorSuccessText, setTempColorSuccessText] = useState(null);
  const [tempColorSuccessTextActive, setTempColorSuccessTextActive] =
    useState(null);
  const [tempColorWarning, setTempColorWarning] = useState(null);
  const [tempColorWarningBg, setTempColorWarningBg] = useState(null);
  const [tempColorWarningBgHover, setTempColorWarningBgHover] = useState(null);
  const [tempColorWarningBorder, setTempColorWarningBorder] = useState(null);
  const [tempColorWarningBorderHover, setTempColorWarningBorderHover] =
    useState(null);
  const [tempColorWarningHover, setTempColorWarningHover] = useState(null);
  const [tempColorWarningActive, setTempColorWarningActive] = useState(null);
  const [tempColorWarningTextHover, setTempColorWarningTextHover] =
    useState(null);
  const [tempColorWarningText, setTempColorWarningText] = useState(null);
  const [tempColorWarningTextActive, setTempColorWarningTextActive] =
    useState(null);
  const [tempColorError, setTempColorError] = useState(null);
  const [tempColorErrorBg, setTempColorErrorBg] = useState(null);
  const [tempColorErrorBgHover, setTempColorErrorBgHover] = useState(null);
  const [tempColorErrorBorder, setTempColorErrorBorder] = useState(null);
  const [tempColorErrorBorderHover, setTempColorErrorBorderHover] =
    useState(null);
  const [tempColorErrorHover, setTempColorErrorHover] = useState(null);
  const [tempColorErrorActive, setTempColorErrorActive] = useState(null);
  const [tempColorErrorTextHover, setTempColorErrorTextHover] = useState(null);
  const [tempColorErrorText, setTempColorErrorText] = useState(null);
  const [tempColorErrorTextActive, setTempColorErrorTextActive] =
    useState(null);
  const [tempColorInfo, setTempColorInfo] = useState(null);
  const [tempColorLink, setTempColorLink] = useState(null);
  const [tempColorLinkHover, setTempColorLinkHover] = useState(null);
  const [tempColorLinkActive, setTempColorLinkActive] = useState(null);
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

  const [showPopup, setShowPopup] = useState(false);

  const handleThemeChange = (val) => {
    setShowPopup(true);
  
    // Delay để người dùng thấy hiệu ứng
    setTimeout(() => {
      dispatch(setThemeMode(val));
    }, 200);
  
    // Ẩn popup sau hiệu ứng
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };

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

            {/* <Segmented
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
            /> */}
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
                onChange={handleThemeChange}
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
            <ThemeChangePopup show={showPopup} mode={themeState.themeMode === "light" ? "dark" : "light"} />
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
        <Card
          size="small"
          title={t("theme.brandColor")}
          variant="borderless"
          style={{ boxShadow: token.boxShadow }}
        >
          <MainColorPickerRow 
            label="theme.colorPrimary"
            stateValue={themeState.colorPrimary}
            tokenValue={token.colorPrimary}
            onChangeComplete={(hexColor) =>
              dispatch(setColorPrimary(hexColor))
            }
            onReset={() => dispatch(setColorPrimary(null))}
            presets={preserColor}
            t={t}
          />
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
                      <ColorSettingRow
                        label="theme.colorPrimaryBg"
                        value={themeState.colorPrimaryBg}
                        tempValue={tempColorPrimaryBg}
                        defaultValue={token.colorPrimaryBg}
                        setTempValue={setTempColorPrimaryBg}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorPrimaryBg(hexColor))
                        }
                        onReset={() => dispatch(setColorPrimaryBg(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorPrimaryBgHover"
                        value={themeState.colorPrimaryBgHover}
                        tempValue={tempColorPrimaryBgHover}
                        defaultValue={token.colorPrimaryBgHover}
                        setTempValue={setTempColorPrimaryBgHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorPrimaryBgHover(hexColor))
                        }
                        onReset={() => dispatch(setColorPrimaryBgHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorPrimaryBorder"
                        value={themeState.colorPrimaryBorder}
                        tempValue={tempColorPrimaryBorder}
                        defaultValue={token.colorPrimaryBorder}
                        setTempValue={setTempColorPrimaryBorder}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorPrimaryBorder(hexColor))
                        }
                        onReset={() => dispatch(setColorPrimaryBorder(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorPrimaryBorderHover"
                        value={themeState.colorPrimaryBorderHover}
                        tempValue={tempColorPrimaryBorderHover}
                        defaultValue={token.colorPrimaryBorderHover}
                        setTempValue={setTempColorPrimaryBorderHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorPrimaryBorderHover(hexColor))
                        }
                        onReset={() =>
                          dispatch(setColorPrimaryBorderHover(null))
                        }
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorPrimaryHover"
                        value={themeState.colorPrimaryHover}
                        tempValue={tempColorPrimaryHover}
                        defaultValue={token.colorPrimaryHover}
                        setTempValue={setTempColorPrimaryHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorPrimaryHover(hexColor))
                        }
                        onReset={() => dispatch(setColorPrimaryHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorPrimary"
                        value={themeState.colorPrimary}
                        tempValue={tempColorPrimary}
                        defaultValue={token.colorPrimary}
                        setTempValue={setTempColorPrimary}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorPrimary(hexColor))
                        }
                        onReset={() => dispatch(setColorPrimary(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorPrimaryActive"
                        value={themeState.colorPrimaryActive}
                        tempValue={tempColorPrimaryActive}
                        defaultValue={token.colorPrimaryActive}
                        setTempValue={setTempColorPrimaryActive}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorPrimaryActive(hexColor))
                        }
                        onReset={() => dispatch(setColorPrimaryActive(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorPrimaryTextHover"
                        value={themeState.colorPrimaryTextHover}
                        tempValue={tempColorPrimaryTextHover}
                        defaultValue={token.colorPrimaryTextHover}
                        setTempValue={setTempColorPrimaryTextHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorPrimaryTextHover(hexColor))
                        }
                        onReset={() => dispatch(setColorPrimaryTextHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorPrimaryText"
                        value={themeState.colorPrimaryText}
                        tempValue={tempColorPrimaryText}
                        defaultValue={token.colorPrimaryText}
                        setTempValue={setTempColorPrimaryText}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorPrimaryText(hexColor))
                        }
                        onReset={() => dispatch(setColorPrimaryText(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorPrimaryTextActive"
                        value={themeState.colorPrimaryTextActive}
                        tempValue={tempColorPrimaryTextActive}
                        defaultValue={token.colorPrimaryTextActive}
                        setTempValue={setTempColorPrimaryTextActive}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorPrimaryTextActive(hexColor))
                        }
                        onReset={() =>
                          dispatch(setColorPrimaryTextActive(null))
                        }
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

        {/* Success Color */}
        <Card
          size="small"
          title={t("theme.successColor")}
          variant="borderless"
          style={{ boxShadow: token.boxShadow }}
        >
          <Row align="middle" justify="space-between" className="mb-2">
            <Col>
              <Text strong>
                {t("theme.colorSuccess")}
                {themeState.colorSuccess && (
                  <Link
                    className="ml-2"
                    onClick={() => {
                      dispatch(setColorSuccess(null));
                      setTempColorSuccess(null);
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
                defaultValue={token.colorSuccess}
                value={tempColorSuccess || token.colorSuccess}
                presets={preserColor}
                color={token.colorSuccess}
                onChange={(color) => {
                  setTempColorSuccess(color.toHexString());
                }}
                onChangeComplete={(color) => {
                  const hexColor = color.toHexString();
                  dispatch(setColorSuccess(hexColor));
                  setTempColorSuccess(hexColor);
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
                      <ColorSettingRow
                        label="theme.colorSuccessBg"
                        value={themeState.colorSuccessBg}
                        tempValue={tempColorSuccessBg}
                        defaultValue={token.colorSuccessBg}
                        setTempValue={setTempColorSuccessBg}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorSuccessBg(hexColor))
                        }
                        onReset={() => dispatch(setColorSuccessBg(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorSuccessBgHover"
                        value={themeState.colorSuccessBgHover}
                        tempValue={tempColorSuccessBgHover}
                        defaultValue={token.colorSuccessBgHover}
                        setTempValue={setTempColorSuccessBgHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorSuccessBgHover(hexColor))
                        }
                        onReset={() => dispatch(setColorSuccessBgHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorSuccessBorder"
                        value={themeState.colorSuccessBorder}
                        tempValue={tempColorSuccessBorder}
                        defaultValue={token.colorSuccessBorder}
                        setTempValue={setTempColorSuccessBorder}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorSuccessBorder(hexColor))
                        }
                        onReset={() => dispatch(setColorSuccessBorder(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorSuccessBorderHover"
                        value={themeState.colorSuccessBorderHover}
                        tempValue={tempColorSuccessBorderHover}
                        defaultValue={token.colorSuccessBorderHover}
                        setTempValue={setTempColorSuccessBorderHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorSuccessBorderHover(hexColor))
                        }
                        onReset={() =>
                          dispatch(setColorSuccessBorderHover(null))
                        }
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorSuccessHover"
                        value={themeState.colorSuccessHover}
                        tempValue={tempColorSuccessHover}
                        defaultValue={token.colorSuccessHover}
                        setTempValue={setTempColorSuccessHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorSuccessHover(hexColor))
                        }
                        onReset={() => dispatch(setColorSuccessHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorSuccess"
                        value={themeState.colorSuccess}
                        tempValue={tempColorSuccess}
                        defaultValue={token.colorSuccess}
                        setTempValue={setTempColorSuccess}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorSuccess(hexColor))
                        }
                        onReset={() => dispatch(setColorSuccess(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorSuccessActive"
                        value={themeState.colorSuccessActive}
                        tempValue={tempColorSuccessActive}
                        defaultValue={token.colorSuccessActive}
                        setTempValue={setTempColorSuccessActive}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorSuccessActive(hexColor))
                        }
                        onReset={() => dispatch(setColorSuccessActive(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorSuccessTextHover"
                        value={themeState.colorSuccessTextHover}
                        tempValue={tempColorSuccessTextHover}
                        defaultValue={token.colorSuccessTextHover}
                        setTempValue={setTempColorSuccessTextHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorSuccessTextHover(hexColor))
                        }
                        onReset={() => dispatch(setColorSuccessTextHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorSuccessText"
                        value={themeState.colorSuccessText}
                        tempValue={tempColorSuccessText}
                        defaultValue={token.colorSuccessText}
                        setTempValue={setTempColorSuccessText}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorSuccessText(hexColor))
                        }
                        onReset={() => dispatch(setColorSuccessText(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorSuccessTextActive"
                        value={themeState.colorSuccessTextActive}
                        tempValue={tempColorSuccessTextActive}
                        defaultValue={token.colorSuccessTextActive}
                        setTempValue={setTempColorSuccessTextActive}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorSuccessTextActive(hexColor))
                        }
                        onReset={() =>
                          dispatch(setColorSuccessTextActive(null))
                        }
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

        {/* Warning Color */}
        <Card
          size="small"
          title={t("theme.warningColor")}
          variant="borderless"
          style={{ boxShadow: token.boxShadow }}
        >
          <Row align="middle" justify="space-between" className="mb-2">
            <Col>
              <Text strong>
                {t("theme.colorWarning")}
                {themeState.colorWarning && (
                  <Link
                    className="ml-2"
                    onClick={() => {
                      dispatch(setColorWarning(null));
                      setTempColorWarning(null);
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
                defaultValue={token.colorWarning}
                value={tempColorWarning || token.colorWarning}
                presets={preserColor}
                color={token.colorWarning}
                onChange={(color) => {
                  setTempColorWarning(color.toHexString());
                }}
                onChangeComplete={(color) => {
                  const hexColor = color.toHexString();
                  dispatch(setColorWarning(hexColor));
                  setTempColorWarning(hexColor);
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
                      <ColorSettingRow
                        label="theme.colorWarningBg"
                        value={themeState.colorWarningBg}
                        tempValue={tempColorWarningBg}
                        defaultValue={token.colorWarningBg}
                        setTempValue={setTempColorWarningBg}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorWarningBg(hexColor))
                        }
                        onReset={() => dispatch(setColorWarningBg(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorWarningBgHover"
                        value={themeState.colorWarningBgHover}
                        tempValue={tempColorWarningBgHover}
                        defaultValue={token.colorWarningBgHover}
                        setTempValue={setTempColorWarningBgHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorWarningBgHover(hexColor))
                        }
                        onReset={() => dispatch(setColorWarningBgHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorWarningBorder"
                        value={themeState.colorWarningBorder}
                        tempValue={tempColorWarningBorder}
                        defaultValue={token.colorWarningBorder}
                        setTempValue={setTempColorWarningBorder}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorWarningBorder(hexColor))
                        }
                        onReset={() => dispatch(setColorWarningBorder(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorWarningBorderHover"
                        value={themeState.colorWarningBorderHover}
                        tempValue={tempColorWarningBorderHover}
                        defaultValue={token.colorWarningBorderHover}
                        setTempValue={setTempColorWarningBorderHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorWarningBorderHover(hexColor))
                        }
                        onReset={() =>
                          dispatch(setColorWarningBorderHover(null))
                        }
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorWarningHover"
                        value={themeState.colorWarningHover}
                        tempValue={tempColorWarningHover}
                        defaultValue={token.colorWarningHover}
                        setTempValue={setTempColorWarningHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorWarningHover(hexColor))
                        }
                        onReset={() => dispatch(setColorWarningHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorWarning"
                        value={themeState.colorWarning}
                        tempValue={tempColorWarning}
                        defaultValue={token.colorWarning}
                        setTempValue={setTempColorWarning}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorWarning(hexColor))
                        }
                        onReset={() => dispatch(setColorWarning(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorWarningActive"
                        value={themeState.colorWarningActive}
                        tempValue={tempColorWarningActive}
                        defaultValue={token.colorWarningActive}
                        setTempValue={setTempColorWarningActive}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorWarningActive(hexColor))
                        }
                        onReset={() => dispatch(setColorWarningActive(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorWarningTextHover"
                        value={themeState.colorWarningTextHover}
                        tempValue={tempColorWarningTextHover}
                        defaultValue={token.colorWarningTextHover}
                        setTempValue={setTempColorWarningTextHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorWarningTextHover(hexColor))
                        }
                        onReset={() => dispatch(setColorWarningTextHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorWarningText"
                        value={themeState.colorWarningText}
                        tempValue={tempColorWarningText}
                        defaultValue={token.colorWarningText}
                        setTempValue={setTempColorWarningText}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorWarningText(hexColor))
                        }
                        onReset={() => dispatch(setColorWarningText(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorWarningTextActive"
                        value={themeState.colorWarningTextActive}
                        tempValue={tempColorWarningTextActive}
                        defaultValue={token.colorWarningTextActive}
                        setTempValue={setTempColorWarningTextActive}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorWarningTextActive(hexColor))
                        }
                        onReset={() =>
                          dispatch(setColorWarningTextActive(null))
                        }
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

        {/* Error Color */}
        <Card
          size="small"
          title={t("theme.errorColor")}
          variant="borderless"
          style={{ boxShadow: token.boxShadow }}
        >
          <Row align="middle" justify="space-between" className="mb-2">
            <Col>
              <Text strong>
                {t("theme.colorError")}
                {themeState.colorError && (
                  <Link
                    className="ml-2"
                    onClick={() => {
                      dispatch(setColorError(null));
                      setTempColorError(null);
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
                defaultValue={token.colorError}
                value={tempColorError || token.colorError}
                presets={preserColor}
                color={token.colorError}
                onChange={(color) => {
                  setTempColorError(color.toHexString());
                }}
                onChangeComplete={(color) => {
                  const hexColor = color.toHexString();
                  dispatch(setColorError(hexColor));
                  setTempColorError(hexColor);
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
                      <ColorSettingRow
                        label="theme.colorErrorBg"
                        value={themeState.colorErrorBg}
                        tempValue={tempColorErrorBg}
                        defaultValue={token.colorErrorBg}
                        setTempValue={setTempColorErrorBg}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorErrorBg(hexColor))
                        }
                        onReset={() => dispatch(setColorErrorBg(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorErrorBgHover"
                        value={themeState.colorErrorBgHover}
                        tempValue={tempColorErrorBgHover}
                        defaultValue={token.colorErrorBgHover}
                        setTempValue={setTempColorErrorBgHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorErrorBgHover(hexColor))
                        }
                        onReset={() => dispatch(setColorErrorBgHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorErrorBorder"
                        value={themeState.colorErrorBorder}
                        tempValue={tempColorErrorBorder}
                        defaultValue={token.colorErrorBorder}
                        setTempValue={setTempColorErrorBorder}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorErrorBorder(hexColor))
                        }
                        onReset={() => dispatch(setColorErrorBorder(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorErrorBorderHover"
                        value={themeState.colorErrorBorderHover}
                        tempValue={tempColorErrorBorderHover}
                        defaultValue={token.colorErrorBorderHover}
                        setTempValue={setTempColorErrorBorderHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorErrorBorderHover(hexColor))
                        }
                        onReset={() => dispatch(setColorErrorBorderHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorErrorHover"
                        value={themeState.colorErrorHover}
                        tempValue={tempColorErrorHover}
                        defaultValue={token.colorErrorHover}
                        setTempValue={setTempColorErrorHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorErrorHover(hexColor))
                        }
                        onReset={() => dispatch(setColorErrorHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorError"
                        value={themeState.colorError}
                        tempValue={tempColorError}
                        defaultValue={token.colorError}
                        setTempValue={setTempColorError}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorError(hexColor))
                        }
                        onReset={() => dispatch(setColorError(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorErrorActive"
                        value={themeState.colorErrorActive}
                        tempValue={tempColorErrorActive}
                        defaultValue={token.colorErrorActive}
                        setTempValue={setTempColorErrorActive}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorErrorActive(hexColor))
                        }
                        onReset={() => dispatch(setColorErrorActive(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorErrorTextHover"
                        value={themeState.colorErrorTextHover}
                        tempValue={tempColorErrorTextHover}
                        defaultValue={token.colorErrorTextHover}
                        setTempValue={setTempColorErrorTextHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorErrorTextHover(hexColor))
                        }
                        onReset={() => dispatch(setColorErrorTextHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorErrorText"
                        value={themeState.colorErrorText}
                        tempValue={tempColorErrorText}
                        defaultValue={token.colorErrorText}
                        setTempValue={setTempColorErrorText}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorErrorText(hexColor))
                        }
                        onReset={() => dispatch(setColorErrorText(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorErrorTextActive"
                        value={themeState.colorErrorTextActive}
                        tempValue={tempColorErrorTextActive}
                        defaultValue={token.colorErrorTextActive}
                        setTempValue={setTempColorErrorTextActive}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorErrorTextActive(hexColor))
                        }
                        onReset={() => {
                          dispatch(setColorErrorTextActive(null));
                        }}
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

        {/* Info Color */}
        <Card
          size="small"
          title={t("theme.infoColor")}
          variant="borderless"
          style={{ boxShadow: token.boxShadow }}
        >
          <Row align="middle" justify="space-between" className="mb-2">
            <Col>
              <Text strong>
                {t("theme.colorInfo")}
                {themeState.colorInfo && (
                  <Link
                    className="ml-2"
                    onClick={() => {
                      dispatch(setColorInfo(null));
                      setTempColorInfo(null);
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
                defaultValue={token.colorInfo}
                value={tempColorInfo || token.colorInfo}
                presets={preserColor}
                color={token.colorInfo}
                onChange={(color) => {
                  setTempColorInfo(color.toHexString());
                }}
                onChangeComplete={(color) => {
                  const hexColor = color.toHexString();
                  dispatch(setColorInfo(hexColor));
                  setTempColorInfo(hexColor);
                }}
                showText
              />
            </Col>
          </Row>
        </Card>

        {/* Link Color */}
        <Card
          size="small"
          title={t("theme.linkColor")}
          variant="borderless"
          style={{ boxShadow: token.boxShadow }}
        >
          <Row align="middle" justify="space-between" className="mb-2">
            <Col>
              <Text strong>
                {t("theme.colorLink")}
                {themeState.colorLink && (
                  <Link
                    className="ml-2"
                    onClick={() => {
                      dispatch(setColorLink(null));
                      setTempColorLink(null);
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
                defaultValue={token.colorLink}
                value={tempColorLink || token.colorLink}
                presets={preserColor}
                color={token.colorLink}
                onChange={(color) => {
                  setTempColorLink(color.toHexString());
                }}
                onChangeComplete={(color) => {
                  const hexColor = color.toHexString();
                  dispatch(setColorLink(hexColor));
                  setTempColorLink(hexColor);
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
                      <ColorSettingRow
                        label="theme.colorLinkHover"
                        value={themeState.colorLinkHover}
                        tempValue={tempColorLinkHover}
                        defaultValue={token.colorLinkHover}
                        setTempValue={setTempColorLinkHover}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorLinkHover(hexColor))
                        }
                        onReset={() => dispatch(setColorLinkHover(null))}
                        presets={preserColor}
                        t={t}
                      />
                      <ColorSettingRow
                        label="theme.colorLinkActive"
                        value={themeState.colorLinkActive}
                        tempValue={tempColorLinkActive}
                        defaultValue={token.colorLinkActive}
                        setTempValue={setTempColorLinkActive}
                        onChangeComplete={(hexColor) =>
                          dispatch(setColorLinkActive(hexColor))
                        }
                        onReset={() => dispatch(setColorLinkActive(null))}
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
                {(tempFontSize != 14) && (
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
                onChange={
                  (value) => {
                    console.log("slider", value);
                    setTempFontSize(value);
                  }
                }
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
