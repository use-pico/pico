export interface ISdkGeneratorProps {
    barrel?: boolean;
    /**
     * Package name where the SDK is generated; if not provided, package.json is resolved.
     */
    packageName?: string;
    /**
     * Target folder of the managed source code; it should be dedicated to the generator only.
     */
    folder?: string;
}
