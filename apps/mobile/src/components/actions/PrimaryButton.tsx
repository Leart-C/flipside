import { Pressable, Text } from "react-native";

import { primaryButtonStyles } from "./PrimaryButton.styles";

type PrimaryButtonProps = {
    label: string;
    onPress: ()=> void;
    disabled?: boolean;
}

export function PrimaryButton({label,onPress,disabled=false}:PrimaryButtonProps){
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled }}
            disabled={disabled}
            onPress={onPress}
            style={({pressed})=>[
                primaryButtonStyles.button,
                pressed && primaryButtonStyles.pressed,
                disabled && primaryButtonStyles.disabled,
            ]}
        >
            <Text style={primaryButtonStyles.label}>{label}</Text>
        </Pressable>
    )
}