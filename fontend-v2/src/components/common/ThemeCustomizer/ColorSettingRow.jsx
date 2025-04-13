// components/ColorSettingRow.jsx
import React, { useCallback } from "react";
import { Row, Col, Typography, ColorPicker } from "antd";

const { Text, Link } = Typography;

const ColorSettingRow = React.memo(({
  label,
  value,
  tempValue,
  defaultValue,
  setTempValue,
  onChangeComplete,
  onReset,
  presets = [],
  t,
}) => {
  const handleChange = useCallback((color) => {
    setTempValue(color.toHexString());
  }, [setTempValue]);

  const handleChangeComplete = useCallback((color) => {
    setTempValue(null);
    onChangeComplete(color.toHexString());
  }, [setTempValue, onChangeComplete]);

  return (
    <Row align="middle" style={{ gap: 16, flexWrap: "nowrap" }} className="mb-2">
      <Col flex="1">
        <Text>
          {t(label)}
          {value && (
            <Link className="ml-2" onClick={onReset}>
              {t("theme.reset")}
            </Link>
          )}
        </Text>
      </Col>
      <Col>
        <Text code>{tempValue || defaultValue}</Text>
      </Col>
      <Col>
        <ColorPicker
          style={{ padding: "4px" }}
          defaultValue={value || defaultValue}
          value={tempValue || defaultValue}
          presets={presets}
          color={value || defaultValue}
          onChange={handleChange}
          onChangeComplete={handleChangeComplete}
        />
      </Col>
    </Row>
  );
});

export default ColorSettingRow;
