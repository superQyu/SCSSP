export declare namespace MapProps {
    type ParamsType = Record<string, any>;

    type Position = {
        lng: string | number;
        lat: string | number;
    }

    type Pointer = ParamsType & {
        position: Position;
        icon: string;
        enableDragging?: boolean;
        isTop?: boolean;
        isTop?: boolean;
        offset?: ParamsType;
    };
}
