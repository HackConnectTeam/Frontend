import { useEffect, useState } from 'react';
import RealService from '../services/RealService';

const CountrySelect = ({ value, onChange, disabled = false }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await RealService.getCountries();
        setCountries(data);
      } catch (err) {
        console.error('Error cargando países:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="mb-6">

      <select
        disabled={disabled || loading}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white"
        >
        <option value="">Selecciona un país</option>
        {countries.map((country) => (
            <option key={country.name} value={country.name}>
            {country.name}
            </option>
        ))}
        </select>

    </div>
  );
};

export default CountrySelect;
