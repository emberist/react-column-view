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
        path: T[];
        data?: Record<string, T>;
    };

    // type State =
    //     | { status: 'empty' }
    //     | { status: 'loading' }
    //     | { status: 'error', error: string }
    //     | { status: 'success', data: HNResponse }

    type Action<T> =
        | { type: "insert"; item: T }
        | { type: "success"; results: any }
        | { type: "failure"; error: string };
}
