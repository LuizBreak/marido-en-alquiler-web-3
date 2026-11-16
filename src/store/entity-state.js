export function decode(value) {
  return typeof value === "string" ? JSON.parse(value) : value;
}
export function asList(value) {
  const data = decode(value);
  return Array.isArray(data) ? data : [];
}
export function asItem(value) {
  const data = decode(value);
  return (Array.isArray(data) ? data[0] : data) || {};
}
export function sameEntity(a, b, key) {
  const left = a[key] ?? a.id;
  const right = b[key] ?? b.id;
  if (left != null && right != null) return String(left) === String(right);
  return key === "Id" && a.clientId != null && b.clientId != null &&
    a.contractorId != null && b.contractorId != null &&
    String(a.clientId) === String(b.clientId) && String(a.contractorId) === String(b.contractorId);
}
export function upsertEntity(list, entity, key) {
  const index = list.findIndex(item => sameEntity(item, entity, key));
  if (index < 0) list.push(entity);
  else list.splice(index, 1, entity);
}
export function entityMutations({ list, item, key, mutation, listMutation }) {
  return {
    [listMutation](state, value) { state[list] = asList(value); },
    [`SET_${mutation}`](state, value) { state[item] = asItem(value); },
    [`ADD_NEW_${mutation}`](state, value) { upsertEntity(state[list], value, key); state[item] = value; },
    [`UPDATE_${mutation}`](state, value) { upsertEntity(state[list], value, key); state[item] = value; },
    [`DELETE_${mutation}`](state, value) {
      state[list] = state[list].filter(entity => !sameEntity(entity, value, key));
      if (sameEntity(state[item] || {}, value, key)) state[item] = {};
    },
    [`RESET_${mutation}`](state) { state[item] = {}; },
  };
}
