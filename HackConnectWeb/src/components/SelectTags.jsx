import { useEffect, useState } from 'react';
import Select from 'react-select';
import RealService from '../services/RealService';

const SelectTags = ({ selected = [], onChange, disabled = false }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await RealService.getTags();

        // Convert to format required by react-select
        const formatted = data.map((tag) => ({
          value: tag,
          label: `${tag}`,
        }));
        setOptions(formatted);
      } catch (err) {
        console.error('Error al cargar tags:', err);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (selectedOptions) => {
    const values = selectedOptions.map((opt) => opt.value);
    onChange(values);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-subtle mb-1">
        Tags
      </label>
      <Select
        isMulti
        options={options}
        isDisabled={disabled}
        value={options.filter((opt) => selected.includes(opt.value))}
        onChange={handleChange}
        placeholder="Selecciona uno o más tags"
        className="text-sm"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default SelectTags;
