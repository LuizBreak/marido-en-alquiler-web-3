export function offerPath(value) {
  const match = typeof value === 'string' && value.match(/^\/oferta\/([1-9][0-9]*)$/);
  return match && Number(match[1]) <= 2147483647 ? value : null;
}

export function signinDestination(route, role) {
  const offer = offerPath(route.path);
  if (offer) return offer;
  const redirect = typeof route.query?.redirect === 'string' ? '/' + route.query.redirect : '';
  const allowed = ['/perfil/info', '/perfil/proyectos', '/perfil/mensajes', '/profile/info', '/profile/proyectos', '/profile/mensajes', '/nuevoproyecto'];
  return allowed.includes(redirect) ? redirect : role === 'client' ? '/perfil/info' : '/profile/info';
}
