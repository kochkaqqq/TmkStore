// context/FilterContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type UnitType = 'tons' | 'meters';

interface Filters {
    stock_ids: string[];
    stock_names: string[];
    type_ids: string[];
    type_names: string[];
    diameter_min: number;
    diameter_max: number;
    wall_thickness_min: number;
    wall_thickness_max: number;
    gosts: string[];
    steel_grades: string[];
    manufacturers: string[];
    unit: UnitType; // Добавлено
}

interface FilterContextType {
    filters: Filters;
    updateFilter: (filterName: keyof Filters, value: string | number | string[] | UnitType) => void;
}

const FilterContext = createContext<FilterContextType | null>(null);

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
    const [filters, setFilters] = useState<Filters>({
        stock_ids: [],
        stock_names: [],
        type_ids: [],
        type_names: [],
        diameter_min: 0,
        diameter_max: 0,
        wall_thickness_min: 0,
        wall_thickness_max: 0,
        gosts: [],
        steel_grades: [],
        manufacturers: [],
        unit: 'tons', // По умолчанию тонны
    });

    const updateFilter = (filterName: keyof Filters, value: string | number | string[] | UnitType) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    return (
        <FilterContext.Provider value={{ filters, updateFilter }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within FilterProvider');
    }
    return context;
};
