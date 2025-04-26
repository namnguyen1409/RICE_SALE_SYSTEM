// components/ColorSettingRow.jsx
import { memo, useCallback, useState } from "react";
import { Row, Col, Typography, ColorPicker } from "antd";

const { Text, Link } = Typography;

const ColorSettingRow = memo(({
  label,
  stateValue,
  tokenValue,
  onChangeComplete,
  onReset,
  presets = [],
  t,
  ...props
}) => {

  const [localTempValue, setLocalTempValue] = useState(null);

  const handleChange = useCallback((color) => {
    setLocalTempValue(color.toHexString());
  }, [setLocalTempValue]);

  const handleChangeComplete = useCallback((color) => {
    onChangeComplete(color.toHexString());
    setLocalTempValue(null);
  }, [setLocalTempValue, onChangeComplete]);

  const handleReset = useCallback(() => {
    setLocalTempValue(null);
    onReset();
}, [setLocalTempValue, onReset]);


  return (
    <Row align="middle" style={{ gap: 16, flexWrap: "nowrap" }} className="mb-2">
      <Col flex="1">
        <Text>
          {t(label)}
          {stateValue && (
            <Link className="ml-2" onClick={handleReset}>
              {t("theme.reset")}
            </Link>
          )}
        </Text>
      </Col>
      <Col>
        <Text code>{localTempValue || stateValue || tokenValue}</Text>
      </Col>
      <Col>
        <ColorPicker
          style={{ padding: "4px" }}
          defaultValue={tokenValue}
          value={localTempValue || stateValue || tokenValue}
          presets={presets}
          color={localTempValue || stateValue || tokenValue}
          onChange={handleChange}
          onChangeComplete={handleChangeComplete}
          {...props}
        />
      </Col>
    </Row>
  );
});

export default ColorSettingRow;
