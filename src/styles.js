const ONE_QUARTER = 0.25;
const ONE_HALF = 0.5;

export default function themeToStyles(theme) {
    return {
        pickerChip: {
            marginRight: theme.spacing(ONE_HALF),
            marginTop: theme.spacing(ONE_QUARTER)
        }
    };
}
