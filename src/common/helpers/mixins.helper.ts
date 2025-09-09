type Constructor<T = object> = new (...args: any[]) => T;

export function ApplyMixins(baseClass: Constructor, mixins: Constructor[]) {
  for (const mixin of mixins) {
    for (const name of Object.getOwnPropertyNames(mixin.prototype)) {
      baseClass.prototype[name] = mixin.prototype[name];
    }
  }
}
