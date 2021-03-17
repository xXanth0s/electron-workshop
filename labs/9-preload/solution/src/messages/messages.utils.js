export function messageCreator(type = '') {
  const create = (payload) => {
    return {
      type,
      payload
    }
  }

  create.type = type;

  return create
}
