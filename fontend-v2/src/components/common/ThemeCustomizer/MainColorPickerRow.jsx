import { memo, useCallback, useState } from "react";
import { Row, Col, Typography, ColorPicker } from "antd";

const { Text, Link } = Typography;
const MainColorPickerRow = memo(
  ({
    label, // tiêu đề 
    stateValue, // giá trị trong state
    tokenValue, // giá trị trong token
    onChangeComplete, // hàm gọi khi thay đổi hoàn tất
    onReset, // hàm gọi khi đặt lại
    presets = [], // danh sách màu sắc có sẵn
    t, // hàm dịch
    ...props // các thuộc tính khác
  }) => {
    // state để lưu giá trị tạm thời
    const [localTempValue, setLocalTempValue] = useState(null);
    
    // hàm gọi khi thay đổi màu sắc
    const handleChange = useCallback(
      (color) => {
        setLocalTempValue(color.toHexString());
      },
      [setLocalTempValue]
    );

    // hàm gọi khi thay đổi màu sắc hoàn tất
    const handleChangeComplete = useCallback(
      (color) => {
        onChangeComplete(color.toHexString());
        setLocalTempValue(null);
      },
      [setLocalTempValue, onChangeComplete]
    );

    // hàm gọi khi đặt lại màu sắc
    const handleReset = useCallback(() => {
        setLocalTempValue(null);
        onReset();
    }, [setLocalTempValue, onReset]);

    return (
      <Row align="middle" justify="space-between" className="mb-2">
        <Col>
          <Text strong>
            {t(label)}
            {stateValue && (
              <Link className="ml-2" onClick={handleReset}>
                {t("theme.reset")}
              </Link>
            )}
          </Text>
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
            showText
          />
        </Col>
      </Row>
    );
  }
);
export default MainColorPickerRow;
