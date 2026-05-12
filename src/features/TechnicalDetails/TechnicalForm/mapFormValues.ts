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
    gasverbruik_vve_totaal: formValues.gasverbruikVveTotaal,
    gecontracteerd_vermogen: formValues.gecontracteerdVermogen,
    huidige_warmtesysteem: formValues.huidigeWarmtesysteem,
    inpandige_berging_aanwezig: formValues.inpandigeBergingAanwezig,
    mechanische_ventilatie_aanwezig: formValues.mechanischeVentilatieAanwezig,
    ruimte_op_het_dak_aanwezig: formValues.ruimteOpHetDakAanwezig,
    tapwater_op_gas: formValues.tapwaterOpGas,
    koken_op_gas: formValues.kokenOpGas,
    type_dak: formValues.typeDak,
    vloerverwarming_aanwezig: formValues.vloerverwarmingAanwezig,
    volledig_gasloos: formValues.volledigGasLoos,
    wens_tot_koelen: formValues.wensTotKoelen,
    huidig_systeem: formValues.huidigSysteem,
    dubbel_glas: formValues.dubbelGlas,
    beschikbare_ruimte_in_woning_m2: formValues.beschikbareRuimteInWoningM2,
    beschikbare_collectieve_ruimte_binnen_m2:
      formValues.beschikbareCollectieveRuimteBinnenM2,
    beschikbare_collectieve_ruimte_buiten_m2:
      formValues.beschikbareCollectieveRuimteBuitenM2,
    jaar_vervangen: formValues.jaarVervangen,
    wtw_aanwezig: formValues.wtwAanwezig,
    buurtcode: formValues.buurtcode,
  };
}
