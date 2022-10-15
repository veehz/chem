"use strict";

const equations = [
  {
    from: "烷烃",
    to: "炔烃",
    equation: "2CH4 ->[1500-1600^{\\circ}C] HC#CH + 3H2",
  },
  {
    from: "烯烃",
    to: "烷烃",
    equation: "H3CCH=CH2 + H2 ->[Pt/Pd/Ni] H2CCH2CH3",
  },
  {
    from: "烯烃",
    to: "醇",
    msg: "脱水",
    equation: "H2C=CH2 + H2O ->[\\ce{H+}][\\Delta] H3CCH2OH",
  },
  {
    from: "烯烃",
    to: "卤代烃",
    msg: "卤化",
    katex: `\\text{1 mol:}\\ \\ce{H2C=CH2 + HCl -> H2CCH2Cl}\\\\
    \\text{2 mol:}\\ \\ce{H2C=CH2 + 2HCl ->[\\ce{CCl4}] H2CCH2Cl + HCl}`,
  },
  {
    from: "炔烃",
    to: "烷烃",
    msg: "加氢",
    equation: "HC#CH + 2H2 ->[Pt/Ni/Pd] H3CCH3",
  },
  {
    from: "炔烃",
    to: "烯烃",
    msg: "加氢",
    equation: "H3CHC#CH + H2 ->[\\text{林德拉催化剂}] H2C=CH2",
  },
  {
    from: "炔烃",
    to: "卤代烃",
    msg: "卤化",
    katex: `\\text{4 Cl:}\\ \\ce{HC#CH + 2Cl2 -> HCCl2-CHCl2}\\\\
    \\text{1 Cl:}\\ \\ce{HC#CH + HCl ->[\\ce{HgSO4}][\\ce{CuCl3}] H2C=CHCl}\\\\
    \\text{2 Cl:}\\ \\ce{HC#CH + 2HCl -> H3CCHCl2}`,
  },
  {
    from: "卤代烃",
    to: "烷烃",
    katex: `\\ce{CH3Cl + Mg ->[\\text{干燥乙醚}] H3CMgCl} \\text{(格氏试剂)} \\\\
    \\ce{H3CMgCl + H2O ->[\\ce{H+}] CH4 + MgClOH}`,
  },
  {
    from: "卤代烃",
    to: "烯烃",
    msg: "脱卤",
    equation: "H2CCH2Cl + NaOH ->[\\text{醇}][\\Delta] H2C=CH2 + NaCl",
  },
  {
    from: "卤代烃",
    to: "炔烃",
    msg: "脱卤",
    equation:
      "H2CCl-CH2Cl + 2NaOH ->[\\text{醇}][\\Delta] HC#CH + 2NaCl + 2H2O",
  },
  {
    from: "卤代烃",
    to: "醇",
    msg: "水解",
    equation: "H3CCH2Cl + NaOH ->[\\text{水}][\\Delta] H3CCH2OH + NaCl",
  },
  {
    from: "醇",
    to: "烯烃",
    msg: "脱水",
    equation:
      "H3CCH2CH2OH ->[\\text{浓}\\ce{H2SO4}][170^{\\circ}C] H3CCH2=CH2 + H2O",
  },
  {
    from: "醇",
    to: "卤代烃",
    msg: "卤化",
    katex: `\\ce{H3CCH2OH + HCl <=>[\\text{催化剂}] H3CCH2Cl + H2O}\\\\
    \\ce{3H3CCH3OH + PCl3 -> 3H3CCH2Cl + H3PO3}\\\\
    \\ce{H3CCH2OH + PCl5 -> H3CCH2Cl + HCl + POCl3}`,
  },
  {
    from: "醇",
    to: "醛",
    katex: `\\ce{H3CCH2OH ->[\\ce{KMnO4, H+}] H3CCHO}\\\\
    \\ce{H3CCH2OH ->[Zn - Cu][400 - 500^{\\circ}C] H3CCHO}`,
  },
  {
    from: "醇",
    to: "酮",
    msg: "氧化",
    equation: `H3CCH(OH)CH3 ->[\\ce{K2Cr2O7 / H2SO4}][\\ce{H+}] H3CCOCH3`,
  },
  {
    from: "醇",
    to: "羧酸",
    msg: "氧化",
    equation: `H3C-CH2OH ->[\\ce{KMnO4, H+}] H3C-COOH`,
  },
];

// hacky way to allow break at arrows
const arrows = ["->", "<=>"];
const replacement = "}\\ \\allowbreak \\ce{";
for (let i = 0; i < equations.length; i++) {
  let eq = equations[i];
  if (eq.equation) {
    for(let arrow of arrows) {
      eq.equation = eq.equation.replace(arrow, replacement + arrow);
    }
  }
  if (eq.katex) {
    for(let arrow of arrows) {
      eq.katex = eq.katex.replace(arrow, replacement + arrow);
    }
  }
}