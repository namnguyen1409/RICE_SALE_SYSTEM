import { Card, Collapse, Typography } from "antd";
import React, { memo } from "react";
import MainColorPickerRow from "../MainColorPickerRow";
import ColorSettingRow from "../ColorSettingRow";

const { Text } = Typography;

const ThemeColorGroup = ({
  title,
  mainColor,
  advancedItems,
  advancedMode,
  token,
  presets,
  t,
}) => {
  return (
    <Card
      size="small"
      title={title}
      variant="borderless"
      style={{ boxShadow: token.boxShadow }}
    >
      <MainColorPickerRow
        label={mainColor.label}
        stateValue={mainColor.stateValue}
        tokenValue={mainColor.tokenValue}
        onChangeComplete={(hex) => mainColor.setValue(hex)}
        onReset={() => mainColor.setValue(null)}
        presets={presets}
        t={t}
      />

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
                  {advancedItems.map((item) => (
                    <ColorSettingRow
                      key={item.label}
                      label={item.label}
                      stateValue={item.stateValue}
                      tokenValue={item.tokenValue}
                      onChangeComplete={(hex) => item.setValue(hex)}
                      onReset={() => item.setValue(null)}
                      presets={presets}
                      t={t}
                    />
                  ))}
                </Card>
              ),
            },
          ]}
        />
      )}
    </Card>
  );
};

export default memo(ThemeColorGroup, (prev, next) => {
    return (
      prev.title === next.title &&
      prev.advancedMode === next.advancedMode &&
      prev.t === next.t &&
      prev.presets === next.presets &&
      prev.mainColor === next.mainColor &&
      prev.advancedItems === next.advancedItems &&
      prev.token.boxShadow === next.token.boxShadow &&
      prev.token.boxShadowSecondary === next.token.boxShadowSecondary &&
      prev.token.colorFillQuaternary === next.token.colorFillQuaternary
    );
  });