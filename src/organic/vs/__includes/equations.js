const equations = {
  "3-2": {
    title: String.raw`烯 加成 \(\ce{Br2/CCl4}\)`,
    content: String.raw`\(\ce{H3CCH=CH2 + \color{red}{Br}_2 ->[\ce{CCl4}] H3CCH\color{red}{Br}CH2\color{red}{Br}}\)`,
  },
  "3-3": {
    title: String.raw`烯 氧化 \(\ce{KMnO4}\)`,
    content: String.raw`
            1. 冷稀碱性 \(\ce{KMnO4}\) 溶液 (紫色褪色)<br><br>
            \(\ce{3H2C=CH2 + 2KMnO4 + 4H2O ->[\ce{OH-}] 3CH2(OH)CH2(OH) + 2KOH + 2MnO2}\)<br><br>
            2. 冷稀酸性 \(\ce{KMnO4}\) 溶液<br><br>
            \(\ce{5H2C=CH2 + 2MnO4- + 2H2O + 6H+ -> 5CH2(OH)-CH2(OH) + 2Mn2+}\)<br><br>
            3. 热浓酸性 \(\ce{KMnO4}\) 溶液<br><br>
            \(\ce{H2C=CH2 ->[\ce{MnO4-/H+}][\Delta] CO2 + H2O}\)<br><br>
            Not done yet
        `,
  },
  "4-2": {
    title: String.raw`炔烃 加成 \(\ce{Br2/CCl4}\)`,
    content: String.raw`\(\ce{H3CCH#CH2 + 2Br2 ->[\ce{CCl4}] H3CCBr2CHBr2}\)`,
  },
  "4-3": {
    title: String.raw`炔烃 氧化 \(\ce{KMnO4}\)`,
    content: String.raw`
            1. 冷碱性 \(\ce{KMnO4}\) 溶液 (紫色褪色)<br>
            \(\ce{3 HC#CH + 10 KMnO4 ->[\ce{OH-}] 6CO2 + 10KOH + 10MnO2}\)`,
  },
  "4-4": {
    title: String.raw`炔烃 生成炔化物`,
    content: String.raw`
            碳原子要有 \(\ce{H}\) 原子连着，取代 \(\ce{H}\), 生成 \(\ce{NH3, NH4+}\)<br>
            1. \(\ce{Ag(NH3)2+}\) (白色沉淀)<br><br>
            \(\ce{HC#CH + 2\color{red}{Ag}(NH3)2+ -> \color{red}{Ag}-C#C-\color{red}{Ag} + 2NH3 + 2NH4+}\)<br><br>
            2. \(\ce{Cu(NH3)2+}\) (红棕色沉淀)<br><br>
            \(\ce{H3CC#CH + \color{red}{Cu}(NH3)2+ -> H3C-C#C-\color{red}{Cu} + NH3 + NH4+}\)`,
  },
  "5-7": {
    title: String.raw`卤代烃`,
    content: String.raw`
            <b>试剂</b>：\(\ce{NaOH (aq), HNO3 (aq), AgNO3 (aq)}\)<br>
            <b>观察</b>：氯X烷产生白色沉淀<br>
            <b>方程式</b>：<br><br>
            \(\ce{R-Cl + NaOH ->[\text{水}][\Delta] R-OH + NaCl}\)<br><br>
            \(\ce{NaCl + AgNO3 -> AgCl + NaNO3}\)`,
  },
  "6-5":{
    title: String.raw`醇 + \(\ce{PX5}\)`,
    content: String.raw`
    \(\ce{R\color{red}{OH} + P\color{blue}{X}_5 -> R\color{blue}{X} + H\color{blue}{X} + PO\color{blue}{X}_3}\)<br><br>
      当 \(\ce{X = Cl}\) 时，产生 \(\ce{HCl}\)，观察<b style="border: solid 1px black; padding: 1px;">白雾</b>。因此这个反应可以检测羟基。
      <br><br>
      补充：对于 \(\ce{PCl3}\)<br><br>
      \(\ce{3R\color{red}{OH} + P\color{blue}{X}_3 -> 3R\color{blue}{X} + H3PO3}\)<br><br>
    `
  },
  "6-6":{
    title: String.raw`醇 + \(\ce{Na}\)`,
    content: String.raw`
    \(\ce{2R\color{red}{OH} + 2\color{blue}{Na} -> 2RO\color{blue}{Na} + \color{red}{H_2}}\)`
  },
  "6-11":{
    title: String.raw`卤仿反应 (2-醇)`,
    content: String.raw`
    一定要有 \(\ce{-CH(OH)CH3}\) 的结构<br><br>
    只有乙醛：\(\ce{\color{red}{R}CH(OH)CH3 + 4X2 + 6NaOH -> $\underset{\text{羧酸钠}}{\ce{\color{red}{R}COONa}}$ + $\underset{\text{三卤甲烷}}{\ce{CHX3}}$ + 5NaX + 5H2O}\)
    <br><br>
    \(\ce{CHI3}\): 碘仿
    `
  },
  "7-6":{
    title: String.raw`酚 + \(\ce{Na}\)`,
    content: String.raw`
    和醇的反应一样。<br><br>
    \(\ce{2R\color{red}{OH} + 2\color{blue}{Na} -> 2RO\color{blue}{Na} + \color{red}{H_2}}\)`
  },
  "8-9": {
    title: String.raw`醛 + 托伦试剂`,
    content: String.raw`
    \(\ce{\color{red}{R}CHO + 2Ag(NH3)2OH -> \color{red}{R}COONH4 + 2Ag + H2O + 3NH3}\)`
  },
  "8-10": {
    title: String.raw`醛 + 斐林试剂`,
    content: String.raw`
    \(\ce{\color{red}{R}CHO + 2Cu^{2+} + NaOH + H2O ->[][\Delta] \color{red}{R}COONa + Cu2O + 4H+}\)`
  },
  "8-11":{
    title: String.raw`卤仿反应 (乙醛)`,
    content: String.raw`
    一定要有 \(\ce{-C(=O)CH3}\) 的结构<br><br>
    只有乙醛：\(\ce{HCOCH3 + 4NaOH + 3X2 -> $\underset{\text{羧酸钠}}{\ce{HCOONa}}$ + $\underset{\text{三卤甲烷}}{\ce{CHX3}}$ + 3NaX + 3H2O}\)
    <br><br>
    \(\ce{CHI3}\): 碘仿
    `
  },
  "9-11":{
    title: String.raw`卤仿反应 (2-酮)`,
    content: String.raw`
    一定要有 \(\ce{-C(=O)CH3}\) 的结构<br><br>
    只有2-酮：\(\ce{\color{red}{R}COCH3 + 4NaOH + 3X2 -> $\underset{\text{羧酸钠}}{\ce{\color{red}{R}COONa}}$ + $\underset{\text{三卤甲烷}}{\ce{CHX3}}$ + 3NaX + 3H2O}\)
    <br><br>
    \(\ce{CHI3}\): 碘仿
    `
  }
};
