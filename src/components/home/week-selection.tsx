import React, { useState } from 'react';
import { Select } from 'antd';

interface SelectionProps {
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
}

const { Option } = Select;

const WeekSelection: React.FC<SelectionProps> = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionChange = (value: string) => {
        setSelectedOption(value);
        onChange(value);
    };

    return (
        <Select
            value={selectedOption}
            onChange={handleOptionChange}
            placeholder="Chọn tuần học"
            style={{ width: 350, marginTop: '30px' }}
        >
            {options.map((option) => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

export default WeekSelection;