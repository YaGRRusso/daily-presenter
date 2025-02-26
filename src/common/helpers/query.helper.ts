export enum QueryMethod {
  AND = 'and',
  OR = 'or',
}

export function ApplyQuery(query: Record<string, any> = {}, method?: QueryMethod) {
  if (!method) return query

  const result = Object.keys(query).reduce((acc, key) => {
    if (query[key]) acc.push({ [key]: { $regex: new RegExp(query[key], 'i') } })
    return acc
  }, [])

  switch (method) {
    case QueryMethod.AND:
      return { $and: result }
    case QueryMethod.OR:
      return { $or: result }
  }
}
