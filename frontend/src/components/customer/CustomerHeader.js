import { Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import ThemeCustomizer from "../common/ThemeCustomizer"

const CustomerHeader = () => {
    const [customizerOpen, setCustomizerOpen] = useState(false);
    
    const handleToggleCustomizer = () => {
        setCustomizerOpen(!customizerOpen);
    };
    
    return (
        <div className="ant-layout-header">
            <Button
                type="primary"
                icon={<SettingOutlined />}
                onClick={handleToggleCustomizer}
            >
                Tuỳ chỉnh giao diện
            </Button>
        
            <ThemeCustomizer open={customizerOpen} onClose={handleToggleCustomizer} />
        </div>
    );
}

export default CustomerHeader;