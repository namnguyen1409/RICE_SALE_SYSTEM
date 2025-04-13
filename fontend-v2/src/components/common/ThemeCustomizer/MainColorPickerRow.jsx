import { memo, useCallback, useState } from "react";
import { Row, Col, Typography, ColorPicker } from "antd";

const { Text, Link } = Typography;
const MainColorPickerRow = memo(
  ({
    label,
    value,
    defaultValue,
    onChangeComplete,
    onReset,
    presets = [],
    t,
  }) => {
    const [localTempValue, setLocalTempValue] = useState(null);
    const handleChange = useCallback(
      (color) => {
        setLocalTempValue(color.toHexString());
      },
      [setLocalTempValue]
    );
    const handleChangeComplete = useCallback(
      (color) => {
          setLocalTempValue(null);
        onChangeComplete(color.toHexString());
      },
      [setLocalTempValue, onChangeComplete]
    );
    const handleReset = useCallback(() => {
        setLocalTempValue(null);
        onReset();
    }, [setLocalTempValue, onReset]);

    return (
      <Row align="middle" justify="space-between" className="mb-2">
        <Col>
          <Text strong>
            {t(label)}
            {value && (
              <Link className="ml-2" onClick={handleReset}>
                {t("theme.reset")}
              </Link>
            )}
          </Text>
        </Col>
        <Col>
          <ColorPicker
            style={{ padding: "4px" }}
            defaultValue={value || defaultValue}
            value={localTempValue || defaultValue}
            presets={presets}
            color={value || defaultValue}
            onChange={handleChange}
            onChangeComplete={handleChangeComplete}
            showText
          />
        </Col>
      </Row>
    );
  }
);
export default MainColorPickerRow;
