// gamifySystem.ts

type Area = "salud" | "conocimiento" | "finanzas" | "relaciones" | "trabajo";

interface UserXP {
  globalXP: number;
  areas: Record<Area, number>;
}

const GamifySystem = {
  // Fórmula escalada: XP necesaria para un nivel
  xpForLevel(level: number): number {
    return 100 * level * level; // 100 * n^2
  },

  // Dado un XP total, devuelve nivel actual
  getLevel(xp: number): { level: number; currentXP: number; nextXP: number; progress: number } {
    let level = 1;
    while (xp >= this.xpForLevel(level)) {
      level++;
    }
    const prevXP = this.xpForLevel(level - 1);
    const nextXP = this.xpForLevel(level);
    const currentXP = xp - prevXP;
    const neededXP = nextXP - prevXP;
    const progress = (currentXP / neededXP) * 100;

    return { level: level - 1, currentXP, nextXP: neededXP, progress };
  },

  // Promedio de todas las áreas para nivel general
  getGlobalLevel(userXP: UserXP) {
    const values = Object.values(userXP.areas);
    const totalXP = values.reduce((a, b) => a + b, 0);
    const avgXP = totalXP / values.length;
    return this.getLevel(avgXP);
  },

  // Añadir XP a un área y recalcular global
  addXP(userXP: UserXP, area: Area, amount: number): UserXP {
    const newAreas = { ...userXP.areas, [area]: userXP.areas[area] + amount };
    return {
      globalXP: Object.values(newAreas).reduce((a, b) => a + b, 0),
      areas: newAreas,
    };
  },
};

export default GamifySystem;
