import { useState } from 'react';

export function useDocumentMask(initialValue: string = '') {
    const [userDocument, setDocument] = useState(initialValue);

    const formatDocument = (value: string): string => {
        // Remove todos os caracteres que não são números
        value = value.replace(/\D/g, '');

        // Adiciona a máscara de CPF
        if (value.length <= 11) {
            return value
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }

        // Adiciona a máscara de CNPJ
        return value
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    };

    const setFormattedDocument = (value: string) => {
        setDocument(formatDocument(value));
    };

    const getRawDocument = (): string => {
        return userDocument.replace(/\D/g, ''); // Remove todos os caracteres que não são números
    };

    return [userDocument, setFormattedDocument, getRawDocument] as const;
}
