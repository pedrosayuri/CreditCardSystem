import { View, Text, Image, TouchableOpacity } from "react-native";
import { detectCardType } from "@/utils/card-utils";
import Animated, { interpolate, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { CreditCardProps } from "@/types/credit-card";
import clsx from "clsx";

import visaLogo from '@/assets/visa-logo.png';
import mastercardLogo from '@/assets/mastercard-logo.png';
import amexLogo from '@/assets/amex-logo.png';
import eloLogo from '@/assets/elo-logo.png';

export enum CARD_SIDE {
    FRONT = 0,
    BACK = 1
}

export function CreditCard({ cardSide, data }: CreditCardProps) {
    const cardType = detectCardType(data.cardNumber);

    const brandImages: { [key: string]: any } = {
        'Visa': visaLogo,
        'Mastercard': mastercardLogo,
        'American Express': amexLogo,
        'Elo': eloLogo
    };

    let brandImage = null;
    if (cardType.brandName) {
        brandImage = brandImages[cardType.brandName];
    }

    const frontAnimatedStyles = useAnimatedStyle(() => {
        const rotateValue = interpolate(cardSide.value, [CARD_SIDE.FRONT, CARD_SIDE.BACK],[0, 180])
        return {
            transform: [
                { rotateY: withTiming(`${rotateValue}deg`, {duration: 1000 }) }
            ]
        }
    })

    const backAnimatedStyles = useAnimatedStyle(() => {
        const rotateValue = interpolate(cardSide.value, [CARD_SIDE.FRONT, CARD_SIDE.BACK],[180, 360])
        return {
            transform: [
                { rotateY: withTiming(`${rotateValue}deg`, {duration: 1000 }) }
            ]
        }
    })

    return (
        <TouchableOpacity 
            className="w-full h-56 relative"
            activeOpacity={0.8}
            onPress={() => {
                cardSide.value = cardSide.value === CARD_SIDE.FRONT ? CARD_SIDE.BACK : CARD_SIDE.FRONT;
            }
        }>

        <View>
            <Animated.View className={clsx("w-full h-56 rounded-2xl p-6 justify-between absolute", {
                    "bg-gray-300": cardType.brandName === "Visa",
                    "bg-red-600": cardType.brandName === "Mastercard",
                    "bg-blue-600": cardType.brandName === "American Express",
                    "bg-orange-800": cardType.brandName === "Elo",
                    "bg-white": cardType.brandName === "vazio"
                })}
                style={[frontAnimatedStyles, {backfaceVisibility: "hidden"}]}
                >
                <View className="flex-row items-center gap-3">
                    <View className="w-7 h-7 rounded-full bg-gray-400"/>
                    <Text>Meu Cartão</Text>
                </View>

                <View className="flex-row justify-between items-center">
                    <Text className="font-subtitle text-2xl font-bold">
                        {data.cardName}
                    </Text>

                    {brandImage && (
                        <Image 
                            source={brandImage}
                            className="w-12 h-12"
                            resizeMode="contain"
                        />
                    )}

                </View>
            </Animated.View>

            <Animated.View className="w-full h-56 rounded-2xl p-6 justify-between bg-gray-400" style={[backAnimatedStyles, {backfaceVisibility: "hidden"}]}>
                <View>
                    <Text>
                        Número do Cartão
                    </Text>
                    <Text className="font-subtitle text-2xl font-bold">
                        {data.cardNumber}
                    </Text>
                </View>

                <View className="flex-row justify-between">
                    <View>
                        <Text>
                            Válido até
                        </Text>
                        <Text className="font-subtitle text-2xl font-bold">
                            {data.cardExpiration}
                        </Text>
                    </View>
                
                    <View>
                        <Text>
                            CVV
                        </Text>
                        <Text className="font-subtitle text-2xl font-bold">
                            {data.cardCVV}
                        </Text>
                    </View>
                </View>
            </Animated.View>
        </View>

        </TouchableOpacity>
    )
}
