import React, { useState, useCallback } from "react";
import { Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import ThemeCustomizer from "../common/ThemeCustomizer/ThemeCustomizer";

const CustomerHeader = () => {
    const [customizerOpen, setCustomizerOpen] = useState(false);

    const handleToggleCustomizer = useCallback(() => {
        setCustomizerOpen((prev) => !prev);
    }, []);

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

export default React.memo(CustomerHeader);