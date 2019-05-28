import base from "./Growth/base";
import homogeneus from "./Nucleation/homogeneus";
import random from "./Nucleation/random";
import withRadius from "./Nucleation/withRadius";

export const EDGE_CASE = {
  absorb: "Absorb",
  periodic: "Periodic"
};

export const TYPES = {
  homogeneus: "Homogeneus",
  random: "Random",
  withRadius: "With radius"
};

export const GROWTH = {
  von_neumann: "Von Neuman",
  moore: "Moore",
  pentagonal: "Pentagonal",
  hexagonalLeft: "Hexagonal left",
  hexagonalRight: "Hexagonal right",
  hexagonalRandom: "Hexagonal random",
  withRadius: "With radius"
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

export function grow(mesh, type, edge, data) {
  return base(mesh, edge, type, data);
}
