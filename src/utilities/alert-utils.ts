export function customJSONStringify(obj: any): string {
    // Handle circular references using a map to track visited objects
    const visited = new WeakSet();

    const replacer = (key: string, value: any) => {
        if (value && typeof value === 'object' && !visited.has(value)) {
            visited.add(value);
            return value;
        }
        return value;
    };

    // Create a formatted string, replacing tabs with spaces for better readability
    const formattedString = JSON.stringify(obj, replacer, 2).replace(/\t/g, '  ');

    // Limit the string length to a reasonable value (e.g., 1000 characters) to prevent overwhelming alerts
    const limitedString = formattedString.length > 1000 ? `${formattedString.substring(0, 1000)}...` : formattedString;

    return limitedString;
}