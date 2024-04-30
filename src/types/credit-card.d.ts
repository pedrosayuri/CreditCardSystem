export type CreditCardProps = {
    cardSide: SharedValue<number>;
    data: {
        cardNumber: string;
        cardName: string;
        cardExpiration: string;
        cardCVV: string;
    }
}