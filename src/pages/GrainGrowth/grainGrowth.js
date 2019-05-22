import homogeneus from './Nucleation/homogeneus';
import random from './Nucleation/random';
import withRadius from './Nucleation/withRadius';
import vonNeumann from './Growth/vonNeumann';

export const EDGE_CASE = {
  absorb: 'absorb',
  periodic: 'periodic'
};

export const TYPES = {
  homogeneus: 'homogeneus',
  random: 'random',
  withRadius: 'withRadius'
};

export const GROWTH = {
  VON_NEUMANN: 'von_neuman',
  MOORE: 'moore'
};

export function nucleate(mesh, type, data) {
  switch (type) {
    case TYPES.homogeneus:
      return homogeneus(mesh, data);
    case TYPES.random:
      return random(mesh, data);
    case TYPES.withRadius:
      return withRadius(mesh, data);
  }
}

export function grow(mesh, type, edge) {
  switch (type) {
    case GROWTH.VON_NEUMANN:
      return vonNeumann(mesh, edge);
  }
}
