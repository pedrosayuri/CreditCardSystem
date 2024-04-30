import { CardProps } from "@/types/card";

export function detectCardType(cardNumber: string): CardProps {
    const cardPatterns = [
        { pattern: /^4/, brand: "Visa", brandImage: "visa-logo.png", cardBackground: "#1a1aff" },
        { pattern: /^5[1-5]/, brand: "Mastercard", brandImage: "mastercard-logo.png", cardBackground: "#ff0000" },
        { pattern: /^3[47]/, brand: "American Express", brandImage: "amex-logo.png", cardBackground: "#00ccff" },
        { pattern: /^(5[6-9]|6)/, brand: "Elo", brandImage: "elo-logo.png", cardBackground: "#ff6600" }
    ];

    for (const { pattern, brand, brandImage, cardBackground } of cardPatterns) {
        if (pattern.test(cardNumber)) {
            return { brandName: brand, brandImage: brandImage, cardBackground: cardBackground };
        }
    }

    return { brandName: 'vazio', brandImage: '', cardBackground: '' };
}
