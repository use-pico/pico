import {
    type ClassValue,
    type FactoryValue,
    PumpIt
}                        from "pumpit";
import {type IContainer} from "../api/IContainer";

export class Container {
    constructor(
        protected container: IContainer.Instance = new PumpIt(),
    ) {
    }

    public resolve<T>(key: IContainer.Key) {
        return this.container.resolve<T>(key);
    }

    public useClass<TClass extends ClassValue>(key: IContainer.Key, use: TClass, options?: IContainer.Options.Class<TClass>) {
        this.container.bindClass(key, use, options);
        return this;
    }

    public useFactory<TFactory extends FactoryValue>(key: IContainer.Key, factory: TFactory, options?: IContainer.Options.Factory<TFactory>) {
        this.container.bindFactory(key, factory, options);
        return this;
    }

    public useValue<T>(key: IContainer.Key, value: T) {
        this.container.bindValue(key, value);
        return this;
    }

    public child() {
        return new Container(this.container.child());
    }
}
