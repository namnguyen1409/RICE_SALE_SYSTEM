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
  Tooltip,
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import useGoogleFonts from "../../hooks/useGoogleFonts";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { setBorderRadius, setFontFamily, setFontSize, setPrimaryColor, setThemeMode } from "../../redux/slices/themeSlice";


const { Text } = Typography;

const ThemeCustomizer = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const { themeMode, primaryColor, fontSize, fontFamily, borderRadius } = useSelector(
    (state) => state.theme
  );

  const [tempFontSize, setTempFontSize] = useState(fontSize);

  const [tempColor, setTempColor] = useState(primaryColor);

  const handleColorChange = useCallback(
    debounce((color) => {
      const hexColor = color.toHexString();
      dispatch(setPrimaryColor(hexColor));
    }, 300),
    []
  );


  const handleFontSizeChange = useCallback(
    debounce((size) => {
      dispatch(setFontSize(size));
    }, 300),
    []
  );

  const [fontSearch, setFontSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubset, setSelectedSubset] = useState(null);
  const {fonts: googleFonts, loading, error} = useGoogleFonts(
    {
      searchTerm: fontSearch,
      category: selectedCategory,
      subset: selectedSubset,
    }
  );
  


  return (
    <Drawer
      title="Tùy chỉnh giao diện"
      placement="right"
      onClose={onClose}
      open={open}
      width={350}
    >
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        {/* Dark Mode */}

        {/* <Row justify="space-between" align="middle">
          <Col>
            <Text strong>Chế độ tối</Text>
          </Col>
          <Col>
            <Switch
              checked={themeMode === "dark"}
              onChange={(checked) =>
                dispatch(setThemeMode(checked ? "dark" : "light"))
              }
            />
          </Col>
        </Row>
        <Divider /> */}
        <Divider style={{ borderColor: primaryColor}}>
          Chế độ tối
        </Divider>

        <Row justify="center" gutter={16}>
        <Col>
          <Tooltip title="Chế độ sáng">
            <Button
              type={themeMode !== "dark" ? "primary" : "default"}
              size="large"
              icon={<SunFilled style={{ fontSize: 24 }} />}
              onClick={() => 
                dispatch(setThemeMode("light"))
              }
            />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Chế độ tối">
            <Button
              type={themeMode === "dark" ? "primary" : "default"}
              size="large"
              icon={<MoonFilled style={{ fontSize: 24 }} />}
              onClick={() => 
                dispatch(setThemeMode("dark"))
              }
            />
          </Tooltip>
        </Col>
      </Row>
      




        {/* Primary Color */}
        <Row justify="space-between" align="middle">
          <Col>
            <Text strong>Màu chủ đạo</Text>
          </Col>
          <Col>
            <ColorPicker
              defaultValue={primaryColor}
              color={tempColor}
              onChange={setTempColor}
              onChangeComplete={handleColorChange}
              showText
            />
          </Col>
        </Row>
        <Divider />

        {/* Font Size */}
        <Row justify="space-between" align="middle">
          <Col span={10}>
            <Text strong>Cỡ chữ</Text>
          </Col>
          <Col span={14}>
            <Slider
              min={12}
              max={24}
              step={1}
              value={tempFontSize}
              onChange={setTempFontSize}
              onChangeComplete={handleFontSizeChange}
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
