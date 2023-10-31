import {useIntl} from "react-intl";

export const useLocale = () => {
    return useIntl().locale;
};
