import { Search } from 'lucide-react';
import { Input } from "../../../components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder = "Search..." }: SearchInputProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-5 w-4 text-gray-500" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 h-10"
      />
    </div>
  );
};

export default SearchInput;