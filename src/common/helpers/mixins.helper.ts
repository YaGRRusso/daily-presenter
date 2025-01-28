type Constructor<T = object> = new (...args: any[]) => T

export function ApplyMixins(baseClass: Constructor, mixins: Constructor[]) {
  mixins.forEach((mixin) => {
    Object.getOwnPropertyNames(mixin.prototype).forEach((name) => {
      baseClass.prototype[name] = mixin.prototype[name]
    })
  })
}
