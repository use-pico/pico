import {type IPackageType} from "../api/IPackageType";

export const withPackageImport = (withPackage: IPackageType, prefix = "") => {
    if (withPackage.withPackage?.alias) {
        return (prefix ? `${prefix} ` : "") + `${withPackage.withPackage.import || withPackage.type} as ${withPackage.withPackage.alias}`;
    }
    return withPackage.type;
};
