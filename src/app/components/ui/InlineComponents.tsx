import React from 'react';

// --- Componente InlineInput ---
interface InlineInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    widthClass?: string;
    type?: 'text' | 'number';
    disabled?: boolean;
}

export const InlineInput: React.FC<InlineInputProps> = ({ 
    value, 
    onChange, 
    placeholder, 
    widthClass = 'w-40', 
    type = 'text',
    disabled = false
}) => (
    <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`inline-block bg-yellow-100 border-0 border-b border-border focus:ring-0 focus:border-primary focus:outline-none text-center font-medium text-primary px-1 ${widthClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    />
);

// --- Componente InlineSelect ---
interface InlineSelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    placeholder: string;
    widthClass?: string;
}

export const InlineSelect: React.FC<InlineSelectProps> = ({ 
    value, 
    onChange, 
    options, 
    placeholder, 
    widthClass = 'w-40' 
}) => (
    <select
        value={value}
        onChange={onChange}
        className={`inline-block bg-yellow-100 border-0 border-b border-border focus:ring-0 focus:border-primary focus:outline-none text-center font-medium text-primary px-1 ${widthClass}`}
    >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
            <option key={opt} value={opt}>
                {opt}
            </option>
        ))}
    </select>
);

// --- Componente InlineSelect con children (para casos especiales) ---
interface InlineSelectWithChildrenProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
    widthClass?: string;
    disabled?: boolean;
}

export const InlineSelectWithChildren: React.FC<InlineSelectWithChildrenProps> = ({ 
    value, 
    onChange, 
    children, 
    widthClass = 'w-40',
    disabled = false
}) => (
    <select 
        value={value} 
        onChange={onChange} 
        disabled={disabled}
        className={`inline-block bg-yellow-100 border-0 border-b border-border focus:ring-0 focus:border-primary focus:outline-none text-center font-medium text-primary px-1 ${widthClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {children}
    </select>
);

// --- Componente InlineTextArea ---
interface InlineTextAreaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    rows?: number;
}

export const InlineTextArea: React.FC<InlineTextAreaProps> = ({ 
    value, 
    onChange, 
    placeholder, 
    rows = 3 
}) => (
    <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full mt-2 p-2 border border-border rounded-md bg-yellow-100 text-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
    />
);