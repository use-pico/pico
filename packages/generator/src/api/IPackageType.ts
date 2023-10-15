/**
 * Reference to a type in a package.
 */
export interface IPackageType {
    /**
     * Type
     */
    type: string;
    /**
     * Where it comes from; if not specified, it should refer to an existing type in current package
     */
    withPackage?: {
        /**
         * Import "from"
         */
        package: string;
        /**
         * Optional item being imported
         */
        import?: string;
        /**
         * Import alis
         */
        alias?: string;
    };
}
