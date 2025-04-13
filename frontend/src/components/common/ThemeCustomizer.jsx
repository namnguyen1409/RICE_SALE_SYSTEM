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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import useGoogleFonts from "../../hooks/useGoogleFonts";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import {
  setAdvancedMode,
  setBorderRadius,
  setFontFamily,
  setFontSize,
  setColorPrimary,
  setThemeMode,
  setColorPrimaryBg,
} from "../../redux/slices/themeSlice";
import { availableLanguages } from "../../i18n";
import { useTranslation } from "react-i18next";
import { theme } from "antd";
import "flag-icon-css/css/flag-icons.min.css";
import { changeLanguage } from "../../redux/slices/languageSlice";
import Link from "antd/es/typography/Link";

const { Title } = Typography;

const { Text } = Typography;

const ThemeCustomizer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { token } = theme.useToken();

  const {
    advancedMode,
    customPresets,
    themeMode,
    colorPrimary,
    colorPrimaryBg,
    colorPrimaryBgHover,
    colorPrimaryBorder,
    colorPrimaryBorderHover,
    colorPrimaryHover,
    colorPrimaryActive,
    colorPrimaryTextHover,
    colorPrimaryText,
    colorPrimaryTextActive,
    colorSuccess,
    colorSuccessBg,
    colorSuccessBgHover,
    colorSuccessBorder,
    colorSuccessBorderHover,
    colorSuccessHover,
    colorSuccessActive,
    colorSuccessTextHover,
    colorSuccessText,
    colorSuccessTextActive,
    colorWarning,
    colorWarningBg,
    colorWarningBgHover,
    colorWarningBorder,
    colorWarningBorderHover,
    colorWarningHover,
    colorWarningActive,
    colorWarningTextHover,
    colorWarningText,
    colorWarningTextActive,
    colorError,
    colorErrorBg,
    colorErrorBgHover,
    colorErrorBorder,
    colorErrorBorderHover,
    colorErrorHover,
    colorErrorActive,
    colorErrorTextHover,
    colorErrorText,
    colorErrorTextActive,
    colorLink,
    colorLinkHover,
    colorLinkActive,
    colorTextBase,
    colorBgBase,
    colorText,
    colorTextSecondary,
    colorTextTertiary,
    colorTextQuaternary,
    colorBorder,
    colorBorderSecondary,
    colorFill,
    colorFillSecondary,
    colorFillTertiary,
    colorFillQuaternary,
    colorBgContainer,
    colorBgElevated,
    colorBgLayout,
    colorBgSpotlight,
    colorBgMask,
    sizeMode,
    fontSizeSM,
    fontSizeLG,
    fontSizeXL,
    fontSizeHeading1,
    fontSizeHeading2,
    fontSizeHeading3,
    fontSizeHeading4,
    fontSizeHeading5,
    lineHeight,
    lineHeightSM,
    lineHeightLG,
    lineHeightHeading1,
    lineHeightHeading2,
    lineHeightHeading3,
    lineHeightHeading4,
    lineHeightHeading5,
    sizeStep,
    sizeUnit,
    marginXXS,
    marginXS,
    marginSM,
    margin,
    marginMD,
    marginLG,
    marginXL,
    marginXXL,
    paddingXXS,
    paddingXS,
    paddingSM,
    padding,
    paddingMD,
    paddingLG,
    paddingXL,
    borderRadius,
    borderRadiusXS,
    borderRadiusSM,
    borderRadiusLG,
    boxShadow,
    boxShadowSecondary,
    wireframe,
    fontSize,
    fontFamily,
  } = useSelector((state) => state.theme);

  const language = useSelector((state) => state.language.currentLang);

  const [tempFontSize, setTempFontSize] = useState(fontSize || token.fontSize);

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
    loading,
    error,
  } = useGoogleFonts({
    searchTerm: fontSearch,
    category: selectedCategory,
    subset: selectedSubset,
  });

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
            <Segmented
              size="large"
              value={advancedMode}
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
      width={500}
    >
      <Space direction="vertical" 
      className="w-full"
      size="large">
        {/* Language & Theme Selector */}

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
                size="large"
                value={themeMode}
                onChange={(val) => dispatch(setThemeMode(val))}
                options={[
                  {
                    label: <SunFilled style={{ fontSize: 18 }} />,
                    value: "light",
                  },
                  {
                    label: <MoonFilled style={{ fontSize: 18 }} />,
                    value: "dark",
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
          <Row align="middle" justify="space-between">
            <Col>
              <Text strong>
                {t("theme.colorPrimary")}
                {colorPrimary && (
                  <Link
                    onClick={() => {
                      dispatch(setColorPrimary(null));
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
                defaultValue={token.colorPrimary}
                value={colorPrimary || token.colorPrimary}
                presets={preserColor}
                color={token.colorPrimary}
                onChangeComplete={(color) => {
                  const hexColor = color.toHexString();
                  dispatch(setColorPrimary(hexColor));
                }}
                showText
              />
            </Col>
          </Row>
        </Card>

        {advancedMode && (
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
                    <Row align="middle" style={{ gap: 16, flexWrap: "nowrap" }}>
                      <Col flex="1">
                        <Text>{t("theme.colorPrimaryBg")}</Text>
                      </Col>
                      <Col>
                        <Text code>{token.colorPrimaryBg}</Text>
                      </Col>
                      <Col>
                        <ColorPicker
                          style={{ padding: "4px" }}
                          defaultValue={colorPrimaryBg || token.colorPrimaryBg}
                          presets={preserColor}
                          color={colorPrimaryBg || token.colorPrimaryBg}
                          onChangeComplete={(color) => {
                            const hexColor = color.toHexString();
                            dispatch(setColorPrimaryBg(hexColor));
                          }}
                        />
                      </Col>
                    </Row>
                  </Card>
                ),
              },
            ]}
          />
        )}

        {/* Token List */}
        <Card
          className="token-panel-pro-token-list"
          size="small"
          variant="borderless"
          style={{
            flex: 1,
            overflow: "auto",
            boxShadow: token.boxShadow,
          }}
        >
          {/* Token items sẽ render tại đây */}
          <div
            className="token-panel-pro-token-item"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              padding: "10px 16px",
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
              color: token.colorText,
              fontWeight: token.fontWeightStrong,
            }}
          ></div>
        </Card>

        <div
          className="token-panel-pro-token-list"
          style={{
            flex: 1,
            overflow: "auto",
          }}
        >
          <div
            className="token-panel-pro-token-item"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              padding: "10px 16px",
              borderBlockEnd: "1px solid ".concat(token.colorBorderSecondary),
              color: token.colorText,
              fontWeight: token.fontWeightStrong,
            }}
          ></div>
        </div>

        {/* Font Size */}
        <Row justify="space-between" align="middle">
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
        </Row>
        <Divider />

        {/* Font Family */}
        <Row>
          <Row>
            <Text strong>Font chữ</Text>
          </Row>
          <Row>
            <Select
              loading={loading}
              showSearch
              placeholder="Chọn font chữ"
              onSearch={(value) => setFontSearch(value)}
              filterOption={false}
              style={{ width: "100%" }}
              value={fontFamily}
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
            <span>{borderRadius}px</span>
          </div>
          <Slider
            min={0}
            max={24}
            step={1}
            value={borderRadius}
            onChange={(v) => dispatch(setBorderRadius(v))}
          />
        </div>
      </Space>
    </Drawer>
  );
};

export default ThemeCustomizer;
