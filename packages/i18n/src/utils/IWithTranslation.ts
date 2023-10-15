export interface IWithTranslation {
    /**
     * Base translation namespace (basically part of a label).
     */
    namespace?: string | null;
    /**
     * Base translation label.
     */
    label?: string | null;
    /**
     * Append user-specific translation label.
     */
    withLabel?: string;
    /**
     * Expand values within a translation.
     */
    values?: any;
}
