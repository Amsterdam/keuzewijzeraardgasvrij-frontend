import type { FormValues } from "./technicalFormSchema";

export function mapFormValues(formValues: FormValues) {
  return {
    aantal_woningen: formValues.aantalWoningen,
    bouwjaar: formValues.bouwjaar,
    bruto_vloeroppervlak: formValues.brutoVloeroppervlak,
    elektriciteitsverbruik_per_woning:
      formValues.elektriciteitsverbruikPerWoning,
    elektriciteitsverbruik_vve_totaal:
      formValues.elektriciteitsverbruikVveTotaal,
    gasverbruik_per_woning: formValues.gasverbruikPerWoning,
    gasverbruik_vve_totaal: formValues.gasverbruikVveTotaal,
    gecontracteerd_vermogen: formValues.gecontracteerdVermogen,
    huidige_warmtesysteem: formValues.huidigeWarmtesysteem,
    inpandige_berging_aanwezig: formValues.inpandigeBergingAanwezig,
    mechanische_ventilatie_aanwezig: formValues.mechanischeVentilatieAanwezig,
    ruimte_op_het_dak_aanwezig: formValues.ruimteOpHetDakAanwezig,
    tapwater_op_gas: formValues.tapwaterOpGas,
    type_dak: formValues.typeDak,
    vloerverwarming_aanwezig: formValues.vloerverwarmingAanwezig,
    volledig_gasloos: formValues.volledigGasLoos,
    wens_tot_koelen: formValues.wensTotKoelen,
  };
}
