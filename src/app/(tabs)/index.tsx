import { useState } from "react";
import { CreditCard, CARD_SIDE } from "@/components/credit-card";
import { Input } from "@/components/input";
import { View, Text, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function Home() {
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiration, setCardExpiration] = useState("");
    const [cardCVV, setCardCVV] = useState("");

    const cardSide = useSharedValue(CARD_SIDE.FRONT);

    function showFrontCard() {
        cardSide.value = CARD_SIDE.FRONT;
    }

    function showBackCard() {
        cardSide.value = CARD_SIDE.BACK;
    }

    function handleFlipCard() {
        if (cardSide.value === CARD_SIDE.FRONT) {
            showBackCard();
        } else {
            showFrontCard();
        }
    }

    return (
        <View className="flex-1 p-10 items-center bg-gray-700">
            <View className="w-full mt-4">
                <CreditCard
                    cardSide={cardSide}
                    data={{
                        cardName,
                        cardNumber: cardNumber.replace(/(\d{4})(?=\d)/g, "$1 "),
                        cardExpiration: cardExpiration.replace(/(\d{2})(\d{2})/, "$1/$2"),
                        cardCVV
                    }}
                />
            </View>

            <View className="w-full mt-10">
                <Input
                    placeholder="Nome do titular"
                    onChangeText={setCardName}
                    onFocus={showFrontCard}
                    className="bg-white p-4 rounded-lg mb-4"
                />
                
                <Input 
                    placeholder="Número do cartão"
                    keyboardType="numeric"
                    maxLength={16}
                    onFocus={showBackCard}
                    onChangeText={setCardNumber}
                    className="bg-white p-4 rounded-lg mb-4"
                />

                <View className="flex-row justify-between gap-3">
                    <Input
                        placeholder="01/02"
                        keyboardType="numeric"
                        maxLength={4}
                        onFocus={showBackCard}
                        onChangeText={setCardExpiration}
                        className="bg-white p-4 rounded-lg mb-4 w-1/4"
                    />

                    <Input
                        placeholder="123"
                        keyboardType="numeric"
                        maxLength={3}
                        onFocus={showBackCard}
                        onChangeText={setCardCVV}
                        className="bg-white p-4 rounded-lg mb-4 w-1/4"
                    />
                </View>
            </View>
        </View>
    )
}