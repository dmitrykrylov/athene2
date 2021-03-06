﻿export abstract class ImmutableObject {
    public abstract clone(): ImmutableObject;

    protected afterClone() {
        /* NOOP */
    }

    protected cloned<T extends ImmutableObject>(updater: (instance: ImmutableObject) => void) {
        let cloned = <T>this.clone();

        updater(cloned);

        cloned.afterClone();

        return cloned;
    }
}