import base from "./Growth/base";
import homogeneus from "./Nucleation/homogeneus";
import random from "./Nucleation/random";
import withRadius from "./Nucleation/withRadius";

export const EDGE_CASE = {
  absorb: "absorb",
  periodic: "periodic"
};

export const TYPES = {
  homogeneus: "homogeneus",
  random: "random",
  withRadius: "with radius"
};

export const GROWTH = {
  von_neumann: "von neuman",
  moore: "moore",
  pentagonal: "pentagonal",
  hexagonal: "hexagonal",
  withRadius: "withRadius"
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
  return base(mesh, edge, type);
}
