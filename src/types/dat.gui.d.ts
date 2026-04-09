declare module 'dat.gui' {
    export class GUI {
        constructor();
        add(object: ShaderMaterial & { uSize: number }, property: 'uSize', min?: number, max?: number, step?: number): {
            min(value: number): typeof this;
            max(value: number): typeof this;
            step(value: number): typeof this;
            name(name: string): typeof this;
            onChange(callback: (value: number) => void): typeof this;
        };
        addColor(object: Record<string, string>, property: string): {
            onChange: (callback: () => void) => void;
        };
    }
}