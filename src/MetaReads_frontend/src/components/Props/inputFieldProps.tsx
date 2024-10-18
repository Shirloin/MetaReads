export interface InputProps {
    value: string;
    label?: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    size?: 'small' | 'medium';
    type?: string;
}
