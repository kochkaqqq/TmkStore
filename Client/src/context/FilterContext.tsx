import { createContext, useContext, useState, ReactNode } from 'react';

interface Filters {
    stock_id: string;
    stock_name: string;
    type_id: string;
    type_name: string;
    diameter_min: number;
    diameter_max: number;
    wall_thickness_min: number;
    wall_thickness_max: number;
    gost: string;
    steel_grade: string;
    manufacturer: string;
}

interface FilterContextType {
    filters: Filters;
    updateFilter: (filterName: keyof Filters, value: string | number) => void;
}

const FilterContext = createContext<FilterContextType | null>(null);

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
    const [filters, setFilters] = useState<Filters>({
        stock_id: "",
        stock_name: "",
        type_id: "",
        type_name: "",
        diameter_min: 0,
        diameter_max: 0,
        wall_thickness_min: 0,
        wall_thickness_max: 0,
        gost: "",
        steel_grade: "",
        manufacturer: "",
    });

    const updateFilter = (filterName: keyof Filters, value: string | number) => {
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