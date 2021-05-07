/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
}

interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module "*.svg" {
    const svgUrl: string;
    const svgComponent: SvgrComponent;
    export default svgUrl;
    export { svgComponent as ReactComponent };
}

declare module "react-column-view" {
    type State<T = {}> = {
        path: string[];
        root?: string[];
        data?: Record<string, ColumnItem<T>>;
    };

    // type State =
    //     | { status: 'empty' }
    //     | { status: 'loading' }
    //     | { status: 'error', error: string }
    //     | { status: 'success', data: HNResponse }

    type ColumnItem<T> = {
        id: string;
        parentId?: string;
        children: string[];
        data: T;
    };

    type Action<T> =
        | { type: "insert"; item: T; parentId?: string }
        | { type: "push" | "pop"; item: string };
}
