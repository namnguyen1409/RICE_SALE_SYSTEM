import { Segmented } from "antd";
import { memo, useCallback, useState } from "react";

const CustomerSegmented = memo(
    ({
        size,
        options,
        onChange,
        value,
        ...props
    }) => {
        const [localTempValue, setLocalTempValue] = useState(null);
        const handleChange = useCallback(
            (newValue) => {
                setLocalTempValue(newValue);
                onChange(newValue);
            },
            [setLocalTempValue, onChange]
        );

        return (
            <Segmented 
                size={size}
                options={options}
                value={localTempValue || value}
                onChange={handleChange}
                {...props}
            />
        )
    }
)
export default CustomerSegmented;